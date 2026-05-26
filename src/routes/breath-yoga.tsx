import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Triangle } from "lucide-react";
import breathYogaHero from "@/assets/breath-yoga-hero.webp";

export const Route = createFileRoute("/breath-yoga")({
  head: () => ({
    meta: [
      { title: "Breathwork & Kundalini Yoga Sessions in New Orleans" },
      { name: "description", content: "Guided pranayama, somatic breath journeys and Kundalini yoga with Mehtap — private, couple and group sessions in New Orleans." },
      { property: "og:title", content: "Breath & Yoga — Iridescence Healing" },
      { property: "og:description", content: "Release stored emotion and meet yourself in stillness." },
    ],
  }),
  component: BreathYoga,
});

const tiers = [
  { label: "Private Session", duration: "60 min", price: "$130" },
  { label: "Private Session", duration: "90 min", price: "$170" },
  { label: "Couple & Group Booking", duration: "90 min", price: "$140 pp", note: "up to 6, more on request" },
];

function BreathYoga() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden shadow-card">
          <img
            src={breathYogaHero}
            alt="Hands in meditation mudra by the water during breathwork practice"
            className="w-full h-auto md:h-[460px] object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Sacred practice</span>
          </div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">Breath & Yoga</h1>
          <p className="mt-4 text-muted-foreground text-pretty">
            Guided pranayama, somatic breath journeys and Kundalini yoga to release stored emotion,
            regulate the nervous system, and meet yourself in stillness. Each session is shaped to
            your body and intention — held privately, as a couple, or in small groups.
          </p>
          <Link
            to="/book"
            search={{ offering: "Breathwork" }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft"
          >
            Book a session <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-8 pb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Pricing</p>
        <h2 className="mt-2 font-display text-3xl">Session options</h2>
        <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card/50">
          {tiers.map((t, i) => (
            <li key={i} className="flex items-baseline justify-between gap-4 px-5 py-4">
              <div>
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {t.duration}{t.note ? ` · ${t.note}` : ""}
                </div>
              </div>
              <div className="text-sm font-display text-primary whitespace-nowrap">{t.price}</div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link to="/offerings" className="text-sm text-muted-foreground hover:text-foreground">← All offerings</Link>
        </div>
      </section>
    </>
  );
}