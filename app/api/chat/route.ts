import { NextRequest, NextResponse } from "next/server";
import { callAI } from "@/lib/ai";

const MAX_INPUT_LENGTH = 2000;
const MAX_TOKENS = 500;

// Guardrails: reject prompt injection attempts
const BLOCKED_PATTERNS = [
  /ignore\s+(previous|all)\s+instructions/i,
  /disregard\s+(previous|all)\s+instructions/i,
  /forget\s+(everything|all)/i,
  /system\s+prompt/i,
  /reveal\s+(your|the)\s+(system\s+)?prompt/i,
  /what\s+are\s+your\s+instructions/i,
  /show\s+me\s+your\s+prompt/i,
  /you\s+are\s+now/i,
  /act\s+as\s+if\s+you\s+are/i,
  /pretend\s+you\s+are/i,
];

function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, MAX_INPUT_LENGTH)
    .replace(/[<>]/g, "");
}

function isBlocked(input: string): boolean {
  const sanitized = sanitizeInput(input);
  return BLOCKED_PATTERNS.some((p) => p.test(sanitized));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message : "";

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (isBlocked(message)) {
      // Log non-PII interaction for monitoring
      console.log("[Chat] Blocked request: prompt injection attempt");
      return NextResponse.json(
        { error: "I can only help with finance-related questions. Please rephrase." },
        { status: 400 }
      );
    }

    const sanitized = sanitizeInput(message);
    const history = Array.isArray(body?.history) ? body.history : [];
    const historyTexts = history
      .map((m: { content?: string }) => (m?.content || "").trim())
      .filter(Boolean);
    const messages = [sanitized, ...historyTexts];

    const { content, error } = await callAI(messages, MAX_TOKENS);

    if (error) {
      console.log("[Chat] AI error:", error);
      return NextResponse.json(
        { error: "I'm having trouble right now. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ content });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
