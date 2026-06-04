import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-meditation.jpg";
import soundImg from "@/assets/sound-bowls.jpg";
import resonanceImg from "@/assets/resonance-reset.jpeg";
import reikiImg from "@/assets/reiki-hands.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import { ArrowRight, Triangle } from "lucide-react";
import { HeartOpeningFunnel } from "@/components/site/HeartOpeningFunnel";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";

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
  { icon: Triangle, title: "The Resonance Reset", desc: "Signature immersive 1:1 session weaving breath, sound, Reiki and somatic release.", img: resonanceImg },
  { icon: Triangle, title: "Crystal Reiki & Sound", desc: "One-on-one energy healing to clear, restore and reconnect.", img: reikiImg },
  { icon: Triangle, title: "Sound Baths", desc: "Group and private sound journeys with crystal & Tibetan bowls.", img: soundImg },
  { icon: Triangle, title: "Cacao Ceremony", desc: "Heart-opening ceremonial cacao circles in sacred space.", img: cacaoImg },
];

const testimonials = [
  { quote: "My sessions with Met are always transformational. Her intuitive abilities to understand what I need each time I see her always astounds me. I experience shifts energetically and mentally and always experience deeper clarity in the days that follow. She is a gift and over the years has become an integral part of my healing journey. I can't recommend her enough.", name: "Emily C." },
  { quote: "Met led a warm & intimate cacao ceremony for my bachelorette! She possesses a skill of helping the group be vulnerable with one another. Her sound bath was truly the best I've ever experienced. She came to our air bnb and made magic happen. I recommend her SO highly. If you're looking for an unforgettable group experience, she is very capable of creating that for you & your group!", name: "Greta S." },
  { quote: "I've been going to Met for Reiki for many years, and every session reminds me why I trust her so deeply. Her energy is calming, her intuition is spot-on, and she creates a space where I can truly relax and heal. She is genuinely gifted, and I always leave feeling renewed and centered.", name: "Monica H." },
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
               I'm Mehtap - offering heart led healing through Reiki, Sound and Ceremony in uptown New Orleans and virtually.
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
              <a
                href="https://book.squareup.com/appointments/375ed9f0-ab7e-432c-a72d-65545ae811a5/location/8Z003QJZ46SBG/services?rwg_token=AFd1xnG8opsnB8WvxAc5Gu92w-ep4LAQyNqcaVA4S02XPh2Ls2RPId34yddJHpbz57l-ZkUuMTWlbLQRyenGhZi2TDn3gUVGPg%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                Book directly on Square <ArrowRight className="h-4 w-4" />
              </a>
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
            I'm so grateful you're here — it's an honour your path led you to this space.
          </p>
          <p className="mt-5 text-muted-foreground text-pretty">
            This is where ancient energy and heart medicine come together to support your journey inward.
            Through gentle, holistic practices, I offer a nurturing space uptown in New Orleans to slow down,
            reconnect and remember the wisdom within you. It's a gentle return to your inner light, where
            healing can gracefully take root and blossom.
          </p>
          <p className="mt-4 text-muted-foreground text-pretty">
            Feel free to explore and scroll down to discover how we can connect and journey together —
            whether you're drawn to group sound baths, one-on-one Reiki, cacao ceremonies, meditation and
            breathwork guidance, or self-love and personal growth mentoring, I'm here to support you.
          </p>
          <p className="mt-4 text-muted-foreground italic">With love…</p>
        </div>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Offerings</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl text-balance">
            Choose the medicine that's calling you.
          </h2>
        </div>
        <div className="mt-12 -mx-5 sm:-mx-8">
          <div className="flex gap-5 overflow-x-auto px-5 sm:px-8 pb-4 snap-x snap-mandatory scrollbar-hide">
            {offerings.map((o) => (
              <Link
                key={o.title}
                to="/offerings"
                className="group flex-shrink-0 w-[280px] sm:w-[320px] rounded-3xl overflow-hidden bg-card shadow-card border border-border hover:shadow-glow transition-all snap-start"
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

      <HeartOpeningFunnel />

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
