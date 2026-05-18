import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Triangle } from "lucide-react";
import heroImg from "@/assets/costa-rica-waterfall.jpg";
import natureImg from "@/assets/costa-rica-ocean-sunset.jpg";

export const Route = createFileRoute("/retreats")({
  head: () => ({
    meta: [
      { title: "Transformative Retreats — Costa Rica with Iridescence Healing" },
      { name: "description", content: "Immersive Costa Rica retreats blending Reiki, sound healing, cacao, yoga, breathwork and nature immersion. December 2025 & January 2026." },
      { property: "og:title", content: "Transformative Retreats — Costa Rica" },
      { property: "og:description", content: "Deeply nourishing, spacious retreats in Puntarenas, Costa Rica — reconnect, release  and step into clarity." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Retreats,
});

function Retreats() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Transformative Retreats</p>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">
            Come home to <span className="italic bg-iridescent bg-clip-text text-transparent">yourself</span>.
          </h1>
          <p className="mt-6 text-foreground/80 leading-relaxed text-pretty">
            Immersive journeys that weave energy healing, cacao, yoga, sound, meditation, breathwork and indigenous Temazcal into the quiet medicine of nature. A safe, nurturing space to release what no longer serves and step into true freedom.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Reserve your spot <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://divinewisdomretreats.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
              Divine Wisdom Retreats <Triangle className="h-4 w-4" />
            </a>
          </div>
        </div>
        <img src={heroImg} alt="Transformative healing retreats in Costa Rica with Met of Iridescence Healing"
          loading="lazy" width={1200} height={1200}
          className="rounded-[2rem] shadow-glow object-cover w-full h-[480px]" />
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img src={natureImg} alt="Sunset ocean swim in Costa Rica — healing retreat with Iridescence Healing"
            loading="lazy" width={1200} height={1200}
            className="rounded-[2rem] shadow-soft object-cover w-full h-[420px] order-2 md:order-1" />
          <div className="order-1 md:order-2">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Why Costa Rica</p>
            <h2 className="mt-2 font-display text-4xl">The land remembers you.</h2>
            <p className="mt-4 text-foreground/80 leading-relaxed text-pretty">
              Lush jungles, warm ocean  and a rhythm that invites you to slow down and listen. Costa Rica holds a nurturing, healing presence — many feel an unexplainable shift here, as if the land helps them remember themselves.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Upcoming</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl">Puntarenas, Costa Rica</h2>
          <p className="mt-4 text-foreground/80">Two upcoming retreats in the southern Pacific — each spacious, nourishing and transformational.</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {[
            {
              icon: Triangle,
              dates: "December 2–9, 2025",
              title: "Winter Reset Retreat",
              blurb: "A week of slow mornings, ceremony and deep release as the year closes.",
              pdf: "https://iridescencehealing.com/wp-content/uploads/2025/05/29DecRetreat.pdf",
            },
            {
              icon: Triangle,
              dates: "January 11–16, 2026",
              title: "Somatic Awakening Retreat",
              blurb: "Begin the year aligned — nervous system reset, breath, sound and cacao.",
              pdf: "https://iridescencehealing.com/wp-content/uploads/2025/05/SomaticAwakeningRetreat.pdf",
            },
          ].map((r) => (
            <div key={r.title} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <r.icon className="h-6 w-6 text-primary" />
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.dates}</p>
              <h3 className="mt-1 font-display text-2xl">{r.title}</h3>
              <p className="mt-3 text-foreground/80 leading-relaxed">{r.blurb}</p>
              <a href={r.pdf} target="_blank" rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                View brochure (PDF) <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft">
          <div className="flex items-center gap-2">
            <Triangle className="h-5 w-5 text-primary" />
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Private journey</p>
          </div>
          <h2 className="mt-3 font-display text-4xl">4-Day Oneness Spiritual Emergence Retreat</h2>
          <p className="mt-2 text-sm text-muted-foreground">Costa Rica · Teens, Young Adults & Adults · From $4,422 pp</p>
          <p className="mt-4 text-foreground/80 leading-relaxed text-pretty max-w-3xl">
            A one-on-one sanctuary in Costa Rica's wilderness — a gentle yet profound reset to shed old patterns, soothe the nervous system  and awaken the joy that lives within. Designed with your heart's vision in mind.
          </p>

          <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-foreground/80 list-disc pl-5">
            <li>Daily sunrise Kundalini yoga & breathwork</li>
            <li>Daily cacao ceremony with vocal activation</li>
            <li>Daily nature immersion — beach, jungle, waterfalls</li>
            <li>Two Crystal Reiki sound healing sessions</li>
            <li>Inner-child journaling & toning (vagus nerve)</li>
            <li>Four integration calls</li>
            <li>Farm-to-table plant-based meals, juices & smoothies</li>
            <li>One massage</li>
            <li>Luxury accommodation & airport transfer</li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://iridescencehealing.com/wp-content/uploads/2025/05/OnenessRetreatCostaRica.pdf"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Download brochure <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}