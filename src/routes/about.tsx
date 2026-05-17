import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-meditation.jpg";
import { Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Met — Iridescence Healing" },
      { name: "description", content: "Meet Mehtap (Met), Reiki Master, sound healer and ceremony holder in uptown New Orleans." },
      { property: "og:title", content: "About Met — Iridescence Healing" },
      { property: "og:description", content: "Meet Mehtap (Met), Reiki Master and sound healer in New Orleans." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: About,
});

function About() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid lg:grid-cols-2 gap-12 items-start">
      <div className="lg:sticky lg:top-24">
        <img src={heroImg} alt="Met" loading="lazy" width={1080} height={1920}
          className="rounded-[2rem] shadow-glow object-cover w-full h-[520px]" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">About</p>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">
          With love, <span className="italic bg-iridescent bg-clip-text text-transparent">Met</span>.
        </h1>
        <div className="mt-6 space-y-5 text-foreground/80 leading-relaxed text-pretty">
          <p>
            I'm Mehtap — most people call me Met. I'm a certified Reiki Master,
            sound healer, breathwork guide and ceremony holder based in uptown
            New Orleans.
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
            Whether you're navigating a transition, releasing what no longer serves,
            or simply longing for stillness — you are welcome in this space, exactly as you are.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-2xl font-display">100+</div>
            <div className="text-muted-foreground mt-1">Sessions held</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-2xl font-display">5★</div>
            <div className="text-muted-foreground mt-1">Average review</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="text-2xl font-display">6+</div>
            <div className="text-muted-foreground mt-1">Years practicing</div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
            Book a Session <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/quiz" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
            Find Your Path <Sparkles className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
