import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/funnel.functions";
import { Triangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function HeartOpeningFunnel() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const submit = useServerFn(submitLead);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submit({ data: { email, name: name || undefined, source: "heart_opening_meditation" } });
      setDone(true);
      toast.success("Your 11-minute meditation is on its way ✨");
    } catch {
      toast.error("Something went sideways — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="heart-meditation" className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
      <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-glow grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.2em]">Free gift · 11 minutes</span>
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">
            For the heart that's been <span className="italic bg-iridescent bg-clip-text text-transparent">carrying too much</span>.
          </h2>
          <p className="mt-5 text-foreground/80 leading-relaxed text-pretty">
            A guided 11-minute heart-opening breath meditation — created for those moving through grief, heartache or sadness. No experience needed. Met walks you through every breath, so all you have to do is press play and be held.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-foreground/80">
            <li className="flex gap-2"><Triangle className="h-3.5 w-3.5 mt-1 text-primary shrink-0" /> Soften the weight in your chest</li>
            <li className="flex gap-2"><Triangle className="h-3.5 w-3.5 mt-1 text-primary shrink-0" /> Let tears move if they need to</li>
            <li className="flex gap-2"><Triangle className="h-3.5 w-3.5 mt-1 text-primary shrink-0" /> Beginner-friendly · fully guided</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-background/70 border border-border p-6 sm:p-8">
          {done ? (
            <>
              <h3 className="font-display text-2xl">It's on its way ✨</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Your 11-minute heart-opening meditation is below. Find a quiet spot, place a hand on your heart and press play when you're ready. We've also sent the link to your inbox.
              </p>
              <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl border border-border">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/DZl8dguC3cE?rel=0"
                  title="Heart-opening meditation with Met"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </>
          ) : (
            <>
              <h3 className="font-display text-2xl">Receive your meditation</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your email and we'll send it straight to your inbox — free.
              </p>
              <form onSubmit={onSubmit} className="mt-5 space-y-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your first name (optional)"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft disabled:opacity-60"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Send me the meditation
                </button>
                <p className="text-[11px] text-center text-muted-foreground">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
