import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/funnel.functions";
import { Triangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const submit = useServerFn(submitLead);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submit({
        data: { email, name: name || undefined, source: "newsletter" },
      });
      setDone(true);
      toast.success("Welcome to the circle ✨");
    } catch {
      toast.error("Something went sideways — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 sm:p-14 shadow-card text-center">
        <div className="absolute inset-x-0 top-0 h-1 bg-iridescent" />
        <Triangle className="mx-auto h-5 w-5 text-primary/70" />
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary/80">
          Stay in touch
        </p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">
          Join the inner circle.
        </h2>
        <p className="mt-4 max-w-lg mx-auto text-muted-foreground text-pretty">
          Notes on energy, upcoming circles, seasonal rituals and heart-led
          reflections — delivered gently to your inbox.
        </p>

        {done ? (
          <div className="mt-8">
            <h3 className="font-display text-2xl">You&apos;re in ✨</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Watch your inbox for a welcome note. I&apos;m so glad you&apos;re
              here.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-8 max-w-md mx-auto space-y-3"
          >
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
              Join the circle
            </button>
            <p className="text-[11px] text-center text-muted-foreground">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
