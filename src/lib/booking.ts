export const SQUARE_URL =
  "https://book.squareup.com/appointments/375ed9f0-ab7e-432c-a72d-65545ae811a5/location/8Z003QJZ46SBG/services?rwg_token=AFd1xnG8opsnB8WvxAc5Gu92w-ep4LAQyNqcaVA4S02XPh2Ls2RPId34yddJHpbz57l-ZkUuMTWlbLQRyenGhZi2TDn3gUVGPg%3D%3D";

// Direct Square booking links per offering. Reiki & Sound and Breath & Yoga
// share the same service link (same price/duration).
export const SQUARE_BOOKING_LINKS: Record<string, string> = {
  "Reiki & Sound":
    "https://book.squareup.com/appointments/375ed9f0-ab7e-432c-a72d-65545ae811a5/location/8Z003QJZ46SBG/services/U3BEZ2AVTRZLZMM74YJ3YH5C",
  "Breath & Yoga":
    "https://book.squareup.com/appointments/375ed9f0-ab7e-432c-a72d-65545ae811a5/location/8Z003QJZ46SBG/services/U3BEZ2AVTRZLZMM74YJ3YH5C",
  "Couples Cacao":
    "https://book.squareup.com/appointments/375ed9f0-ab7e-432c-a72d-65545ae811a5/location/8Z003QJZ46SBG/services/RQ3LP5ULWAE5RXHPWVR3FJKU",
  "Virtual Sessions":
    "https://book.squareup.com/appointments/375ed9f0-ab7e-432c-a72d-65545ae811a5/location/8Z003QJZ46SBG/services/WQFLAUAIP75JEBCFINXJNGRZ",
  "Packages: 4 Sessions":
    "https://book.squareup.com/appointments/375ed9f0-ab7e-432c-a72d-65545ae811a5/location/8Z003QJZ46SBG/services/24ESVLDL62I4CW7FD5UVSJQS",
  "The Resonance Reset":
    "https://book.squareup.com/appointments/375ed9f0-ab7e-432c-a72d-65545ae811a5/location/8Z003QJZ46SBG/services/5DTU6QUUPQGBO5INBGKDNCGX",
};

// Stripe payment links per event title. Once a link is added here, the booking
// form sends the guest straight to Stripe to pay after their details are
// captured (and after the owner notification email is queued).
export const EVENT_PAY_LINKS: Record<string, string> = {
  'Virtual "Open Your Heart" Breathwork Journey': "",
  "Cacao + Heart Circle": "",
  "Full Moon Sound Bath": "",
};

export function getEventPayLink(eventValue?: string): string | undefined {
  if (!eventValue) return undefined;
  const match = Object.entries(EVENT_PAY_LINKS).find(
    ([title, url]) => url && eventValue.includes(title),
  );
  return match?.[1];
}
