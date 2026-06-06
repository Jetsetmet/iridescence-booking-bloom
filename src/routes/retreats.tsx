import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Triangle } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/costa-rica-waterfall.jpg";
import natureImg from "@/assets/costa-rica-ocean-sunset.jpg";
import istanbulCollageAsset from "@/assets/resonance-remembrance-2027.png.asset.json";
import alacatiCollageAsset from "@/assets/whispers-ancient-shores-2027.png.asset.json";
import { SQUARE_URL } from "@/lib/booking";

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
            <Link to="/book" search={{ offering: "Retreat" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Reserve your spot <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <img src={heroImg} alt="Transformative healing retreats in Costa Rica with Met of Iridescence Healing"
          loading="lazy" width={1200} height={1200}
          className="rounded-[2rem] shadow-glow object-cover w-full h-auto md:h-[480px]" />
      </section>

      {/* TURKEY — Resonance & Remembrance */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2">
              <Triangle className="h-5 w-5 text-primary" />
              <p className="text-xs uppercase tracking-[0.2em] text-primary/80">May 19–25, 2026 · Turkey</p>
            </div>
            <h2 className="mt-3 font-display text-4xl">Resonance & Remembrance</h2>
            <p className="mt-2 text-sm text-muted-foreground">An Istanbul & Cappadocia Journey of Self-Discovery</p>
            <p className="mt-4 text-foreground/80 leading-relaxed text-pretty">
              Join us on a journey through the vibrant energy of Istanbul and the ancient landscapes of Cappadocia as we slow down, regulate the nervous system, release old stories, and reconnect with our inner truth.
            </p>
            <p className="mt-3 text-foreground/80 leading-relaxed text-pretty">
              Through breathwork, sound healing, ceremonial cacao, somatic practices, and meaningful connection, this retreat offers space to reset, remember, and return to self.
            </p>
            <p className="mt-3 text-foreground/80 leading-relaxed text-pretty">
              More than a spiritual retreat, <em>Resonance & Remembrance</em> is also an invitation to experience the beauty and magic of Turkey — wandering the Grand Bazaar, enjoying Turkish coffee, taking in breathtaking landscapes, experiencing the warmth of the hammam, savoring beautiful cuisine, and allowing yourself to be nurtured, inspired and pampered along the way.
            </p>
            <p className="mt-3 text-foreground/80 leading-relaxed text-pretty">
              A journey of ancient roots, inner transformation, culture, beauty, and remembrance.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/book" search={{ offering: "Retreat", event: "Resonance & Remembrance — May 19–25, 2026 · Istanbul & Cappadocia" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
                Reserve your spot <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="/resonance-remembrance-2027.pdf" target="_blank" rel="noopener noreferrer" download className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
                Download poster (PDF) <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
                Ask a question
              </Link>
            </div>
          </div>
          <img
            src={istanbulCollageAsset.url}
            alt="Resonance & Remembrance — Istanbul & Cappadocia collage"
            loading="lazy"
            className="rounded-[2rem] shadow-soft object-cover w-full h-auto md:h-[520px]"
          />
        </div>
      </section>

      {/* TURKEY — Whispers of the Ancient Shores */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft grid lg:grid-cols-2 gap-10 items-center">
          <img
            src={alacatiCollageAsset.url}
            alt="Alaçatı, Türkiye — whitewashed stone streets and bougainvillea, Whispers of the Ancient Shores retreat"
            loading="lazy"
            className="rounded-[2rem] shadow-soft object-contain w-full h-auto order-2 lg:order-1"
          />
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-2">
              <Triangle className="h-5 w-5 text-primary" />
              <p className="text-xs uppercase tracking-[0.2em] text-primary/80">June 2–8 · Alaçatı, Türkiye</p>
            </div>
            <h2 className="mt-3 font-display text-4xl">Whispers of the Ancient Shores</h2>
            <p className="mt-4 text-foreground/80 leading-relaxed text-pretty">
              An invitation to slow down and immerse yourself in the beauty, rhythm, and soul of Alaçatı. Surrounded by ancient stone streets, sea breezes, olive groves, and the sparkling Mediterranean, we gather to reconnect with simplicity, joy, and the quieter moments that nourish us.
            </p>
            <p className="mt-3 text-foreground/80 leading-relaxed text-pretty">
              Through Kundalini yoga, breathwork, ceremonial cacao, sound healing, and community, this retreat offers space to reset while embracing the magic of Turkish coastal life — wandering local markets, savoring Mediterranean cuisine, sharing long meals, exploring hidden corners, and experiencing the warmth, culture, and slower pace that make Alaçatı so special.
            </p>
            <p className="mt-3 text-foreground/80 leading-relaxed text-pretty">
              A journey of connection, beauty, ancient roots, and the art of living well.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/book" search={{ offering: "Retreat", event: "Whispers of the Ancient Shores — June 2–8 · Alaçatı, Türkiye" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
                Reserve your spot <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="/whispers-ancient-shores-2027.pdf" target="_blank" rel="noopener noreferrer" download className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
                Download poster (PDF) <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
                Ask a question
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img src={natureImg} alt="Sunset ocean swim in Costa Rica — healing retreat with Iridescence Healing"
            loading="lazy" width={1200} height={1200}
            className="rounded-[2rem] shadow-soft object-cover w-full h-auto md:h-[420px] order-2 md:order-1" />
          <div className="order-1 md:order-2">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Why Costa Rica</p>
            <h2 className="mt-2 font-display text-4xl">The land remembers you.</h2>
            <p className="mt-4 text-foreground/80 leading-relaxed text-pretty">
              Lush jungles, warm ocean and a rhythm that invites you to slow down and listen. Costa Rica holds a nurturing, healing presence — many feel an unexplainable shift here, as if the land helps them remember themselves.
            </p>
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
          <p className="mt-2 text-sm text-muted-foreground">Costa Rica · Teens, Young Adults & Adults · <a href={SQUARE_URL} target="_blank" rel="noreferrer" className="underline hover:text-primary">From $4,422 pp</a></p>
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
            <a href="/Oneness_Retreat_Costa_Rica.pdf"
              target="_blank" rel="noopener noreferrer" download
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Download brochure <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
              Ask a question
            </Link>
          </div>
        </div>
        <RetreatFitQuiz />
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-8 pb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Pricing</p>
        <h2 className="mt-2 font-display text-3xl">Retreat investment</h2>
        <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card/50">
          {[
            { label: "Resonance & Remembrance", duration: "May 19–25, 2026 · Istanbul & Cappadocia", price: "Varies" },
            { label: "Whispers of the Ancient Shores", duration: "June 2–8 · Alaçatı, Türkiye", price: "Varies" },
            { label: "4-Day Oneness Spiritual Emergence", duration: "Private · Costa Rica", price: "Varies" },
          ].map((t, i) => (
            <li key={i} className="flex items-baseline justify-between gap-4 px-5 py-4">
              <div>
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.duration}</div>
              </div>
              <Link to="/book" search={{ offering: "Retreat", event: `${t.label} — ${t.duration}` }} className="text-sm font-display text-primary whitespace-nowrap hover:underline">{t.price}</Link>
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

function RetreatFitQuiz() {
  const questions = [
    "I'm craving a deep reset for my nervous system and a softer pace.",
    "I feel called to ancient lands, ceremony and sacred sound.",
    "I'm ready to gently release old stories and patterns.",
    "I'd love to journey in a small, intentional group.",
    "I'm open to breathwork, cacao and somatic practices.",
  ];
  const [answers, setAnswers] = useState<boolean[]>(Array(questions.length).fill(false));
  const [submitted, setSubmitted] = useState(false);
  const yesCount = answers.filter(Boolean).length;

  return (
    <div className="mt-10 rounded-[2rem] border border-border bg-card/60 p-8 sm:p-10 shadow-soft">
      <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Is this retreat for you?</p>
      <h3 className="mt-2 font-display text-3xl">A short heart check-in.</h3>
      <p className="mt-2 text-sm text-muted-foreground">Tick what feels true — there are no wrong answers.</p>
      <ul className="mt-6 space-y-3">
        {questions.map((q, i) => (
          <li key={i}>
            <label className="flex items-start gap-3 text-sm text-foreground/85 cursor-pointer">
              <input
                type="checkbox"
                checked={answers[i]}
                onChange={(e) => {
                  const next = [...answers];
                  next[i] = e.target.checked;
                  setAnswers(next);
                  setSubmitted(false);
                }}
                className="mt-1 h-4 w-4 rounded border-input accent-primary"
              />
              <span>{q}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft"
        >
          See if it's a fit
        </button>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-medium hover:bg-accent">
          Ask a question <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {submitted && (
        <div className="mt-6 rounded-2xl border border-border bg-background/60 p-5 text-sm text-foreground/85">
          {answers[0] ? (
            <p>
              The 4-Day Oneness Spiritual Emergence Retreat in Costa Rica is calling you — a private, deeply nurturing reset at a softer pace.{" "}
              <Link to="/contact" className="underline underline-offset-4 hover:text-primary">Reach out to reserve your spot →</Link>
            </p>
          ) : yesCount >= 4 ? (
            <p>This retreat is calling you. Reach out and let's hold a space for you.</p>
          ) : yesCount >= 2 ? (
            <p>There's a soft yes here. Let's connect so I can answer any questions and help you feel into it.</p>
          ) : (
            <p>This may not be the right journey at this moment — and that's okay. Reach out and we can explore what would truly serve you.</p>
          )}
        </div>
      )}
    </div>
  );
}