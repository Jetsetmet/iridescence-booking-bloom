import { createFileRoute, Link } from "@tanstack/react-router";
import soundImg from "@/assets/sound-bowls.jpg";
import reikiImg from "@/assets/reiki-hands.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import heroImg from "@/assets/hero-meditation.jpg";
import selfLoveImg from "@/assets/self-love.jpg";
import packagesImg from "@/assets/moon.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/offerings")({
  head: () => ({
    meta: [
      { title: "Offerings — Reiki, Sound, Cacao, Breath & Mentoring in New Orleans" },
      { name: "description", content: "Explore Iridescence Healing offerings: Crystal Reiki, sound baths, cacao ceremonies, breath & yoga, self-love mentoring, session packages and retreats." },
      { property: "og:title", content: "Healing Offerings — Iridescence Healing" },
      { property: "og:description", content: "A curated path of sacred practices held with Mehtap in uptown New Orleans." },
    ],
  }),
  component: Offerings,
});

type Card = {
  title: string;
  img: string;
  to: string;
  blurb: string;
  from: string;
};

const cards: Card[] = [
  { title: "Crystal Reiki & Sound", img: reikiImg, to: "/crystal-reiki", blurb: "Intuitive energy work woven with crystals, breath and 432Hz quartz bowls.", from: "from $110" },
  { title: "Sound Bath Journey", img: soundImg, to: "/sound-baths", blurb: "Tibetan and crystal bowls, gongs and chimes for couples, groups and retreats.", from: "from $140 pp" },
  { title: "Cacao Ceremonies", img: cacaoImg, to: "/cacao-ceremonies", blurb: "Heart-opening ceremonial cacao with breath, intention and connection.", from: "from $390" },
  { title: "Breath & Yoga", img: heroImg, to: "/breath-yoga", blurb: "Guided pranayama, somatic breath journeys and Kundalini yoga.", from: "from $130" },
  { title: "Self-Love Mentoring", img: selfLoveImg, to: "/self-love-mentoring", blurb: "A devotional six-week mentorship to reclaim your wholeness and intuition.", from: "$720" },
  { title: "Session Packages", img: packagesImg, to: "/packages", blurb: "Bundled in-person or virtual sessions with a 10% discount.", from: "from $468" },
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
          Choose a path below to explore the full experience, pricing and how to book.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <li key={c.to}>
              <Link
                to={c.to}
                className="group block h-full rounded-3xl border border-border bg-card/50 overflow-hidden shadow-card hover:shadow-glow transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.img}
                    alt={`${c.title} with Mehtap at Iridescence Healing`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-2xl">{c.title}</h2>
                    <span className="text-sm font-display text-primary whitespace-nowrap">{c.from}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Explore <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <div className="rounded-3xl border border-border bg-card/50 p-8 sm:p-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Not sure where to begin?</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">Find the practice that's calling you.</h2>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/quiz" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft">Take the 60-second quiz</Link>
            <Link to="/contact" className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-accent transition-colors">Ask Mehtap</Link>
          </div>
        </div>
      </section>
    </>
  );
}