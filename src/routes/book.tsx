import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { submitBookingRequest, submitLeadRequest } from "@/lib/funnel-api";
import { SQUARE_BOOKING_LINKS, SQUARE_URL, getEventPayLink } from "@/lib/booking";
import { Loader2, Check, Triangle, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const offerings = ["The Resonance Reset", "Reiki & Sound", "Cacao Ceremony", "Breath & Yoga", "Couples Cacao", "Virtual Sessions", "Packages: 4 Sessions", "Group Sound Healing", "Mentoring", "Experience Design", "Retreat", "Not sure yet"];

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
  const [showForm, setShowForm] = useState(Boolean(search.event));

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submitBookingRequest(form);
      const eventPayUrl = getEventPayLink(search.event);
      if (eventPayUrl) {
        toast.success("Got your details — sending you to secure checkout to hold your spot.");
        window.location.href = eventPayUrl;
        return;
      }
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
    <section className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Book your session</p>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">
          A soft place to land.
        </h1>
        <p className="mt-4 text-muted-foreground text-pretty mx-auto max-w-xl">
          Booking is instant. Choose your session and pick a time that suits you on the calendar — you'll get confirmation straight away.
        </p>
        <a
          href={SQUARE_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-soft"
        >
          Book your session now →
        </a>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-foreground/80">
          {[
            "Instant calendar booking",
            "Quiet uptown New Orleans space",
            "Free 15-min discovery call",
          ].map((b) => (
            <li key={b} className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent">
                <Check className="h-3.5 w-3.5 text-primary" />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 rounded-2xl bg-iridescent p-5 text-sm text-center">
        <Triangle className="mx-auto h-4 w-4" />
        <p className="mt-2 font-medium">Not sure which session is right for you?</p>
        <a href="/quiz" className="mt-1 inline-block underline underline-offset-4">Take the 60-second quiz — it books you straight in →</a>
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card shadow-card p-5 sm:p-6">
        <button
          type="button"
          onClick={() => setShowForm((s) => !s)}
          className="w-full flex items-center justify-between gap-4 text-left"
        >
          <span>
            <span className="block font-medium">Don't see your preferred time, or have a question?</span>
            <span className="mt-1 block text-sm text-muted-foreground">
              Send me a note about retreats, events, mentoring or a special request and I'll reply within 24 hours.
            </span>
          </span>
          <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${showForm ? "rotate-180" : ""}`} />
        </button>

        {showForm && (
      <form onSubmit={onSubmit} className="mt-5 space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Your name</span>
            <input required value={form.name} onChange={(e) => update("name", e.target.value)}
              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Email</span>
            <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Phone</span>
          <input required value={form.phone} onChange={(e) => update("phone", e.target.value)}
            className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Which offering calls you?</span>
          <select value={form.offering} onChange={(e) => update("offering", e.target.value)}
            className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            {offerings.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Preferred date / time</span>
          <input value={form.preferred_date} onChange={(e) => update("preferred_date", e.target.value)}
            placeholder="e.g. weekday evenings, or Sat May 25 afternoon"
            className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">What's bringing you in? (optional)</span>
          <textarea rows={2} value={form.notes} onChange={(e) => update("notes", e.target.value)}
            placeholder="Anything you'd like Mehtap to know about what you're moving through..."
            className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {SQUARE_BOOKING_LINKS[form.offering] ? "Continue to booking calendar →" : "Request my session"}
        </button>
        <p className="text-[11px] text-center text-muted-foreground">
          By submitting, you agree to be contacted about your session. Your info is never shared.
        </p>
      </form>
        )}
      </div>
    </section>
    <WellnessConsultantSection />
    <GiftCertificateSection />
    </>
  );
}

const STRIPE_GIFT_LINK = "https://buy.stripe.com/cNieVegwKc9G4V09XV1Jm0i";

function GiftCertificateSection() {
  const [form, setForm] = useState({
    purchaserName: "",
    purchaserEmail: "",
    recipientName: "",
    duration: "60" as "60" | "90",
  });
  const [submitting, setSubmitting] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const certUrl = form.duration === "90" ? "/media/gift-certificate-90.jpg" : "/media/gift-certificate-60.jpg";
  const certFilename = form.duration === "90"
    ? "Iridescence-Healing-Gift-Voucher-90.jpg"
    : "Iridescence-Healing-Gift-Voucher-60.jpg";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitLeadRequest({
        email: form.purchaserEmail,
        name: form.purchaserName,
        source: `gift-certificate-${form.duration}`,
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
        <div className="p-6 sm:p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Gift a session</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl text-balance">
            A gift of peace, rest and renewal.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">
            Purchase a 60 or 90 minute gift voucher for any session of their choice — Reiki & Sound or Breath & Yoga. After checkout, your personalized voucher is ready to download right here.
          </p>

          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Your name</span>
                <input required value={form.purchaserName} onChange={(e) => setForm((f) => ({ ...f, purchaserName: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Your email</span>
                <input required type="email" value={form.purchaserEmail} onChange={(e) => setForm((f) => ({ ...f, purchaserEmail: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Recipient's name (optional)</span>
              <input value={form.recipientName} onChange={(e) => setForm((f) => ({ ...f, recipientName: e.target.value }))}
                placeholder="Who is this gift for?"
                className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <div>
              <span className="text-xs font-medium text-muted-foreground">Voucher length</span>
              <div className="mt-1 grid grid-cols-2 gap-3">
                {(["60", "90"] as const).map((d) => (
                  <button key={d} type="button" onClick={() => setForm((f) => ({ ...f, duration: d }))}
                    className={`rounded-xl border px-3 py-2 text-sm transition ${form.duration === d ? "border-primary bg-primary/5 font-medium" : "border-input bg-background"}`}>
                    {d} minutes
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft disabled:opacity-60">
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

        <div className="bg-accent/40 p-4 sm:p-6 flex items-center justify-center">
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

function WellnessConsultantSection() {
  return (
    <section id="wellness-consultant" className="mx-auto max-w-5xl px-5 sm:px-8 py-16">
      <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Bespoke experiences</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl text-balance">
            Book me as your Wellness Experience Designer & Consultant
          </h2>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">
            I partner with hotels, retreats, corporate teams and private hosts to design immersive wellness experiences—from bespoke guest programming to sound baths, Reiki, cacao ceremonies and transformational group experiences—all thoughtfully tailored to your space and your guests. Whether you are planning a spa day, retreat, wellness weekend, team gathering, wedding celebration or hotel guest offering, I work with you to create an overall wellness experience that weaves together the right treatments, ceremonies and moments of stillness so every guest leaves feeling transformed.
          </p>
          <a
            href="mailto:info@iridescencehealing.com?subject=Wellness%20Experience%20Consultant%20Inquiry"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft"
          >
            Email me about your event →
          </a>
        </div>
      </div>
    </section>
  );
}


