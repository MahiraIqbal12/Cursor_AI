/**
 * Stripe placeholder - test mode
 * Use env: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET
 */

export async function createCheckoutSession(
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<{ url?: string; error?: string }> {
  // Placeholder - Stripe checkout.session.create
  return { url: "/store?checkout=placeholder" };
}

export async function verifyWebhook(
  payload: string | Buffer,
  signature: string
): Promise<{ type: string; data: unknown } | null> {
  // Placeholder - Stripe webhooks.constructEvent
  return null;
}
