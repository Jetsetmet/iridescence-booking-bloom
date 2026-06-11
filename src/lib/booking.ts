export const BOOKING_EMAIL = "info@iridescencehealing.com";

export function buildBookingMailto(opts?: { offering?: string; event?: string }) {
  const subjectParts = ["Booking request"];
  if (opts?.offering) subjectParts.push(opts.offering);
  if (opts?.event) subjectParts.push(opts.event);
  const subject = subjectParts.join(" — ");
  const body = [
    "Hi Mehtap,",
    "",
    "I'd like to book a session.",
    "",
    opts?.offering ? `Offering: ${opts.offering}` : "Offering: ",
    opts?.event ? `Event: ${opts.event}` : null,
    "Preferred date / time: ",
    "Phone (optional): ",
    "",
    "A little about what's bringing me in:",
    "",
    "Thank you!",
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Back-compat: existing imports of SQUARE_URL now point to a generic booking email.
export const SQUARE_URL = buildBookingMailto();