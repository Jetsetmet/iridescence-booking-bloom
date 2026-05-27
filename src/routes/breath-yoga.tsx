import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Triangle } from "lucide-react";
import breathYogaHero from "@/assets/breath-yoga-hero.jpg";
import kundaliniImg from "@/assets/kundalini-meditation.jpg";
import { HeartOpeningFunnel } from "@/components/site/HeartOpeningFunnel";
import { SQUARE_URL } from "@/lib/booking";

export const Route = createFileRoute("/breath-yoga")({
  head: () => ({
    meta: [
      { title: "Meditation, Breathwork & Kundalini Yoga — Iridescence Healing" },
      { name: "description", content: "Private meditation, breathwork and Kundalini yoga with Met — in person in New Orleans or virtually. Weekly Kundalini class Saturdays 9:30am at Spyre." },
      { property: "og:title", content: "Breath & Yoga — Iridescence Healing" },
      { property: "og:description", content: "Calm the mind, soothe the nervous system, awaken the energy within." },
      { property: "og:image", content: breathYogaHero },
    ],
  }),
  component: BreathYoga,
});

const tiers = [
  { label: "Private Session", duration: "60 min", price: "$130" },
  { label: "Private Session", duration: "90 min", price: "$170" },
  { label: "Group Booking", duration: "90 min", price: "$140 pp", note: "up to 6, more on request" },
];

function BreathYoga() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Meditation · Breathwork · Kundalini</p>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">
            Awaken the energy <span className="italic bg-iridescent bg-clip-text text-transparent">within</span>.
          </h1>
          <p className="mt-6 text-foreground/80 leading-relaxed text-pretty">
            Meditation and breathwork are gentle yet powerful practices that calm the mind, nurture the heart and restore balance. Meditation creates space to reconnect with your true self, while breathwork helps release tension, soothe the nervous system and bring clarity.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed text-pretty">
            Kundalini yoga weaves meditation, breathwork and mindful movement together to clear blockages in the energy system — restoring harmony, supporting emotional healing and deepening spiritual awareness.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" search={{ offering: "Breathwork" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Book a session <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
              Book a discovery call
            </Link>
          </div>
        </div>
        <img src={breathYogaHero} alt="Hands in meditation mudra by the water during breathwork practice"
          loading="lazy" width={1200} height={1200}
          className="rounded-[2rem] shadow-glow object-cover w-full h-[480px]" />
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12 grid md:grid-cols-2 gap-10 items-center">
        <img src={kundaliniImg} alt="Kundalini yoga practice"
          loading="lazy" width={1200} height={1200}
          className="rounded-[2rem] shadow-soft object-cover w-full h-[440px] order-2 md:order-1" />
        <div className="order-1 md:order-2">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Yoga</p>
          <h2 className="mt-2 font-display text-4xl">Kundalini — heart-centered & transformative.</h2>
          <p className="mt-4 text-foreground/80 leading-relaxed text-pretty">
            Kundalini yoga blends dynamic movement, breathwork and mantra to awaken the dormant energy within the body. Rooted in ancient yogic tradition, it is challenging and deeply transformative. Met has practiced yoga for over 20 years and teaches from her own lived journey.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed text-pretty">
            She completed her Hatha Yoga teacher training at Wild Lotus Yoga in 2014, with additional training in restorative and children's yoga. In 2023 she deepened her path in India through intensive Kundalini training with Gurmukh and Guru Shabd of Golden Bridge Yoga.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft text-center">
          <Triangle className="h-5 w-5 text-primary mx-auto" />
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary/80">Weekly Class</p>
          <h2 className="mt-2 font-display text-4xl">Kundalini Yoga at Spyre New Orleans</h2>
          <p className="mt-3 text-foreground/80">Saturdays · 9:30am</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Reach out to Met <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
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
              <a href={SQUARE_URL} target="_blank" rel="noreferrer" className="text-sm font-display text-primary whitespace-nowrap hover:underline">{t.price}</a>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link to="/offerings" className="text-sm text-muted-foreground hover:text-foreground">← All offerings</Link>
        </div>
      </section>

      <HeartOpeningFunnel />
    </>
  );
}