import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Triangle, Heart, Quote } from "lucide-react";
import heroImg from "@/assets/self-love.jpg";

export const Route = createFileRoute("/self-love-mentoring")({
  head: () => ({
    meta: [
      { title: "Self-Love Mentoring — Iridescence Healing New Orleans" },
      { name: "description", content: "A six-week self-love mentoring journey with Met — align with your soul's purpose, release limiting beliefs and step into clarity and empowerment. In person in New Orleans or via Zoom." },
      { property: "og:title", content: "Six-Week Self-Love Mentoring with Met" },
      { property: "og:description", content: "A devotional mentorship to reclaim your wholeness, intuition and inner power." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: SelfLoveMentoring,
});

function SelfLoveMentoring() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iridescent opacity-[0.06]" aria-hidden />
        <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-16 pb-12 relative">
          <p className="text-xs uppercase tracking-[0.25em] text-primary/80">Six-Week Mentoring · In Person or Zoom</p>

          <div className="relative md:float-right md:ml-8 md:mb-4 mt-5 md:mt-2 w-full max-w-[18rem] sm:max-w-xs md:w-[19rem] lg:w-[22rem]">
            <div className="absolute -inset-4 rounded-[2rem] bg-iridescent opacity-25 blur-2xl" aria-hidden />
            <img
              src={heroImg}
              alt="Self-love mentoring with Met — Iridescence Healing New Orleans"
              loading="lazy"
              width={900}
              height={1100}
              className="relative rounded-[2rem] shadow-glow object-cover w-full aspect-[4/5]"
            />
          </div>

          <h1 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl text-balance leading-[1.02]">
            Come home to{" "}
            <span className="italic bg-iridescent bg-clip-text text-transparent">yourself</span>.
          </h1>
          <p className="mt-6 text-foreground/75 leading-relaxed text-pretty text-lg">
            Join me on a six-week mentoring journey to align with the vast, interconnected energy
            of the universe and unlock your highest potential — a path of transformation that
            resonates with your most authentic self.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" search={{ offering: "Mentoring" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Begin the journey <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
              Email Met for more info
            </Link>
          </div>
          <div className="clear-both" />
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="mx-auto max-w-4xl px-5 sm:px-8 pb-16 space-y-6 text-foreground/80 text-pretty leading-relaxed">
        <p>
          In a world where we aren't often taught the importance of self-love, I want to help
          you empower yourself — because when we empower ourselves, we inspire others to follow
          their dreams, embrace joy and step into abundance.
        </p>
        <p>
          These sessions guide you to become more aligned with your true essence — supporting
          your eating habits, thoughts, exercise, meditation and yoga practices, and most
          importantly, your relationship with self-love. You'll be guided to release limiting
          beliefs, heal past wounds and step into a space of clarity and empowerment.
        </p>
        <p>
          This isn't just personal growth — it's aligning with the cosmic flow that connects us
          all, so you can move forward with confidence, purpose and a deeper understanding of
          your place in the universe.
        </p>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="flex items-center gap-2 text-primary justify-center">
          <Triangle className="h-4 w-4" />
          <span className="text-xs uppercase tracking-wider">What we'll explore</span>
        </div>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl text-center">Pillars of the journey</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Self-love as foundation", body: "Rebuild your relationship with yourself as the ground all else grows from." },
            { title: "Release limiting beliefs", body: "Soften the inherited stories that have kept you small." },
            { title: "Heal past wounds", body: "Tend to old patterns with compassion, breath and presence." },
            { title: "Nourish the body", body: "Gentle support for eating, movement, yoga and rest." },
            { title: "Meditation & breath", body: "Practices that return you to stillness and clarity." },
            { title: "Align with purpose", body: "Move forward with confidence and a deeper sense of place." },
          ].map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-2 text-primary">
                <Triangle className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-wider">Pillar</span>
              </div>
              <h3 className="mt-2 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-foreground/75 text-pretty">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEW */}
      <section className="mx-auto max-w-4xl px-5 sm:px-8 pb-20">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-10 shadow-soft">
          <Quote className="h-6 w-6 text-primary" />
          <p className="mt-4 text-lg sm:text-xl font-display leading-relaxed text-pretty">
            "Working with Met has been one of the most transformative experiences of my life.
            Through our sessions, I was able to release long-held emotional patterns and step into
            a much deeper sense of confidence, clarity and self-trust. The most profound shift has
            been in my family relationships. Wounds that I carried since childhood have genuinely
            healed in ways I never thought were possible. The change in those relationships has
            brought an incredible sense of peace and connection back into my life. Met has a rare
            ability to hold space with true honesty, intuition and compassion while guiding you
            toward powerful personal breakthroughs. I am deeply grateful for her guidance and would
            recommend working with her to anyone who is ready for real transformation."
          </p>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">Client review</p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 pb-24">
        <div className="rounded-[2rem] border border-border bg-card/70 p-8 sm:p-10 shadow-soft flex flex-col md:flex-row md:items-center gap-6">
          <div className="md:flex-1">
            <div className="flex items-center gap-2 text-primary">
              <Heart className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider">Six-Week Mentoring · $720</span>
            </div>
            <p className="mt-2 font-display text-2xl sm:text-3xl">Let's begin this transformative journey together.</p>
            <p className="mt-2 text-sm text-muted-foreground">Sessions held in person in uptown New Orleans or via Zoom from anywhere. Please email for more info.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/book" search={{ offering: "Mentoring" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Reserve your spot <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
              Email Met
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-8 pb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Pricing</p>
        <h2 className="mt-2 font-display text-3xl">Mentoring investment</h2>
        <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card/50">
          {[
            { label: "Six-Week Mentoring Journey", duration: "weekly sessions · in person or Zoom", price: "$720" },
          ].map((t, i) => (
            <li key={i} className="flex items-baseline justify-between gap-4 px-5 py-4">
              <div>
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.duration}</div>
              </div>
              <div className="text-sm font-display text-primary whitespace-nowrap">{t.price}</div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link to="/offerings" className="text-sm text-muted-foreground hover:text-foreground">← All offerings</Link>
        </div>
      </section>
    </>
  );
}