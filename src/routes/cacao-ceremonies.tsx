import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Triangle, Play, Heart, Loader2 } from "lucide-react";
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
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Cacao Ceremonies</p>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">
            Let your heart <span className="italic bg-iridescent bg-clip-text text-transparent">glow</span> with every sip.
          </h1>
          <p className="mt-6 text-foreground/80 leading-relaxed text-pretty">
            Ceremonial cacao sourced from a small family farm in Costa Rica — lovingly brewed by Met to gently open the heart, soften old patterns and reconnect you to intuition, creativity and joy.
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
        <img src={heroImg} alt="Ceremonial cacao with flowers — Iridescence Healing New Orleans"
          loading="lazy" width={1200} height={1200}
          className="rounded-[2rem] shadow-glow object-cover w-full h-[480px]" />
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Play className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider">Cacao Starter Kit</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Bring the ritual home.</h2>
            <p className="mt-4 text-foreground/80 text-pretty">
              Our Starter Kit includes premium ceremonial-grade cacao from Costa Rica with simple prep guidance to weave a heart-opening ritual into daily life. Watch Met's prep video to get started.
            </p>
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

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20 grid md:grid-cols-2 gap-6">
        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft">
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Group Ceremony</span>
          </div>
          <h2 className="mt-2 font-display text-3xl">New Orleans Cacao Circle</h2>
          <p className="mt-3 text-foreground/80 text-pretty">
            A circle of warmth and connection — sacred cacao, heart-opening meditation, free movement to release stagnant energy, and a closing sound healing and sharing circle.
          </p>
        </div>
        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft">
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">For Two</span>
          </div>
          <h2 className="mt-2 font-display text-3xl">Couples Cacao Ceremony</h2>
          <p className="mt-3 text-foreground/80 text-pretty">
            Cacao woven with Reiki, sound, breathwork and gentle connection exercises — a nurturing space to meet on a soul level and deepen trust, intimacy and love.
          </p>
        </div>
      </section>

      <CacaoInvitesSection />
    </>
  );
}

function CacaoInvitesSection() {
  const submit = useServerFn(submitLead);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg(null);
    try {
      await submit({ data: { email: email.trim(), name: name.trim() || undefined, source: "cacao_circle" } });
      setStatus("done");
      setName("");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
      <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Heart className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Cacao Circle Invites</span>
          </div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">Join the New Orleans cacao circle list.</h2>
          <p className="mt-3 text-foreground/80 text-pretty">
            Be the first to know when Met opens the next local cacao ceremony — quiet, intimate gatherings shared by email only.
          </p>
        </div>
        {status === "done" ? (
          <div className="rounded-2xl border border-border bg-background/60 p-6 text-center">
            <Heart className="mx-auto h-6 w-6 text-primary" />
            <p className="mt-3 font-display text-xl">You're on the list.</p>
            <p className="mt-1 text-sm text-muted-foreground">Met will reach out when the next circle is open.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              maxLength={120}
              className="w-full rounded-full border border-border bg-background/70 px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              maxLength={255}
              className="w-full rounded-full border border-border bg-background/70 px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft disabled:opacity-60"
            >
              {status === "loading" ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
              ) : (
                <>Invite me to the circle <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
            {status === "error" && (
              <p className="text-xs text-destructive">{errorMsg ?? "Please try again."}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}