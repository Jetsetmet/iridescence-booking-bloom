import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Triangle, Sparkles, Heart, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/funnel.functions";
import heroImg from "@/assets/cacao-ceremony.jpg";
import couplesImg from "@/assets/couples-ceremony-new.webp";
import logoImg from "@/assets/logo.jpg";
import cacaoLogoImg from "@/assets/iridescence-cacao-logo.png";

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
      {/* HERO — editorial split with offset image */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-iridescent opacity-[0.06]" aria-hidden />
        <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-16 pb-20 relative">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Iridescence Healing logo"
              loading="lazy"
              width={64}
              height={64}
              className="h-14 w-14 rounded-full object-cover shadow-soft ring-1 ring-border"
            />
            <p className="text-xs uppercase tracking-[0.25em] text-primary/80">Iridescence Cacao · New Orleans</p>
          </div>

          {/* Floated image — text wraps around it on md+ */}
          <div className="relative md:float-right md:ml-8 md:mb-4 mt-5 md:mt-2 w-full max-w-[18rem] sm:max-w-xs md:w-[19rem] lg:w-[22rem] md:shape-outside-[circle()]">
            <div className="absolute -inset-4 rounded-[2rem] bg-iridescent opacity-25 blur-2xl" aria-hidden />
            <img
              src={heroImg}
              alt="Ceremonial cacao with flowers — Iridescence Healing New Orleans"
              loading="lazy"
              width={900}
              height={1100}
              className="relative rounded-[2rem] shadow-glow object-cover w-full aspect-[4/5]"
            />
          </div>

          <h1 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl text-balance leading-[1.02]">
            Let your heart{" "}
            <span className="italic bg-iridescent bg-clip-text text-transparent">glow</span>{" "}
            with every sip.
          </h1>
          <p className="mt-6 text-foreground/75 leading-relaxed text-pretty text-lg">
            Ceremonial cacao sourced from a small family farm in Costa Rica — brewed by Met
            to gently open the heart, soften old patterns and reconnect you to intuition,
            creativity and joy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" search={{ offering: "Cacao Ceremony" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Book a ceremony <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
              Private & retreat enquiries
            </Link>
          </div>
          <div className="clear-both" />
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20 grid md:grid-cols-1 gap-6">
        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft">
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">For Two</span>
          </div>
          <h2 className="mt-2 font-display text-3xl">Couples Cacao Ceremony</h2>
          <p className="mt-3 text-foreground/80 text-pretty">
            Curious about cacao? What would it feel like to slow down together,
            soften the armor around your heart and rediscover one another in sacred space?
            What might shift if you let plant medicine, breath and sound hold you both?
            Reach out to explore whether a couples ceremony is right for you.
          </p>
          <Link to="/book" search={{ offering: "Couples Cacao Ceremony" }} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft">
            Book a ceremony <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* COUPLES CACAO CEREMONY */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-iridescent opacity-25 blur-2xl" aria-hidden />
            <img
              src={couplesImg}
              alt="Two ceremonial cacao cups with rose petals — Couples Cacao Ceremony New Orleans"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative rounded-[2rem] shadow-glow object-cover w-full aspect-square"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Heart className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider">For Two · New Orleans</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-balance">
              Couples Cacao Ceremony
            </h2>
            <p className="mt-4 text-foreground/80 text-pretty">
              A heart-opening ritual weaving ceremonial cacao with Reiki, sound,
              breathwork and gentle connection exercises — a soul-level return
              to your bond, where trust deepens and love is felt anew.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-5 gap-y-3">
              {[
                "Soul-level connection",
                "Opens the heart",
                "Reiki & sound healing",
                "Nourish your love",
              ].map((item) => (
                <li key={item} className="flex gap-2 items-center">
                  <Triangle className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/book" search={{ offering: "Couples Cacao Ceremony" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
                Book a couples ceremony <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent">
                Ask a question
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CacaoInvitesSection />

      <section className="mx-auto max-w-4xl px-5 sm:px-8 pb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Pricing</p>
        <h2 className="mt-2 font-display text-3xl">Ceremony options</h2>
        <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card/50">
          {[
            { label: "Couples Cacao Ceremony", duration: "90 min", price: "$390" },
            { label: "Private & Retreat Ceremonies", duration: "by arrangement", price: "Enquire" },
            { label: "Iridescence Cacao Starter Kit", duration: "ships from New Orleans", price: "$22 + shipping" },
          ].map((t, i) => (
            <li key={i} className="flex items-baseline justify-between gap-4 px-5 py-4">
              <div>
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {t.duration}{t.note ? ` · ${t.note}` : ""}
                </div>
              </div>
              <div className="text-sm font-display text-primary whitespace-nowrap">{t.price}</div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link to="/offerings" className="text-sm text-muted-foreground hover:text-foreground">← All offerings</Link>
        </div>
      </section>

      {/* STARTER KIT */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Triangle className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider">Cacao Starter Kit</span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <img
                src={cacaoLogoImg}
                alt="Iridescence Cacao logo"
                loading="lazy"
                width={120}
                height={120}
                className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover shadow-soft ring-1 ring-border shrink-0"
              />
              <h2 className="font-display text-3xl sm:text-4xl">Bring the ritual home.</h2>
            </div>
            <p className="mt-4 text-foreground/80 text-pretty">
              Iridescence Cacao is sourced with love from a small family farm in Costa Rica —
              honoring the land, the growers and the ancient spirit of this sacred plant.
              Our Starter Kit includes premium ceremonial-grade cacao with simple prep guidance
              to weave a heart-opening ritual into daily life. Watch Met's prep video to get started.
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft">
              Order a kit <ArrowRight className="h-4 w-4" />
            </Link>
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

      {/* BENEFITS */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        <div className="flex items-center gap-2 text-primary justify-center">
          <Triangle className="h-4 w-4" />
          <span className="text-xs uppercase tracking-wider">Food of the Gods</span>
        </div>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl text-center">The benefits of ceremonial cacao</h2>
        <p className="mt-4 max-w-3xl mx-auto text-center text-foreground/80 text-pretty">
          Honored for centuries by the Indigenous peoples of Central and South America as sacred
          medicine, ceremonial cacao gently nourishes the heart, body and spirit.
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
    </>
  );
}

function CacaoInvitesSection() {
  const submit = useServerFn(submitLead);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg(null);
    try {
      await submit({ data: { email: email.trim(), source: "cacao_circle" } });
      setStatus("done");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
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
