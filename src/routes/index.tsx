import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-meditation.jpg";
import soundImg from "@/assets/sound-bowls.jpg";
import reikiImg from "@/assets/reiki-hands.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import { ArrowRight, Triangle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reiki, Sound Healing & Energy Work in New Orleans | Iridescence Healing" },
       { name: "description", content: "New Orleans Reiki Master Mehtap offers crystal Reiki, sound baths, cacao ceremonies, breathwork, yoga, meditation and self-love mentoring. 17+ years of intuitive energy healing in uptown New Orleans." },
       { property: "og:title", content: "Reiki & Sound Healing in New Orleans - Iridescence Healing" },
       { property: "og:description", content: "Crystal Reiki, sound baths, cacao ceremonies, breathwork and intuitive energy guidance with Mehtap in uptown New Orleans." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const offerings = [
  { icon: Triangle, title: "Crystal Reiki & Sound", desc: "One-on-one energy healing to clear, restore and reconnect.", img: reikiImg },
  { icon: Triangle, title: "Sound Baths", desc: "Group and private sound journeys with crystal & Tibetan bowls.", img: soundImg },
  { icon: Triangle, title: "Cacao Ceremony", desc: "Heart-opening ceremonial cacao circles in sacred space.", img: cacaoImg },
];

const testimonials = [
  { quote: "Mehtap held the most beautiful, safe container. I left feeling completely re-tuned to myself.", name: "Sarah K." },
  { quote: "The sound bath was unlike anything I've experienced — I cried, I laughed, I came home.", name: "Daniel R." },
  { quote: "A genuine healer. The Reiki session shifted something I'd been carrying for years.", name: "Aisha M." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance">
              A gentle return to your <span className="italic">inner light</span>.
            </h1>
             <p className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty">
               I'm Mehtap - offering heart led healing through Reiki, Sound and Ceremony in uptown New Orleans.
             </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90 transition-opacity"
              >
                Book a Session <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/offerings"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                View Offerings <Triangle className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Mehtap leading meditation and energy healing at golden hour — Reiki and sound healing in New Orleans"
              width={1080}
              height={1920}
              className="relative rounded-[2rem] shadow-card object-cover w-full h-[520px] lg:h-[640px]"
            />
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Welcome</p>
          <p className="mt-4 font-display text-2xl sm:text-3xl leading-relaxed text-pretty">
            An honour your path led you here.
          </p>
          <p className="mt-5 text-muted-foreground text-pretty">
            A nurturing space uptown in New Orleans where ancient energy and heart medicine meet -
            sound baths, Reiki, cacao, breathwork, meditation and mentoring to help you slow down,
            reconnect and remember the wisdom within you.
          </p>
          <p className="mt-4 text-muted-foreground italic">This is where your journey to wholeness begins. With love…</p>
        </div>
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
                <img src={o.img} alt={`${o.title} in New Orleans with Mehtap - Iridescence Healing`} loading="lazy" width={1280} height={960}
                  className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-primary">
                  <Triangle className="h-4 w-4" />
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
        <div className="relative overflow-hidden rounded-[2rem] bg-card border border-border p-10 sm:p-16 shadow-card">
          <div className="relative max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Not sure where to begin?</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">
              Take the 60-second journey quiz.
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              Five gentle questions to help you discover the healing practice
              that's calling you right now — Reiki, sound, cacao, breath or mentoring.
            </p>
            <Link
              to="/quiz"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Begin the journey <Triangle className="h-4 w-4" />
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
              <Triangle className="h-5 w-5 text-primary/60" />
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
        <Triangle className="mx-auto h-6 w-6 text-primary animate-shimmer" />
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
