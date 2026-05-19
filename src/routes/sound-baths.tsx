import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Triangle, ExternalLink } from "lucide-react";
import heroImg from "@/assets/sound-bowls.jpg";

export const Route = createFileRoute("/sound-baths")({
  head: () => ({
    meta: [
      { title: "Sound Bath Journeys — Iridescence Healing" },
      { name: "description", content: "Heart-opening sound bath journeys with Met — 432Hz crystal bowls, 528Hz chimes, gongs and monochord. Hosted at retreat spaces across Europe, the US and Costa Rica." },
      { property: "og:title", content: "Sound Bath Journeys with Met — Iridescence Healing" },
      { property: "og:description", content: "High-vibrational sound healing journeys at retreats across Europe, the US and Costa Rica." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: SoundBaths,
});

const venues: Array<{ name: string; url?: string }> = [
  { name: "Spyre New Orleans", url: "https://www.thecenternola.com/spyre" },
  { name: "Wild Lotus Yoga", url: "https://wildlotusyoga.com/" },
  { name: "Arora", url: "https://www.aroranola.com/" },
  { name: "The Nest Costa Rica", url: "https://reganhillyer.com/pages/the-nest-private-immersions" },
  { name: "Imiloa Institute", url: "https://imiloainstitute.com/" },
  { name: "Holos", url: "https://holos.global/" },
  { name: "Danyasa Yoga Retreat", url: "https://www.danyasa.com/" },
  { name: "Tribe Boutique Hotel", url: "https://www.tribeboutiquehotel.com/" },
  { name: "Awake Uvita", url: "https://www.awake.cr/" },
  { name: "Synergy Uvita", url: "https://synergycostarica.com/" },
  { name: "Yacumama", url: "https://www.yacumama.love/" },
  { name: "Finca Mia", url: "https://www.fincamia.com/" },
  { name: "The Shala" },
  { name: "Sol Rising" },
  { name: "Casa Colibri" },
  { name: "Astanga Rooms" },
  { name: "Trilith Studios" },
];

function SoundBaths() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Sound Bath Journeys</p>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">
            High-vibrational <span className="italic bg-iridescent bg-clip-text text-transparent">sound</span>, deep remembering.
          </h1>
          <p className="mt-6 text-foreground/80 leading-relaxed text-pretty">
            Met gently guides you on a meditative healing journey using 432Hz crystal bowls, 528Hz chimes, solfeggio frequencies, gongs and the monochord — chosen intuitively to relax the nervous system, nurture inner peace and activate the chakras to their purest, loving essence.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed text-pretty">
            An inner journey to reconnect with both your past and future selves — to resolve, release and step into who you truly are.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" search={{ offering: "Sound Bath" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Book a sound bath <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
              Host at your retreat
            </Link>
          </div>
        </div>
        <img src={heroImg} alt="Met holding a 432Hz crystal singing bowl at sunset on the beach — sound bath journey with Iridescence Healing"
          loading="lazy" width={1200} height={1200}
          className="rounded-[2rem] shadow-glow object-cover w-full h-[480px]" />
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft">
          <div className="flex items-center gap-2">
            <Triangle className="h-5 w-5 text-primary" />
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Featured at</p>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Retreat spaces Met has held sound baths at</h2>
          <p className="mt-3 text-foreground/80 text-pretty max-w-2xl">
            Public and private retreats across Europe, the US and Costa Rica. Click any space to visit their site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {venues.map((v) =>
              v.url ? (
                <a
                  key={v.name}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
                >
                  {v.name}
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              ) : (
                <span
                  key={v.name}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground/80"
                >
                  {v.name}
                </span>
              )
            )}
            <span className="inline-flex items-center px-5 py-2.5 text-sm text-muted-foreground italic">and more…</span>
          </div>
        </div>
      </section>
    </>
  );
}