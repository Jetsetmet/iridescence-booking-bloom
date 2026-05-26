import { createFileRoute, Link } from "@tanstack/react-router";
import reikiImg from "@/assets/reiki-hands.jpg";
import soundImg from "@/assets/sound-bowls.jpg";
import { ArrowRight, Triangle, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/crystal-reiki")({
  head: () => ({
    meta: [
      { title: "Crystal Reiki & Sound Healing in New Orleans" },
      { name: "description", content: "Intuitive Crystal Reiki sessions with crystal frequencies, chakra balancing, breath activations and 432Hz quartz bowls — private, couple and group bookings in New Orleans." },
      { property: "og:title", content: "Crystal Reiki & Sound — Iridescence Healing" },
      { property: "og:description", content: "Hands-on energy work woven with crystals, breath and sacred sound." },
      { property: "og:image", content: reikiImg },
    ],
  }),
  component: CrystalReiki,
});

const tiers = [
  { label: "Student Session", duration: "60 min", price: "$110" },
  { label: "Private Session", duration: "60 min", price: "$130" },
  { label: "Private Session", duration: "90 min", price: "$170" },
  { label: "Couple & Group Booking", duration: "90 min", price: "$140 pp", note: "up to 6, more on request" },
  { label: "Retreat & Venue Bookings", duration: "by arrangement", price: "Enquire", book: true as const },
];

const venues: Array<{ name: string; url?: string }> = [
  { name: "Spyre New Orleans", url: "https://www.thecenternola.com/spyre" },
  { name: "Wild Lotus Yoga", url: "https://wildlotusyoga.com/" },
  { name: "Arora", url: "https://www.aroranola.com/" },
  { name: "The Nest Costa Rica", url: "https://reganhillyer.com/pages/the-nest-private-immersions" },
  { name: "Imiloa Institute", url: "https://imiloainstitute.com/" },
  { name: "Holos", url: "https://holos.global/" },
  { name: "Danyasa Yoga Retreat", url: "https://www.danyasa.com/" },
  { name: "Tribe Boutique Hotel", url: "https://www.tribeboutiquehotel.com/" },
  { name: "Awake Uvita", url: "https://www.awake.cr/" },
  { name: "Synergy Uvita", url: "https://synergycostarica.com/" },
  { name: "Yacumama", url: "https://www.yacumama.love/" },
  { name: "Finca Mia", url: "https://www.fincamia.com/" },
  { name: "The Shala" },
  { name: "Sol Rising" },
  { name: "Casa Colibri" },
  { name: "Astanga Rooms" },
  { name: "Trilith Studios" },
];

function CrystalReiki() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden shadow-card">
          <img src={reikiImg} alt="Crystal Reiki session with Mehtap" className="w-full h-auto md:h-[420px] object-cover" width={1280} height={960} />
        </div>
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Sacred practice</span>
          </div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">Crystal Reiki and Sound</h1>
          <p className="mt-4 text-muted-foreground text-pretty">
            Over the past decade, Met's Reiki sessions have blossomed into a deeply intuitive, holistic
            experience — weaving hands-on energy work, healing crystal frequencies, chakra balancing,
            breath and visualization activations, soul cleansing of unhealthy cords, and powerful sound
            from 432Hz quartz bowls, 528Hz chimes and solfeggio frequencies.
          </p>
          <p className="mt-3 text-muted-foreground text-pretty">
            Each session is held in a safe, nurturing space to clear, balance and activate the chakra system,
            soften limiting beliefs, and guide you back to your truest self. Offered as one-on-one, couple
            and group sessions.
          </p>
          <Link
            to="/book"
            search={{ offering: "Reiki" }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft"
          >
            Book a Reiki session <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-8 pb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Pricing</p>
        <h2 className="mt-2 font-display text-3xl">Session options</h2>
        <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card/50">
          {tiers.map((t, i) => (
            <li key={i} className="flex items-baseline justify-between gap-4 px-5 py-4">
              <div>
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {t.duration}{t.note ? ` · ${t.note}` : ""}
                </div>
              </div>
              {"book" in t && t.book ? (
                <Link to="/book" search={{ offering: "Sound Bath" }} className="text-sm font-display text-primary whitespace-nowrap hover:underline">{t.price}</Link>
              ) : (
                <div className="text-sm font-display text-primary whitespace-nowrap">{t.price}</div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <img src={soundImg} alt="Met holding a 432Hz crystal singing bowl"
          loading="lazy" width={1200} height={1200}
          className="rounded-[2rem] shadow-glow object-cover w-full h-auto md:h-[460px]" />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Sound Bath Journeys</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl text-balance">
            High-vibrational <span className="italic bg-iridescent bg-clip-text text-transparent">sound</span>, deep remembering.
          </h2>
          <p className="mt-5 text-foreground/80 leading-relaxed text-pretty">
            Met gently guides you on a meditative healing journey using 432Hz crystal bowls, 528Hz chimes, solfeggio frequencies, gongs and the monochord — chosen intuitively to relax the nervous system, nurture inner peace and activate the chakras to their purest, loving essence.
          </p>
          <p className="mt-3 text-foreground/80 leading-relaxed text-pretty">
            An inner journey to reconnect with both your past and future selves — to resolve, release and step into who you truly are.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/book" search={{ offering: "Sound Bath" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft">
              Book a sound bath <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-medium hover:bg-accent">
              Host at your retreat
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft">
          <div className="flex items-center gap-2">
            <Triangle className="h-5 w-5 text-primary" />
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Featured at</p>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Retreat spaces Met has held sound baths at</h2>
          <p className="mt-3 text-foreground/80 text-pretty max-w-2xl">
            Public and private retreats across Europe, the US and Costa Rica. Click any space to visit their site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {venues.map((v) =>
              v.url ? (
                <a key={v.name} href={v.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors">
                  {v.name}
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              ) : (
                <span key={v.name}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground/80">
                  {v.name}
                </span>
              )
            )}
            <span className="inline-flex items-center px-5 py-2.5 text-sm text-muted-foreground italic">and more…</span>
          </div>
        </div>
        <div className="mt-10">
          <Link to="/offerings" className="text-sm text-muted-foreground hover:text-foreground">← All offerings</Link>
        </div>
      </section>
    </>
  );
}