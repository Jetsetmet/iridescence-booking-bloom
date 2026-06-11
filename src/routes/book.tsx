import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { z } from "zod";
import { Check, Triangle, Mail } from "lucide-react";
import { BOOKING_EMAIL, buildBookingMailto } from "@/lib/booking";

const searchSchema = z.object({
  offering: z.string().optional(),
  event: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Session — Iridescence Healing" },
      { name: "description", content: "Reserve a private Reiki, sound bath, cacao ceremony, breath & yoga or mentoring session with Mehtap in New Orleans." },
    ],
  }),
  validateSearch: searchSchema,
  component: Book,
});

function Book() {
  const search = Route.useSearch();
  const mailto = useMemo(
    () => buildBookingMailto({ offering: search.offering, event: search.event }),
    [search.offering, search.event],
  );

  useEffect(() => {
    // Auto-launch the user's email client so booking goes straight to Mehtap's inbox.
    const t = setTimeout(() => {
      window.location.href = mailto;
    }, 400);
    return () => clearTimeout(t);
  }, [mailto]);

  return (
    <section className="mx-auto max-w-2xl px-5 sm:px-8 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Book your session</p>
      <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">A soft place to land.</h1>
      <p className="mt-4 text-muted-foreground text-pretty">
        Booking is personal here. Send Mehtap a quick note and she'll confirm your session within 24 hours.
      </p>

      {(search.offering || search.event) && (
        <p className="mt-4 text-sm text-foreground/80">
          {search.offering && <>Offering: <span className="font-medium">{search.offering}</span></>}
          {search.event && <><br />Event: <span className="font-medium">{search.event}</span></>}
        </p>
      )}

      <a
        href={mailto}
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-soft"
      >
        <Mail className="h-4 w-4" />
        Email Mehtap to book
      </a>
      <p className="mt-3 text-xs text-muted-foreground">
        If your email client doesn't open, write directly to{" "}
        <a href={`mailto:${BOOKING_EMAIL}`} className="underline">{BOOKING_EMAIL}</a>.
      </p>

      <ul className="mt-12 space-y-3 text-sm text-foreground/80 inline-block text-left">
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
      <div className="mt-10 rounded-2xl border border-border bg-card p-5 text-sm text-left">
          <Triangle className="h-4 w-4" />
          <p className="mt-2 font-medium">Not sure which session is right?</p>
          <a href="/quiz" className="mt-1 inline-block underline underline-offset-4">Take the 60-second quiz →</a>
        </div>
    </section>
  );
}
