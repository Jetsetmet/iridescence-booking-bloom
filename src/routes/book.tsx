import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { submitBooking, submitLead } from "@/lib/funnel.functions";
import { Loader2, Check, Triangle } from "lucide-react";
import { toast } from "sonner";
import giftCert60 from "@/assets/voucher-preview-60.jpg.asset.json";
import giftCert90 from "@/assets/voucher-preview-90.jpg.asset.json";

const offerings = ["The Resonance Reset", "Reiki & Sound", "Cacao Ceremony", "Breath & Yoga", "Couples Cacao", "Virtual Sessions", "Packages: 4 Sessions", "Group Sound Healing", "Mentoring", "Retreat", "Not sure yet"];

const offeringAliases: Record<string, string> = {
  Reiki: "Reiki & Sound",
  "Sound Bath": "Reiki & Sound",
  Breathwork: "Breath & Yoga",
  Package: "Packages: 4 Sessions",
  "Four 60-min Sessions": "Packages: 4 Sessions",
  "Four 90-min Sessions": "Packages: 4 Sessions",
  "Custom Package": "Packages: 4 Sessions",
  "Couples Cacao Ceremony": "Couples Cacao",
  "Virtual Session": "Virtual Sessions",
  "Virtual Reiki": "Virtual Sessions",
  "Group Sound": "Group Sound Healing",
};

// Direct Square booking links per offering. Reiki & Sound and Breath & Yoga
// share the same service link (same price/duration). Add the rest as Mehtap
// shares them.
const SQUARE_BOOKING_LINKS: Record<string, string> = {
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

const searchSchema = z.object({
  offering: z.string().optional(),
  event: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Session — Iridescence Healing" },
      { name: "description", content: "Reserve a private Reiki, sound bath, cacao ceremony, breath & yoga, virtual sessions, group sound healing or mentoring session with Mehtap in New Orleans." },
    ],
  }),
  validateSearch: searchSchema,
  component: Book,
});

function Book() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const submit = useServerFn(submitBooking);
  const subscribeLead = useServerFn(submitLead);

  const normalizedOffering = search.offering ? (offeringAliases[search.offering] || search.offering) : undefined;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    offering: normalizedOffering || offerings[0],
    preferred_date: search.event ? `Event: ${search.event}` : "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submit({ data: form });
      const squareUrl = SQUARE_BOOKING_LINKS[form.offering];
      if (squareUrl) {
        toast.success("Got your details — sending you to Square to pick a time.");
        window.location.href = squareUrl;
        return;
      }
      toast.success("Booking received - Mehtap will be in touch within 24 hours.");
      navigate({ to: "/thanks" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not submit — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <section className="mx-auto max-w-5xl px-5 sm:px-8 py-16 grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
      <div className="lg:sticky lg:top-24">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Book your session</p>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">
          A soft place to land.
        </h1>
        <p className="mt-4 text-muted-foreground text-pretty">
          Most sessions can be scheduled instantly — fill in your details and we'll send you straight to the Square calendar to pick your time. For retreats, events and mentoring, Mehtap will personally confirm within 24 hours.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-foreground/80">
          {[
            "Instant calendar booking for most sessions",
            "Quiet uptown New Orleans space",
            "Free 15-min discovery call if unsure",
          ].map((b) => (
            <li key={b} className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent">
                <Check className="h-3.5 w-3.5 text-primary" />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-2xl border border-border bg-card p-5 text-sm">
          <Triangle className="h-4 w-4" />
          <p className="mt-2 font-medium">Not sure which session is right?</p>
          <a href="/quiz" className="mt-1 inline-block underline underline-offset-4">Take the 60-second quiz →</a>
        </div>
        <div className="mt-6 rounded-2xl bg-iridescent p-5 text-sm">
          <Triangle className="h-4 w-4" />
          <p className="mt-2 font-medium">Prefer to browse all services?</p>
          <p className="mt-1 text-foreground/80">See every offering and pick your time directly on Square.</p>
          <a
            href="https://book.squareup.com/appointments/375ed9f0-ab7e-432c-a72d-65545ae811a5/location/8Z003QJZ46SBG/services?rwg_token=AFd1xnG8opsnB8WvxAc5Gu92w-ep4LAQyNqcaVA4S02XPh2Ls2RPId34yddJHpbz57l-ZkUuMTWlbLQRyenGhZi2TDn3gUVGPg%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground"
          >
            Open Square calendar →
          </a>
        </div>
      </div>

      <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card shadow-card p-7 sm:p-10 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Your name</span>
            <input required value={form.name} onChange={(e) => update("name", e.target.value)}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Email</span>
            <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Phone (optional)</span>
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)}
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Which offering calls you?</span>
          <select value={form.offering} onChange={(e) => update("offering", e.target.value)}
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            {offerings.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Preferred date / time</span>
          <input value={form.preferred_date} onChange={(e) => update("preferred_date", e.target.value)}
            placeholder="e.g. weekday evenings, or Sat May 25 afternoon"
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">What's bringing you in? (optional)</span>
          <textarea rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)}
            placeholder="Anything you'd like Mehtap to know about what you're moving through..."
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-soft disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {SQUARE_BOOKING_LINKS[form.offering] ? "Continue to booking calendar →" : "Request my session"}
        </button>
        <p className="text-[11px] text-center text-muted-foreground">
          By submitting, you agree to be contacted about your session. Your info is never shared.
        </p>
      </form>
    </section>
    <GiftCertificateSection subscribeLead={subscribeLead} />
    </>
  );
}

const STRIPE_GIFT_LINK = "https://buy.stripe.com/cNieVegwKc9G4V09XV1Jm0i";

function GiftCertificateSection({ subscribeLead }: { subscribeLead: (args: { data: { email: string; name?: string; source?: string } }) => Promise<unknown> }) {
  const [form, setForm] = useState({
    purchaserName: "",
    purchaserEmail: "",
    recipientName: "",
    duration: "60" as "60" | "90",
  });
  const [submitting, setSubmitting] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const certUrl = form.duration === "90" ? giftCert90.url : giftCert60.url;
  const certFilename = form.duration === "90"
    ? "Iridescence-Healing-Gift-Voucher-90.jpg"
    : "Iridescence-Healing-Gift-Voucher-60.jpg";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await subscribeLead({
        data: {
          email: form.purchaserEmail,
          name: form.purchaserName,
          source: `gift-certificate-${form.duration}`,
        },
      });
      setPurchased(true);
      window.open(STRIPE_GIFT_LINK, "_blank", "noopener,noreferrer");
      toast.success("Opening secure checkout — your voucher will be ready below once payment is complete.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your details — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="gift-certificates" className="mx-auto max-w-5xl px-5 sm:px-8 pb-20">
      <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden grid lg:grid-cols-[1.1fr_1fr]">
        <div className="p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Gift a session</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl text-balance">
            A gift of peace, rest and renewal.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">
            Purchase a 60 or 90 minute gift voucher for any session of their choice — Reiki & Sound or Breath & Yoga. After checkout, your personalized voucher is ready to download right here.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Your name</span>
                <input required value={form.purchaserName} onChange={(e) => setForm((f) => ({ ...f, purchaserName: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Your email</span>
                <input required type="email" value={form.purchaserEmail} onChange={(e) => setForm((f) => ({ ...f, purchaserEmail: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Recipient's name (optional)</span>
              <input value={form.recipientName} onChange={(e) => setForm((f) => ({ ...f, recipientName: e.target.value }))}
                placeholder="Who is this gift for?"
                className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <div>
              <span className="text-xs font-medium text-muted-foreground">Voucher length</span>
              <div className="mt-1 grid grid-cols-2 gap-3">
                {(["60", "90"] as const).map((d) => (
                  <button key={d} type="button" onClick={() => setForm((f) => ({ ...f, duration: d }))}
                    className={`rounded-xl border px-4 py-3 text-sm transition ${form.duration === d ? "border-primary bg-primary/5 font-medium" : "border-input bg-background"}`}>
                    {d} minutes
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-soft disabled:opacity-60">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Continue to secure checkout →
            </button>
            <p className="text-[11px] text-center text-muted-foreground">
              Payment is processed securely by Stripe. After paying, return to this page to download your voucher.
            </p>
          </form>

          {purchased && (
            <div className="mt-6 rounded-2xl border border-primary/30 bg-iridescent p-5 text-sm">
              <p className="font-medium">Your voucher is ready.</p>
              <p className="mt-1 text-foreground/80">
                Once Stripe confirms your payment, download your {form.duration}-minute gift voucher below and print or send it to {form.recipientName || "your recipient"}.
              </p>
              <a href={certUrl} download={certFilename}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground">
                Download {form.duration}-min voucher →
              </a>
              <a href={STRIPE_GIFT_LINK} target="_blank" rel="noreferrer"
                className="mt-3 ml-2 inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-xs font-medium text-primary">
                Re-open Stripe checkout
              </a>
            </div>
          )}
        </div>

        <div className="bg-accent/40 p-6 sm:p-8 flex items-center justify-center">
          <img
            src={certUrl}
            alt={`Iridescence Healing ${form.duration}-minute gift voucher preview`}
            className="w-full max-w-md rounded-xl shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}

