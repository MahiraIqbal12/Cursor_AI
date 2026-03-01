import { NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@/lib/stripe";

// Stripe webhook placeholder
// Use STRIPE_WEBHOOK_SECRET to verify signature
// Handle: checkout.session.completed, customer.subscription.*, etc.

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") || "";

    const event = await verifyWebhook(body, signature);
    if (!event) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle event types: checkout.session.completed, etc.
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
