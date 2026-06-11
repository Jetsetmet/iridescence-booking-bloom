import { createServerFn } from "@tanstack/react-start";

export const sendTestNotification = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string; template: "booking-notification" | "quiz-notification" }) => data)
  .handler(async ({ data }) => {
    const adminPassword = process.env.NEWSLETTER_ADMIN_PASSWORD;
    if (adminPassword && data.password !== adminPassword) {
      throw new Error("Invalid password");
    }

    const { enqueueNotification } = await import("@/lib/email/enqueue-notification.server");

    const stamp = new Date().toLocaleString("en-US");
    const payload =
      data.template === "booking-notification"
        ? {
            name: `TEST — ${stamp}`,
            email: "test@example.com",
            phone: "555-0100",
            offering: "Crystal Reiki",
            preferred_date: "Saturday afternoon",
            notes: "This is a test email to confirm the From display and template content.",
          }
        : {
            name: `TEST — ${stamp}`,
            email: "test@example.com",
            recommended_offering: "Cacao Ceremony",
            answers: { feeling: "tender", goal: "open heart" },
          };

    await enqueueNotification(data.template, payload);
    return { ok: true, queuedAt: new Date().toISOString() };
  });