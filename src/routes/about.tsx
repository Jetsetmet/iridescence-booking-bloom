import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-meditation.jpg";
import { Triangle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Mehtap — Reiki Master & Healer, New Orleans" },
      { name: "description", content: "Meet Mehtap — certified Reiki Master, sound healer, breathwork guide and intuitive energy practitioner in uptown New Orleans. 17+ years, 1000+ sessions." },
      { property: "og:title", content: "About Mehtap — Reiki Master & Healer, New Orleans" },
      { property: "og:description", content: "Certified Reiki Master, sound healer and intuitive guide in uptown New Orleans." },
      { property: "og:url", content: "https://iridescence-booking-bloom.lovable.app/about" },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "https://iridescence-booking-bloom.lovable.app/about" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid lg:grid-cols-2 gap-12 items-start">
      <div className="lg:sticky lg:top-24">
        <img src={heroImg} alt="Mehtap - Reiki Master, sound healer and intuitive energy guide in uptown New Orleans"
          loading="lazy" width={1080} height={1920}
          className="rounded-[2rem] shadow-glow object-cover w-full h-[520px]" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">About</p>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">
          With love, <span className="italic bg-iridescent bg-clip-text text-transparent">Mehtap</span>.
        </h1>
        <div className="mt-6 space-y-5 text-foreground/80 leading-relaxed text-pretty">
          <p>
          </p>
          <p>
            My path to this work began as so many do — through my own quiet unraveling.
            Years of seeking led me to the ancient practices that gently put me back together,
           and I now offer them as a soft return for anyone called to slow down.
          </p>
          <p>
            My approach is rooted in heart medicine, ancestral wisdom and a deep
            trust in the body's innate intelligence. There is no agenda here other
            than your remembering.
          </p>
          <p>
            UK-born with Turkish Cypriot roots, I was introduced early on to the healing
            power of prayer, energy, intention and plants — a connection that sparked a
            lifelong passion for wellness and transformation.
          </p>
          <p>
            My path has been shaped by profound personal loss and a deep bond with nature.
            After losing my father at age 10 and facing my mother's life-threatening illness
            just two years later, I found strength and solace in the natural world. A miraculous
            kidney donation from my aunt saved my mother's life, reinforcing my faith in the
            divine and the power of love and resilience.
          </p>
          <p>
            These experiences guided me through grief, abandonment and self-discovery, until
            I came to understand that self-love is the foundation of true healing — a message
            that now lies at the heart of my work.
          </p>
          <p>
          </p>
          <p>
          </p>
          <p>
            In 2018, I began working with plant medicines, later deepening my connection through
            a yearlong apprenticeship in Ecuador. This led me to offer heart-opening cacao
            ceremonies and sacred healing work — now woven into ceremonies for couples and global retreats.
          </p>
          <p>
            I've supported hundreds of clients through deep emotional release, energetic alignment and spiritual transformation — holding space with presence, compassion, and deep reverence for each person's journey.
          </p>
          <p className="mt-8">
            My intention is simple: to guide others back to their own inner wisdom, where healing, love, and truth already reside. Thank you for trusting me on your journey...
          </p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-2xl font-display">1000+</div>
            <div className="text-muted-foreground mt-1">Sessions held</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-2xl font-display">5★</div>
            <div className="text-muted-foreground mt-1">Average review</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-2xl font-display">17+</div>
            <div className="text-muted-foreground mt-1">Years practicing</div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
            Book a Session <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/quiz" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
            Find Your Path <Triangle className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
