import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Triangle } from "lucide-react";
import heroImg from "@/assets/hero-meditation-new.jpg";
import yogaImg from "@/assets/met-meditation.jpg";
import { HeartOpeningFunnel } from "@/components/site/HeartOpeningFunnel";

export const Route = createFileRoute("/meditation")({
  head: () => ({
    meta: [
      { title: "Meditation, Breathwork & Kundalini Yoga — Iridescence Healing" },
      { name: "description", content: "Private meditation, breathwork and Kundalini yoga sessions with Met — in person in New Orleans or virtually. Weekly Kundalini class Saturdays 9:30am at Spyre." },
      { property: "og:title", content: "Meditation, Breathwork & Kundalini Yoga" },
      { property: "og:description", content: "Calm the mind, soothe the nervous system, awaken the energy within." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Meditation,
});

function Meditation() {
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
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Book a discovery call <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/offerings" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
              View all offerings
            </Link>
          </div>
        </div>
        <img src={heroImg} alt="Meditation and Kundalini yoga with Met of Iridescence Healing"
          loading="lazy" width={1200} height={1200}
          className="rounded-[2rem] shadow-glow object-contain w-full h-[480px] bg-card" />
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12 grid md:grid-cols-2 gap-10 items-center">
        <img src={yogaImg} alt="Kundalini yoga practice"
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

      <HeartOpeningFunnel />

      <section className="mx-auto max-w-4xl px-5 sm:px-8 py-16 text-center">
        <h2 className="font-display text-4xl">Private sessions</h2>
        <p className="mt-4 text-foreground/80 leading-relaxed">
          If you're feeling called to deepen your practice, Met offers private meditation and yoga sessions tailored to your needs — in person in New Orleans or virtually from anywhere.
        </p>
        <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
          Arrange a discovery call <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}