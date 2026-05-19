import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Triangle, Play, Heart, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/funnel.functions";
import heroImg from "@/assets/cacao-ceremony.jpg";
import cacaoLogo from "@/assets/cacao-logo.png";

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
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Iridescence Cacao · New Orleans</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl text-balance leading-[1.05]">
            Let your heart <span className="italic bg-iridescent bg-clip-text text-transparent">glow</span> with every sip.
          </h1>
          <p className="mt-6 text-foreground/80 leading-relaxed text-pretty max-w-xl">
            Ceremonial cacao sourced from a small family farm in Costa Rica — lovingly brewed by Mehtap to gently open the heart, soften old patterns and reconnect you to intuition, creativity and joy.
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
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-6 rounded-full bg-iridescent opacity-30 blur-3xl" aria-hidden />
          <img
            src={cacaoLogo}
            alt="Iridescence Cacao emblem — ceremonial cacao New Orleans"
            loading="eager"
            width={900}
            height={900}
            className="relative w-full aspect-square object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
          />
          <img
            src={heroImg}
            alt="Ceremonial cacao with rose petals — Iridescence Healing New Orleans"
            loading="lazy"
            width={400}
            height={400}
            className="absolute -bottom-6 -right-2 sm:-right-6 w-28 sm:w-36 aspect-square object-cover rounded-2xl shadow-glow border-4 border-background"
          />
        </div>
      </section>

      <CacaoInvitesSection variant="slim" />

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Triangle className="h-4 w-4" />
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

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="flex items-center gap-2 text-primary justify-center">
          <Triangle className="h-4 w-4" />
          <span className="text-xs uppercase tracking-wider">Food of the Gods</span>
        </div>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl text-center">The benefits of ceremonial cacao</h2>
        <p className="mt-4 max-w-3xl mx-auto text-center text-foreground/80 text-pretty">
          Honored for centuries by the Indigenous peoples of Central and South America as sacred medicine, ceremonial cacao gently nourishes the heart, body and spirit.
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

      <CacaoInvitesSection />
    </>
  );
}

function CacaoInvitesSection({ variant = "full" }: { variant?: "full" | "slim" }) {
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

  if (variant === "slim") {
    return (
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-12">
        <div className="rounded-[2rem] border border-border bg-card/70 p-6 sm:p-8 shadow-soft flex flex-col md:flex-row md:items-center gap-5">
          <div className="md:flex-1">
            <div className="flex items-center gap-2 text-primary">
              <Heart className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider">Cacao Circle Invites</span>
            </div>
            <p className="mt-2 font-display text-xl sm:text-2xl">Get invited to the next New Orleans cacao circle.</p>
          </div>
          {status === "done" ? (
            <p className="md:flex-1 text-sm text-primary">You're on the list — Met will be in touch.</p>
          ) : (
            <form onSubmit={handleSubmit} className="md:flex-1 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                maxLength={255}
                className="flex-1 rounded-full border border-border bg-background/70 px-5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft disabled:opacity-60"
              >
                {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Invite me <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-xs text-destructive md:basis-full">{errorMsg ?? "Please try again."}</p>
          )}
        </div>
      </section>
    );
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