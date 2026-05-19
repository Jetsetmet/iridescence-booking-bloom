import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Triangle, Play } from "lucide-react";
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
            Ceremonial cacao — the food of the gods — honored for centuries as sacred medicine. Met's cacao is sourced from a small, family-run farm in Costa Rica's Southern Pacific zone and lovingly brewed with colorful spices to gently open the heart, soften old patterns and reconnect you to intuition, creativity and joy.
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

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Iridescence Cacao Starter Kit</span>
          </div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">Bring the ritual home.</h2>
          <p className="mt-4 text-foreground/80 text-pretty">
            An all-in-one introduction to creating a heart-opening cacao ritual at home. Each kit includes our premium ceremonial-grade cacao from Costa Rica, simple preparation guidance and ritual inspiration to support your daily practice. Rose Cardamom samples coming soon to New Orleans.
          </p>
          <a
            href="https://youtu.be/zkVk49BEDP4"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-medium hover:bg-accent"
          >
            <Play className="h-4 w-4 text-primary" /> Watch the cacao prep video
          </a>
        </div>
        <div className="rounded-[2rem] overflow-hidden shadow-card aspect-video bg-card">
          <iframe
            src="https://www.youtube.com/embed/zkVk49BEDP4"
            title="Iridescence Cacao Prep Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-16">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft">
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Group Ceremony</span>
          </div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">Cacao Ceremony — New Orleans</h2>
          <p className="mt-4 text-foreground/80 text-pretty">
            A circle of warmth and connection. Met's lovingly brewed cacao is sipped as sacred tea alongside heartfelt prayers, a heart-opening meditation, dance to release stagnant energy and a grounding sound healing and sharing circle to close.
          </p>
          <p className="mt-3 text-foreground/80 text-pretty">
            Rich in magnesium and theobromine, ceremonial cacao gently uplifts mood, supports circulation and encourages the release of endorphins and serotonin — naturally inviting joy, clarity and inner bliss.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft">
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">For Two</span>
          </div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">Couples Cacao Ceremony</h2>
          <p className="mt-4 text-foreground/80 text-pretty">
            A deeply nourishing experience blending ceremonial cacao with Reiki, sound therapy, breathwork and gentle connection exercises — a safe, supportive space to meet each other on a soul level and strengthen trust, intimacy and emotional alignment.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            {[
              "Authentic soul-level connection",
              "Heart-opening with ceremonial cacao",
              "Reiki & sound to release old patterns",
              "A nurturing space for love to be felt",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 rounded-2xl border border-border bg-background/60 px-4 py-3">
                <Triangle className="h-3.5 w-3.5 mt-1 text-primary shrink-0" />
                <span className="text-foreground/85">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link to="/book" search={{ offering: "Cacao Ceremony" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft">
              Book couples cacao <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}