import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Triangle, Check } from "lucide-react";
import heroImg from "@/assets/sound-bowls.jpg";

export const Route = createFileRoute("/resonance-release")({
  head: () => ({
    meta: [
      { title: "The Resonance Reset — Signature Deep Healing Experience" },
      { name: "description", content: "A 1:1 immersive deep healing experience weaving sound, Reiki, activating breathwork and intuitive somatic release with Mehtap." },
      { property: "og:title", content: "The Resonance Reset — Iridescence Healing" },
      { property: "og:description", content: "Deep emotional release, nervous system reset and energetic realignment." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: ResonanceRelease,
});

const woven = [
  "Sound healing — crystal bowls and frequency work",
  "Reiki & energetic alignment",
  "Guided, activating breathwork",
  "Intuitive somatic release",
];

const forYou = [
  "You're moving through anxiety, emotional heaviness or internal overwhelm",
  "You notice repeating patterns that feel hard to shift",
  "You've done inner work and sense something deeper is ready to move",
  "You're seeking a powerful reset that works beyond the mind",
];

function ResonanceRelease() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden shadow-card">
          <img src={heroImg} alt="The Resonance Reset immersive healing session"
            className="w-full h-auto md:h-[460px] object-cover" width={1280} height={960} />
        </div>
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Signature deep healing experience</span>
          </div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">
            The Resonance <span className="italic bg-iridescent bg-clip-text text-transparent">Reset</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-pretty">
            A powerful, immersive 1:1 session designed to support deep emotional release,
            nervous system reset and energetic realignment.
          </p>
          <Link
            to="/book"
            search={{ offering: "The Resonance Reset" }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft"
          >
            Apply for a session <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-8 pb-16 space-y-12">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">The invitation</p>
          <p className="mt-3 text-foreground/80 text-pretty leading-relaxed">
            There are moments when surface-level work is no longer enough — when something deeper
            is ready to be felt, released and transformed. The Resonance Reset is a space to meet
            that moment through breath, sound and intuitive somatic work that gently yet powerfully
            unlocks what's been held within the body.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">What this session is</p>
          <h2 className="mt-2 font-display text-3xl">A 1:1 immersive experience</h2>
          <ul className="mt-5 grid sm:grid-cols-2 gap-3">
            {woven.map((w) => (
              <li key={w} className="flex items-start gap-3 rounded-2xl border border-border bg-card/50 p-4 text-sm">
                <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-accent">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </span>
                {w}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Each session is intuitively guided and tailored to what your system is ready to move.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">What makes this different</p>
          <p className="mt-3 text-foreground/80 text-pretty leading-relaxed">
            This is not a passive or surface-level session. It works beyond the mind — through body,
            breath and energy — integrating multiple modalities into one cohesive experience that
            supports deep, lasting shifts rather than temporary relief. Held in a grounded, safe and
            energetically attuned space.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">The experience</p>
          <p className="mt-3 text-foreground/80 text-pretty leading-relaxed">
            This work can be intense at times — breath opening pathways, emotions rising to be
            released — but it is always held with presence and care. Clients often leave feeling
            lighter, clearer, more grounded and deeply connected to themselves.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Who this is for</p>
          <h2 className="mt-2 font-display text-3xl">For those ready to go deeper</h2>
          <ul className="mt-5 space-y-2">
            {forYou.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-accent">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground italic">
            This is not a purely relaxing experience — it's for those open to profound release,
            realignment and lasting change.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-border bg-card/50 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Session details</p>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
              <li>1:1 private session</li>
              <li>Duration: 90–120 minutes</li>
              <li>Limited sessions available each week</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-iridescent p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Investment</p>
            <div className="mt-2 font-display text-3xl">$240</div>
            <p className="text-xs text-muted-foreground">Introductory rate</p>
            <div className="mt-4 border-t border-border/40 pt-3">
              <div className="font-display text-2xl">$690 · 3-session journey</div>
              <p className="mt-1 text-sm text-foreground/70">
                A guided progression to support deeper release, integration and realignment over time.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-7 sm:p-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Apply for The Resonance Reset</p>
          <h2 className="mt-2 font-display text-3xl">A high-touch, intentionally held experience</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-pretty">
            To ensure this work is aligned for you, all sessions begin with a short application.
            Once received, you'll be guided to the next step in booking your session.
          </p>
          <Link
            to="/book"
            search={{ offering: "The Resonance Reset" }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft"
          >
            Begin your application <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          <Link to="/offerings" className="text-sm text-muted-foreground hover:text-foreground">← All offerings</Link>
        </div>
      </section>
    </>
  );
}