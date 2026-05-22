import { createFileRoute, Link } from "@tanstack/react-router";
import soundImg from "@/assets/sound-bowls.jpg";
import reikiImg from "@/assets/reiki-hands.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import heroImg from "@/assets/hero-meditation.jpg";
import selfLoveImg from "@/assets/self-love.jpg";
import packagesImg from "@/assets/moon.jpg";
import retreatsImg from "@/assets/costa-rica-waterfall.jpg";
import { ArrowRight, Triangle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/offerings")({
  head: () => ({
    meta: [
      { title: "Reiki, Sound Healing, Cacao & Breathwork Sessions in New Orleans" },
       { name: "description", content: "Book Crystal Reiki, sound baths, cacao ceremonies, breathwork, yoga, meditation and self-love mentoring with Mehtap in uptown New Orleans. Private, couple, group and virtual sessions." },
       { property: "og:title", content: "Healing Sessions in New Orleans - Iridescence Healing" },
      { property: "og:description", content: "Reiki, sound healing, cacao ceremonies, breathwork and intuitive mentoring in New Orleans." },
    ],
  }),
  component: Offerings,
});

type Tier = { label: string; duration?: string; price: string; note?: string };
const items: Array<{
  key: string; tab: string; title: string; img: string; slug: string; desc: string; tiers: Tier[];
}> = [
  {
    key: "reiki", tab: "Crystal Reiki", title: "Crystal Reiki & Sound", img: reikiImg, slug: "Reiki",
     desc: "Over the past decade, Met's Reiki sessions have blossomed into a deeply intuitive, holistic experience — weaving hands-on energy work, healing crystal frequencies, chakra balancing, breath and visualization activations, soul cleansing of unhealthy cords, and powerful sound from 432Hz quartz bowls, 528Hz chimes and solfeggio frequencies. Each session is held in a safe, nurturing space to clear, balance and activate the chakra system, soften limiting beliefs, and guide you back to your truest self. Offered as one-on-one, couple and group sessions.",
    tiers: [
      { label: "Student", duration: "60 min", price: "$110" },
      { label: "Private Session", duration: "60 min", price: "$130" },
      { label: "Private Session", duration: "90 min", price: "$170" },
      { label: "Couple & Group Bookings", duration: "90 min", price: "$140 pp", note: "up to 6, more on request" },
    ],
  },
  {
    key: "sound", tab: "Sound Bath", title: "Sound Bath Journey", img: soundImg, slug: "Sound Bath",
     desc: "A sacred journey with Tibetan, crystal singing bowls, gongs and chimes - held for couples, intimate groups and retreats. See the dedicated Sound Baths page for retreat features.",
    tiers: [
      { label: "Retreat Sound Bath Journey", price: "Please email" },
      { label: "Couple & Group Bookings", duration: "90 min", price: "$140 pp", note: "up to 4, more on request" },
    ],
  },
  {
    key: "cacao", tab: "Cacao", title: "Cacao Ceremonies", img: cacaoImg, slug: "Cacao Ceremony",
    desc: "Heart-opening ceremonial cacao with breath, intention, connection and gentle sharing - for couples and retreat groups.",
    tiers: [
      { label: "Couples Cacao", duration: "110 min", price: "$390" },
      { label: "Retreat Cacao", price: "Please email" },
    ],
  },
   {
     key: "breath", tab: "Breath & Yoga", title: "Breath • Yoga", img: heroImg, slug: "Breathwork",
     desc: "Guided pranayama, somatic breath journeys and Kundalini yoga to release stored emotion and meet yourself in stillness.",
     tiers: [
       { label: "Private Session", duration: "60 min", price: "$130" },
       { label: "Private Session", duration: "90 min", price: "$170" },
       { label: "Couple & Group Bookings", duration: "90 min", price: "$140 pp", note: "up to 6, more on request" },
     ],
   },
  {
    key: "mentoring", tab: "Self-Love Mentoring", title: "Self-Love Mentoring", img: selfLoveImg, slug: "Mentoring",
    desc: "A devotional mentorship for those called to reclaim their wholeness, intuition and inner power — offered in person and virtually.",
     tiers: [
       { label: "6 Week Mentoring Programme", price: "$720" },
     ],
  },
  {
    key: "packages", tab: "Packages", title: "In Person & Virtual Packages", img: packagesImg, slug: "Mentoring",
    desc: "Bundled session packages with a 10% discount — held in person in uptown New Orleans or virtually from anywhere.",
    tiers: [
      { label: "Four 60-min Sessions", duration: "10% discount", price: "$468" },
      { label: "Four 90-min Sessions", duration: "10% discount", price: "$612" },
    ],
  },
  {
    key: "retreats", tab: "Retreats", title: "Transformative Retreats", img: retreatsImg, slug: "Retreat",
    desc: "Immersive journeys weaving Reiki, sound, cacao, yoga, breathwork and somatic practices into the quiet medicine of ancient lands — Istanbul & Cappadocia in April 2026, and a private 4-day Oneness retreat in Costa Rica.",
    tiers: [
      { label: "Resonance & Remembrance — Turkey", duration: "May 19–25, 2026", price: "Istanbul & Cappadocia" },
      { label: "Whispers of the Ancient Shores — Türkiye", duration: "June 2–8", price: "Alaçatı" },
      { label: "4-Day Oneness Private Retreat", duration: "Custom dates", price: "From $4,422 pp" },
    ],
  },
];

function Offerings() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Offerings</p>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance max-w-3xl">
          Sacred practices for your remembering.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground whitespace-pre-line">
          Each offering is held with intention, presence and a safe container -{"\n"} so you can soften the rest.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-16">
        <Tabs defaultValue={items[0].key} className="w-full">
          <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0 pb-3">
            <TabsList className="h-auto flex-nowrap gap-2 bg-card/40 backdrop-blur-sm p-2 rounded-3xl border border-border/60 shadow-soft">
              {items.map((o) => (
                <TabsTrigger
                  key={o.key}
                  value={o.key}
                  className="relative rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out
                    data-[state=inactive]:bg-background/60 data-[state=inactive]:text-muted-foreground data-[state=inactive]:border data-[state=inactive]:border-border/40 data-[state=inactive]:hover:bg-accent/60 data-[state=inactive]:hover:text-foreground
                    data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:scale-[1.02] data-[state=active]:ring-2 data-[state=active]:ring-primary/30"
                >
                  <span className="relative z-10 whitespace-nowrap">{o.tab}</span>
                  <span className="absolute inset-1 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-0 data-[state=active]:opacity-100 transition-opacity" />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {items.map((o) => (
            <TabsContent key={o.key} value={o.key} className="mt-8 focus-visible:ring-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <article className="grid md:grid-cols-2 gap-8 items-start">
                <div className="rounded-3xl overflow-hidden shadow-card ring-1 ring-border/40">
                  <img
                    src={o.img}
                    alt={`${o.title} session with Mehtap at Iridescence Healing in New Orleans`}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="w-full h-[360px] md:h-[440px] object-cover"
                  />
                </div>
                <div className="bg-card/30 rounded-3xl p-6 sm:p-8 border border-border/40">
                  <div className="flex items-center gap-2 text-primary">
                    <Triangle className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">Sacred practice</span>
                  </div>
                  <h2 className="mt-2 font-display text-3xl sm:text-4xl">{o.title}</h2>
                  <p className="mt-3 text-muted-foreground text-pretty leading-relaxed">{o.desc}</p>
                  <ul className="mt-5 divide-y divide-border rounded-2xl border border-border bg-background/60 shadow-inner">
                    {o.tiers.map((t, ti) => (
                      <li key={ti} className="flex items-baseline justify-between gap-4 px-4 py-3 hover:bg-accent/30 transition-colors">
                        <div className="min-w-0">
                          <div className="text-sm font-medium">{t.label}</div>
                          {(t.duration || t.note) && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {t.duration}{t.duration && t.note ? " · " : ""}{t.note}
                            </div>
                          )}
                        </div>
                        <div className="text-sm font-display whitespace-nowrap text-primary font-semibold">{t.price}</div>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/book"
                    search={{ offering: o.slug }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-lg hover:scale-[1.02] transition-all"
                  >
                    Book {o.title} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <div className="rounded-3xl border border-border bg-card/50 p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">More ways to journey</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">Continue exploring.</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <Link to="/meditation" className="rounded-2xl border border-border bg-background/60 p-5 hover:bg-accent transition-colors">
              <div className="font-display text-xl">Meditation & Yoga</div>
              <p className="mt-1 text-sm text-muted-foreground">Weekly breathwork and Kundalini classes.</p>
            </Link>
            <Link to="/retreats" className="rounded-2xl border border-border bg-background/60 p-5 hover:bg-accent transition-colors">
              <div className="font-display text-xl">Retreats</div>
              <p className="mt-1 text-sm text-muted-foreground">Costa Rica & seasonal immersions.</p>
            </Link>
            <Link to="/quiz" className="rounded-2xl border border-border bg-background/60 p-5 hover:bg-accent transition-colors">
              <div className="font-display text-xl">Find Your Path</div>
              <p className="mt-1 text-sm text-muted-foreground">A 60-second quiz to guide you.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
