import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { submitBooking } from "@/lib/funnel.functions";
import { Loader2, Check, Triangle } from "lucide-react";
import { toast } from "sonner";

const offerings = ["Reiki", "Sound Bath", "Resonance & Release", "Cacao Ceremony", "Breathwork", "Mentoring", "Retreat", "Not sure yet"];

const searchSchema = z.object({
  offering: z.string().optional(),
  event: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Session — Iridescence Healing" },
      { name: "description", content: "Reserve a private Reiki, sound bath, cacao ceremony, breathwork or mentoring session with Mehtap in New Orleans." },
    ],
  }),
  validateSearch: searchSchema,
  component: Book,
});

function Book() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const submit = useServerFn(submitBooking);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    offering: search.offering || offerings[0],
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
      toast.success("Booking received - Mehtap will be in touch within 24 hours.");
      navigate({ to: "/thanks" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not submit — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-8 py-16 grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
      <div className="lg:sticky lg:top-24">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Book your session</p>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">
          A soft place to land.
        </h1>
        <p className="mt-4 text-muted-foreground text-pretty">
          Share a few details and your preferred timing. Mehtap will personally confirm your session within 24 hours.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-foreground/80">
          {[
            "Personally confirmed by Mehtap",
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
          <p className="mt-2 font-medium">Already know what you'd like?</p>
          <p className="mt-1 text-foreground/80">Skip the form and pick a time directly.</p>
          <a
            href="https://book.squareup.com/appointments/375ed9f0-ab7e-432c-a72d-65545ae811a5/location/8Z003QJZ46SBG/services?rwg_token=AFd1xnG8opsnB8WvxAc5Gu92w-ep4LAQyNqcaVA4S02XPh2Ls2RPId34yddJHpbz57l-ZkUuMTWlbLQRyenGhZi2TDn3gUVGPg%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground"
          >
            Book directly on Square →
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
          Request my session
        </button>
        <p className="text-[11px] text-center text-muted-foreground">
          By submitting, you agree to be contacted about your session. Your info is never shared.
        </p>
      </form>
    </section>
  );
}
