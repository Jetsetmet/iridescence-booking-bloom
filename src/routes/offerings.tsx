import { createFileRoute, Link } from "@tanstack/react-router";
import soundImg from "@/assets/sound-bowls.jpg";
import reikiImg from "@/assets/reiki-hands.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import heroImg from "@/assets/hero-meditation.jpg";
import { ArrowRight, Heart, Music2, Flame, Wind, Sparkles } from "lucide-react";

export const Route = createFileRoute("/offerings")({
  head: () => ({
    meta: [
      { title: "Offerings — Iridescence Healing" },
      { name: "description", content: "Reiki, sound healing, cacao ceremony, breathwork, and self-love mentoring with Met in New Orleans." },
      { property: "og:title", content: "Offerings — Iridescence Healing" },
      { property: "og:description", content: "Reiki, sound healing, cacao ceremony, breathwork and mentoring." },
    ],
  }),
  component: Offerings,
});

const items = [
  { icon: Heart, title: "1-on-1 Reiki", duration: "75 min", price: "$133", img: reikiImg, slug: "Reiki",
    desc: "A deep energy healing session to clear stagnation, restore flow, and welcome your nervous system home. Includes intuitive crystal and oracle support." },
  { icon: Music2, title: "Private Sound Bath", duration: "60 min", price: "$155", img: soundImg, slug: "Sound Bath",
    desc: "A personal sonic journey with crystal singing bowls, gongs and chimes. Held one-on-one or for a small intimate group." },
  { icon: Flame, title: "Cacao Ceremony", duration: "2 hr", price: "$77", img: cacaoImg, slug: "Cacao Ceremony",
    desc: "Heart-opening ceremonial cacao circle with breath, intention, and gentle sharing. Group format, uptown New Orleans." },
  { icon: Wind, title: "Breathwork Guidance", duration: "60 min", price: "$111", img: heroImg, slug: "Breathwork",
    desc: "Guided pranayama and somatic breath journeys to release stored emotion and meet yourself in stillness." },
  { icon: Sparkles, title: "Self-Love Mentoring", duration: "4 sessions", price: "$444", img: heroImg, slug: "Mentoring",
    desc: "A 4-session mentorship for women called to reclaim their wholeness, intuition, and feminine power." },
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
              <img src={o.img} alt={o.title} loading="lazy" width={1280} height={960}
                className="w-full h-[360px] object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-primary">
                <o.icon className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">{o.duration} · {o.price}</span>
              </div>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">{o.title}</h2>
              <p className="mt-3 text-muted-foreground text-pretty">{o.desc}</p>
              <Link
                to="/book"
                search={{ offering: o.slug }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft"
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
