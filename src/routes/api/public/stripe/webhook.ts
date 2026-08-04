import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Stripe webhook endpoint for paid event bookings.
 *
 * After a customer completes a Stripe Payment Link for an event, this endpoint
 * receives the `checkout.session.completed` event and sends an owner notification
 * to info@iridescencehealing.com.
 *
 * To use it:
 * 1. In your Stripe dashboard, add a webhook endpoint pointing to the
 *    published/live URL: https://iridescence-booking-bloom.lovable.app/api/public/stripe/webhook
 * 2. Select the event "checkout.session.completed".
 * 3. Copy the webhook signing secret and add it as a project secret named
 *    STRIPE_WEBHOOK_SECRET.
 */
export const Route = createFileRoute("/api/public/stripe/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["STRIPE_WEBHOOK_SECRET"];
        const body = await request.text();

        if (!secret) {
          console.error("stripe webhook: STRIPE_WEBHOOK_SECRET is not configured");
          return new Response("Webhook secret not configured", { status: 500 });
        }

        const signature = request.headers.get("stripe-signature");
        if (!signature) {
          return new Response("Missing signature", { status: 401 });
        }

        const isValid = verifyStripeSignature({
          body,
          signature,
          secret,
        });
        if (!isValid) {
          return new Response("Invalid signature", { status: 401 });
        }

        let event: any;
        try {
          event = JSON.parse(body);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        if (event.type === "checkout.session.completed") {
          const session = event.data?.object ?? {};
          const customer = session.customer_details ?? {};
          const amount = session.amount_total ?? 0;
          const currency = session.currency ?? "usd";
          const paymentStatus = session.payment_status ?? "paid";

          // Try to determine the event name from line items or metadata.
          let eventName = "Stripe Payment Link booking";
          const lineItems = session.line_items?.data ?? [];
          if (lineItems.length > 0 && lineItems[0].description) {
            eventName = lineItems[0].description;
          } else if (session.metadata?.event_name) {
            eventName = session.metadata.event_name;
          } else if (session.client_reference_id) {
            eventName = session.client_reference_id;
          }

          try {
            const { notifyOwner } = await import("@/lib/email/notify-owner.server");
            await notifyOwner("stripe-payment-notification", {
              customer_email: customer.email ?? session.customer_email ?? "",
              customer_name: customer.name ?? "",
              amount_total: amount,
              currency,
              event_name: eventName,
              payment_status: paymentStatus,
            });
          } catch (err) {
            console.error("stripe webhook: failed to notify owner", err);
            // Don't return an error to Stripe — we already accepted the event.
          }
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});

function verifyStripeSignature({
  body,
  signature,
  secret,
}: {
  body: string;
  signature: string;
  secret: string;
}): boolean {
  const parts = signature.split(",").reduce((acc, part) => {
    const [key, value] = part.split("=");
    if (key && value) acc[key.trim()] = value.trim();
    return acc;
  }, {} as Record<string, string>);

  const timestamp = parts.t;
  const expectedSignature = parts.v1;
  if (!timestamp || !expectedSignature) return false;

  const signedPayload = `${timestamp}.${body}`;
  const expected = createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  if (expected.length !== expectedSignature.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(expectedSignature));
}
