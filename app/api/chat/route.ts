import { generateAIResponse, type ChatMessage } from "@/lib/ai";

const MAX_INPUT_LENGTH = 2000;
const MAX_TOKENS = 500;

type ChatSuccessResponse = {
  success: true;
  data: { content: string };
  error: null;
};

type ChatErrorResponse = {
  success: false;
  data: null;
  error: { code: string; message: string };
};

type ChatApiResponse = ChatSuccessResponse | ChatErrorResponse;

// Guardrails: reject prompt injection attempts and role overrides
const BLOCKED_PATTERNS = [
  /ignore\s+previous\s+instructions/i,
  /ignore\s+all\s+instructions/i,
  /reveal\s+system\s+prompt/i,
  /system\s+prompt/i,
  /you\s+are\s+now/i,
  /act\s+as\s+if\s+you\s+are/i,
  /pretend\s+you\s+are/i,
  /role\s+play\s+as/i,
];

function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, MAX_INPUT_LENGTH)
    .replace(/[<>]/g, "");
}

function isBlocked(input: string): boolean {
  const sanitized = sanitizeInput(input);
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(sanitized));
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;

    if (
      !body ||
      typeof body !== "object" ||
      !("message" in body) ||
      typeof (body as { message: unknown }).message !== "string"
    ) {
      const response: ChatErrorResponse = {
        success: false,
        data: null,
        error: {
          code: "INVALID_BODY",
          message: "Message is required.",
        },
      };
      return Response.json<ChatApiResponse>(response, { status: 400 });
    }

    const rawMessage = (body as { message: string }).message;

    if (!rawMessage.trim()) {
      const response: ChatErrorResponse = {
        success: false,
        data: null,
        error: {
          code: "EMPTY_MESSAGE",
          message: "Please enter a question or topic.",
        },
      };
      return Response.json<ChatApiResponse>(response, { status: 400 });
    }

    if (isBlocked(rawMessage)) {
      console.log("[Chat] Blocked input (prompt injection attempt)", {
        hasInput: true,
        inputLength: rawMessage.length,
      });

      const response: ChatErrorResponse = {
        success: false,
        data: null,
        error: {
          code: "GUARDRAIL_BLOCKED",
          message:
            "I can only follow my built-in safety rules and help with finance-related questions.",
        },
      };
      return Response.json<ChatApiResponse>(response, { status: 400 });
    }

    const sanitized = sanitizeInput(rawMessage);

    const history = Array.isArray((body as { history?: unknown }).history)
      ? ((body as { history?: { role?: string; content?: string }[] }).history ??
        [])
      : [];

    const historyMessages: ChatMessage[] = history
      .map((message) => {
        const content = (message?.content ?? "").trim();
        const role = message?.role === "assistant" ? "assistant" : "user";

        if (!content) {
          return null;
        }

        return { role, content };
      })
      .filter((value): value is ChatMessage => value !== null)
      .slice(-10);

    const messages: ChatMessage[] = [
      ...historyMessages,
      {
        role: "user",
        content: sanitized,
      },
    ];

    const startTime = Date.now();

    const { content } = await generateAIResponse({
      messages,
      maxTokens: MAX_TOKENS,
    });

    const durationMs = Date.now() - startTime;

    console.log("[Chat] Interaction", {
      success: true,
      inputLength: sanitized.length,
      historyLength: historyMessages.length,
      durationMs,
    });

    const response: ChatSuccessResponse = {
      success: true,
      data: { content },
      error: null,
    };

    return Response.json<ChatApiResponse>(response);
  } catch (error) {
    console.error("[Chat] Unexpected error", {
      message: error instanceof Error ? error.message : "Unknown error",
    });

    const response: ChatErrorResponse = {
      success: false,
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: "Something went wrong. Please try again in a moment.",
      },
    };

    return Response.json<ChatApiResponse>(response, { status: 500 });
  }
}
