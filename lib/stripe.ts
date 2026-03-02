/**
 * Stripe placeholder - test mode
 * Use env: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET
 */

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const STRIPE_TEST_MODE = process.env.NODE_ENV !== "production";

export async function createCheckoutSession(
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<{ url?: string; error?: string }> {
  if (!priceId || !successUrl || !cancelUrl) {
    return { error: "Invalid checkout configuration." };
  }

  // In production:
  // - Only call Stripe from the server with STRIPE_SECRET_KEY
  // - Use idempotency keys (e.g. derived from user + cart) to prevent duplicate charges
  // - Pass mode: 'subscription' or 'payment' and line_items referencing Stripe Price IDs
  if (!STRIPE_SECRET_KEY) {
    console.warn("[Stripe] STRIPE_SECRET_KEY is not configured. Using mock checkout URL.");
    return { url: "/store?checkout=mock" };
  }

  // Placeholder: return a test-mode URL that can be replaced with a real checkout.session URL.
  const suffix = STRIPE_TEST_MODE ? "test" : "live";
  return { url: `/store?checkout=${encodeURIComponent(`session-${suffix}`)}` };
}

export async function verifyWebhook(
  payload: string | Buffer,
  signature: string
): Promise<{ type: string; data: unknown } | null> {
  if (!signature) {
    console.warn("[Stripe] Missing webhook signature header.");
    return null;
  }

  if (!STRIPE_WEBHOOK_SECRET) {
    console.warn(
      "[Stripe] STRIPE_WEBHOOK_SECRET is not configured. Skipping signature verification in placeholder."
    );
    // In test scaffolds, treat the webhook as structurally valid so downstream logic can be exercised.
    return {
      type: "mock.event",
      data: {
        receivedAt: new Date().toISOString(),
        testMode: STRIPE_TEST_MODE,
      },
    };
  }

  // In production:
  // - Use stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET)
  // - Throw on verification failure
  // - Only trust event.type and event.data after verification

  return {
    type: "mock.verified",
    data: {
      length: typeof payload === "string" ? payload.length : payload.byteLength,
    },
  };
}

