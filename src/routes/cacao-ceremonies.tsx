import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Triangle, Sparkles, Heart, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/funnel.functions";
import heroImg from "@/assets/cacao-ceremony.jpg";

export const Route = createFileRoute("/cacao-ceremonies")({
  head: () => ({
    meta: [
      { title: "Cacao Ceremonies — Iridescence Healing New Orleans" },
      { name: "description", content: "Heart-opening ceremonial cacao with Met in New Orleans — couples, group and retreat ceremonies, plus the Iridescence Cacao Starter Kit sourced from Costa Rica." },
      { property: "og:title", content: "Cacao Ceremonies with Met — Iridescence Healing" },
      { property: "og:description", content: "Ceremonial cacao from Costa Rica, woven with sound, breath and sacred ritual." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: CacaoCeremonies,
});

function CacaoCeremonies() {
  return (
    <>
      {/* HERO — editorial split with offset image */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iridescent opacity-[0.06]" aria-hidden />
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-20 pb-24 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 relative z-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary/80">Iridescence Cacao · New Orleans</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl text-balance leading-[1.02]">
              Let your heart{" "}
              <span className="italic bg-iridescent bg-clip-text text-transparent">glow</span>{" "}
              with every sip.
            </h1>
            <p className="mt-6 max-w-xl text-foreground/75 leading-relaxed text-pretty text-lg">
              Ceremonial cacao sourced from a small family farm in Costa Rica — brewed by Met
              to gently open the heart, soften old patterns and reconnect you to intuition,
              creativity and joy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book" search={{ offering: "Cacao Ceremony" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
                Book a ceremony <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
                Private & retreat enquiries
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-iridescent opacity-30 blur-2xl" aria-hidden />
              <img
                src={heroImg}
                alt="Ceremonial cacao with flowers — Iridescence Healing New Orleans"
                loading="lazy"
                width={900}
                height={1100}
                className="relative rounded-[2rem] shadow-glow object-cover w-full aspect-[4/5] lg:rotate-[2deg]"
              />
              <div className="absolute -bottom-5 -left-5 hidden md:flex items-center gap-2 rounded-full bg-card/90 backdrop-blur px-4 py-2 shadow-soft border border-border">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs tracking-wider uppercase">Costa Rica · single origin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20 grid md:grid-cols-2 gap-6">
        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft">
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Group Ceremony</span>
          </div>
          <h2 className="mt-2 font-display text-3xl">New Orleans Cacao Circle</h2>
          <p className="mt-3 text-foreground/80 text-pretty">
            A circle of warmth and connection — sacred cacao, heart-opening meditation,
            free movement to release stagnant energy, and a closing sound healing and sharing circle.
          </p>
        </div>
        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft">
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">For Two</span>
          </div>
          <h2 className="mt-2 font-display text-3xl">Couples Cacao Ceremony</h2>
          <p className="mt-3 text-foreground/80 text-pretty">
            Cacao woven with Reiki, sound, breathwork and gentle connection exercises —
            a nurturing space to meet on a soul level and deepen trust, intimacy and love.
          </p>
        </div>
      </section>

      <CacaoInvitesSection />

      {/* BENEFITS */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="flex items-center gap-2 text-primary justify-center">
          <Triangle className="h-4 w-4" />
          <span className="text-xs uppercase tracking-wider">Food of the Gods</span>
        </div>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl text-center">The benefits of ceremonial cacao</h2>
        <p className="mt-4 max-w-3xl mx-auto text-center text-foreground/80 text-pretty">
          Honored for centuries by the Indigenous peoples of Central and South America as sacred
          medicine, ceremonial cacao gently nourishes the heart, body and spirit.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Opens the heart", body: "Softens emotional armor and invites compassion, connection and presence." },
            { title: "Uplifts the mood", body: "Encourages the natural release of endorphins and serotonin — joy, warmth and inner bliss." },
            { title: "Calms the nervous system", body: "Rich in magnesium to ease tension and restore a sense of deep balance." },
            { title: "Nourishes the heart", body: "Powerful antioxidants and flavonoids support circulation and cardiovascular health." },
            { title: "Sharpens clarity", body: "Theobromine, a gentle stimulant, enhances mental focus without the jitters of caffeine." },
            { title: "Awakens creativity", body: "Reconnects you to intuition, inspiration and your sense of purpose." },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-2 text-primary">
                <Triangle className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-wider">Benefit</span>
              </div>
              <h3 className="mt-2 font-display text-xl">{b.title}</h3>
              <p className="mt-2 text-sm text-foreground/75 text-pretty">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STARTER KIT */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Triangle className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider">Cacao Starter Kit</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Bring the ritual home.</h2>
            <p className="mt-4 text-foreground/80 text-pretty">
              Our Starter Kit includes premium ceremonial-grade cacao from Costa Rica with simple
              prep guidance to weave a heart-opening ritual into daily life. Watch Met's prep
              video to get started.
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft">
              Order a kit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card aspect-video bg-background">
            <iframe
              src="https://www.youtube.com/embed/zkVk49BEDP4"
              title="Iridescence Cacao Prep Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
