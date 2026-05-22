import { createFileRoute, Link } from "@tanstack/react-router";
import reikiImg from "@/assets/reiki-hands.jpg";
import { ArrowRight, Triangle } from "lucide-react";

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
              <div className="text-sm font-display text-primary whitespace-nowrap">{t.price}</div>
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