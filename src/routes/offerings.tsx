import { createFileRoute, Link } from "@tanstack/react-router";
import soundImg from "@/assets/sound-bowls.jpg";
import reikiImg from "@/assets/reiki-hands.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import heroImg from "@/assets/hero-meditation.jpg";
import selfLoveImg from "@/assets/self-love.jpg";
import { ArrowRight, Heart, Music2, Flame, Wind, Sparkles, Triangle } from "lucide-react";

export const Route = createFileRoute("/offerings")({
  head: () => ({
    meta: [
      { title: "Reiki, Sound Healing, Cacao & Breathwork Sessions in New Orleans" },
      { name: "description", content: "Book Crystal Reiki, sound baths, cacao ceremonies, breathwork, yoga, meditation and self-love mentoring with Met in uptown New Orleans. Private, couple, group and virtual sessions." },
      { property: "og:title", content: "Healing Sessions in New Orleans — Iridescence Healing" },
      { property: "og:description", content: "Reiki, sound healing, cacao ceremonies, breathwork and intuitive mentoring in New Orleans." },
    ],
  }),
  component: Offerings,
});

type Tier = { label: string; duration?: string; price: string; note?: string };
const items: Array<{
  icon: typeof Heart; title: string; img: string; slug: string; desc: string; tiers: Tier[];
}> = [
  {
    icon: Heart, title: "Crystal Reiki & Sound", img: reikiImg, slug: "Reiki",
    desc: "One-on-one Reiki sound healings that weave hands-on energy work with crystal singing bowls — to clear stagnation, restore flow, and welcome your nervous system home. Met specializes in couples, one-on-one and group sessions.",
    tiers: [
      { label: "Crystal Reiki & Sound", duration: "60 min", price: "$130" },
      { label: "Student Crystal Reiki & Sound", duration: "60 min", price: "$110" },
      { label: "Crystal Reiki & Sound", duration: "90 min", price: "$170" },
      { label: "Couple & Group Bookings", duration: "90 min", price: "$140 pp", note: "up to 6, more on request" },
    ],
  },
  {
    icon: Music2, title: "Sound Bath Journey", img: soundImg, slug: "Sound Bath",
    desc: "A sonic journey with crystal singing bowls, gongs and chimes — held for couples, intimate groups, and retreats.",
    tiers: [
      { label: "Retreat Sound Bath Journey", price: "Please email" },
      { label: "Couple & Group Bookings", duration: "90 min", price: "$140 pp", note: "up to 4, more on request" },
    ],
  },
  {
    icon: Flame, title: "Cacao Ceremonies", img: cacaoImg, slug: "Cacao Ceremony",
    desc: "Heart-opening ceremonial cacao with breath, intention and gentle sharing — for couples and retreat groups.",
    tiers: [
      { label: "Couples Cacao", duration: "110 min", price: "$390" },
      { label: "Retreat Cacao", price: "Please email" },
    ],
  },
  {
    icon: Wind, title: "Meditation • Breath • Yoga", img: heroImg, slug: "Breathwork",
    desc: "Guided pranayama, somatic breath journeys and gentle yoga to release stored emotion and meet yourself in stillness.",
    tiers: [
      { label: "Meditation • Breathwork", duration: "60 min", price: "$130" },
      { label: "Meditation • Breath • Yoga", duration: "90 min", price: "$170" },
      { label: "Couple & Group Bookings", duration: "90 min", price: "$140 pp", note: "up to 6, more on request" },
    ],
  },
  {
    icon: Sparkles, title: "Self-Love Mentoring", img: selfLoveImg, slug: "Mentoring",
    desc: "A devotional mentorship for those called to reclaim their wholeness, intuition and inner power — offered in person and virtually.",
    tiers: [
      { label: "6 Week Cosmic Mentoring", price: "$720" },
    ],
  },
  {
    icon: Sparkles, title: "In Person & Virtual Packages", img: heroImg, slug: "Mentoring",
    desc: "Bundled session packages with a 10% discount — held in person in uptown New Orleans or virtually from anywhere.",
    tiers: [
      { label: "Four 60-min Sessions", duration: "10% discount", price: "$468" },
      { label: "Four 90-min Sessions", duration: "10% discount", price: "$612" },
    ],
  },
];

function Offerings() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Offerings</p>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance max-w-3xl">
          Sacred practices for your remembering.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Each offering is held with intention, presence, and a soft container — so you can soften the rest.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-16 space-y-10">
        {items.map((o, i) => (
          <article key={o.title} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
            <div className="rounded-3xl overflow-hidden shadow-card">
              <img src={o.img} alt={`${o.title} session with Met at Iridescence Healing in New Orleans`}
                loading="lazy" width={1280} height={960}
                className="w-full h-[360px] object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-primary">
                <Triangle className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Sacred practice</span>
              </div>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">{o.title}</h2>
              <p className="mt-3 text-muted-foreground text-pretty">{o.desc}</p>
              <ul className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card/50">
                {o.tiers.map((t, ti) => (
                  <li key={ti} className="flex items-baseline justify-between gap-4 px-4 py-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{t.label}</div>
                      {(t.duration || t.note) && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {t.duration}{t.duration && t.note ? " · " : ""}{t.note}
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-display whitespace-nowrap text-primary">{t.price}</div>
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                search={{ offering: o.slug }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft"
              >
                Book {o.title} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
