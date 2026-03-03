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
      return NextResponse.json(
        { error: "Invalid Stripe webhook signature." },
        { status: 400 }
      );
    }

    // Duplicate transaction prevention placeholder:
    // - Store event.id in a durable store with a unique constraint
    // - Skip processing if the same event.id has already been handled

    console.log("[Stripe] Webhook received", {
      type: event.type,
    });

    // Handle event types: checkout.session.completed, etc.
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Stripe] Webhook error", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
