import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Triangle } from "lucide-react";
import heroImg from "@/assets/costa-rica-waterfall.jpg";
import natureImg from "@/assets/costa-rica-ocean-sunset.jpg";
import turkeyCappadociaImg from "@/assets/turkey-cappadocia.jpeg";
import turkeyMosqueImg from "@/assets/turkey-blue-mosque.jpeg";

export const Route = createFileRoute("/retreats")({
  head: () => ({
    meta: [
      { title: "Transformative Retreats — Turkey & Costa Rica with Iridescence Healing" },
      { name: "description", content: "Immersive retreats with Met — Istanbul & Cappadocia (April 2026) and a private 4-day Oneness retreat in Costa Rica. Breath, sound, cacao, yoga and somatic practices." },
      { property: "og:title", content: "Transformative Retreats — Turkey & Costa Rica" },
      { property: "og:description", content: "Resonance & Remembrance in Turkey and a private Oneness Spiritual Emergence retreat in Costa Rica." },
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
              Lush jungles, warm ocean and a rhythm that invites you to slow down and listen. Costa Rica holds a nurturing, healing presence — many feel an unexplainable shift here, as if the land helps them remember themselves.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft grid lg:grid-cols-2 gap-10 items-center">
          <div className="grid grid-cols-2 gap-3">
            <img
              src={turkeyCappadociaImg}
              alt="Hot air balloons over Cappadocia, Turkey — Resonance & Remembrance retreat"
              loading="lazy"
              className="rounded-2xl shadow-soft object-cover w-full h-64 col-span-2"
            />
            <img
              src={turkeyMosqueImg}
              alt="Blue Mosque at sunset, Istanbul — Resonance & Remembrance retreat"
              loading="lazy"
              className="rounded-2xl shadow-soft object-cover w-full h-40 col-span-2"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Triangle className="h-5 w-5 text-primary" />
              <p className="text-xs uppercase tracking-[0.2em] text-primary/80">April 11–18, 2026 · Turkey</p>
            </div>
            <h2 className="mt-3 font-display text-4xl">Resonance & Remembrance</h2>
            <p className="mt-2 text-sm text-muted-foreground">An Istanbul & Cappadocia Journey of Breath, Sound, Cacao & Self-Discovery</p>
            <p className="mt-4 text-foreground/80 leading-relaxed text-pretty">
              A sacred journey through the vibrant energy of Istanbul and the ancient landscapes of Cappadocia. <em>Resonance & Remembrance</em> invites you to slow down, regulate the nervous system, and reconnect with the truth of who you are. Rooted in the wisdom of ancient lands and the remembrance of our deeper origins, this experience is an invitation to reconnect with your inner truth and the parts of yourself that may have been forgotten along the way.
            </p>
            <p className="mt-3 text-foreground/80 leading-relaxed text-pretty">
              Through breathwork, sound healing, ceremonial cacao, yoga, somatic practices and deep inner inquiry, we'll gently release old stories, soften limiting patterns and create space for greater clarity, connection and self-remembrance. This is a journey back to self — held by ancient roots, sacred landscapes and the resonance already living within you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
                Reserve your spot <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
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
            A one-on-one sanctuary in Costa Rica's wilderness — a gentle yet profound reset to shed old patterns, soothe the nervous system and awaken the joy that lives within. Designed with your heart's vision in mind.
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