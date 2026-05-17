import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-meditation.jpg";
import soundImg from "@/assets/sound-bowls.jpg";
import reikiImg from "@/assets/reiki-hands.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import { Sparkles, Heart, Wind, Music2, Flame, ArrowRight, Quote } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Iridescence Healing — Reiki, Sound Baths & Cacao in New Orleans" },
      { name: "description", content: "A gentle return to your inner light. Reiki, sound healing, cacao ceremonies, breathwork and mentoring with Met in uptown New Orleans." },
      { property: "og:title", content: "Iridescence Healing — New Orleans" },
      { property: "og:description", content: "Reiki, sound healing, cacao ceremonies and breathwork in uptown New Orleans." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const offerings = [
  { icon: Heart, title: "Reiki Healing", desc: "One-on-one energy healing to clear, restore, and reconnect.", img: reikiImg },
  { icon: Music2, title: "Sound Baths", desc: "Group and private sound journeys with crystal & Tibetan bowls.", img: soundImg },
  { icon: Flame, title: "Cacao Ceremony", desc: "Heart-opening ceremonial cacao circles in sacred space.", img: cacaoImg },
];

const testimonials = [
  { quote: "Met held the most beautiful, safe container. I left feeling completely re-tuned to myself.", name: "Sarah K." },
  { quote: "The sound bath was unlike anything I've experienced — I cried, I laughed, I came home.", name: "Daniel R." },
  { quote: "A genuine healer. The Reiki session shifted something I'd been carrying for years.", name: "Aisha M." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-aura pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Uptown New Orleans · In-person & remote
            </div>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance">
              A gentle return to your <span className="italic bg-iridescent bg-clip-text text-transparent">inner light</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty">
              I'm Met. Through Reiki, sound, breath and ceremony I hold a soft space
              for you to slow down, reconnect, and remember the wisdom within you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90 transition-opacity"
              >
                Book a Session <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                Find Your Path <Sparkles className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div>★★★★★ <span className="ml-1">100+ guided journeys</span></div>
              <div className="h-4 w-px bg-border" />
              <div>Certified Reiki Master</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-iridescent rounded-[2rem] opacity-40 blur-2xl" />
            <img
              src={heroImg}
              alt="Met in meditation at golden hour in a tropical garden"
              width={1080}
              height={1920}
              className="relative rounded-[2rem] shadow-glow object-cover w-full h-[520px] lg:h-[640px]"
            />
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Offerings</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl text-balance">
            Choose the medicine that's calling you.
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {offerings.map((o) => (
            <Link
              key={o.title}
              to="/offerings"
              className="group rounded-3xl overflow-hidden bg-card shadow-card border border-border hover:shadow-glow transition-all"
            >
              <div className="aspect-[5/4] overflow-hidden">
                <img src={o.img} alt={o.title} loading="lazy" width={1280} height={960}
                  className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-primary">
                  <o.icon className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">Sacred practice</span>
                </div>
                <h3 className="mt-2 font-display text-2xl">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUIZ CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-iridescent p-10 sm:p-16 shadow-soft">
          <div className="relative max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/70">Not sure where to begin?</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">
              Take the 60-second journey quiz.
            </h2>
            <p className="mt-4 text-foreground/80 text-pretty">
              Five gentle questions to help you discover the healing practice
              that's calling you right now — Reiki, sound, cacao, breath or mentoring.
            </p>
            <Link
              to="/quiz"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              Begin the journey <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Voices from the circle</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl text-balance">
            What people share after a session.
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-3xl bg-card border border-border p-7 shadow-card">
              <Quote className="h-5 w-5 text-primary/60" />
              <blockquote className="mt-4 font-display text-xl leading-snug text-pretty">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 py-20 text-center">
        <Wind className="mx-auto h-6 w-6 text-primary animate-shimmer" />
        <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance">
          Your journey to wholeness begins here.
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground text-pretty">
          Book a one-on-one session, join an upcoming circle, or reach out — I'd love to hear what brought you here.
        </p>
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
            Book a Session <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/events" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
            View Upcoming Events
          </Link>
        </div>
      </section>
    </>
  );
}
