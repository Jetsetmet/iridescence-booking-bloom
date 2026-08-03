import { createFileRoute, Link } from "@tanstack/react-router";
import moonImg from "@/assets/full-moon.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import heroImg from "@/assets/breathwork-event.jpg";
import breathYogaHero from "@/assets/breath-yoga-hero.jpg";
import flyerAsset from "@/assets/hotel-wellness-flyer.jpg.asset.json";
import { Calendar, MapPin, ArrowRight, Download } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Healing Events in New Orleans | Iridescence Healing" },
      { name: "description", content: "Upcoming full moon sound baths, cacao ceremonies, breathwork circles and yoga gatherings in uptown New Orleans with Met. Small intimate groups." },
      { property: "og:title", content: "Healing Events in New Orleans | Iridescence Healing" },
      { property: "og:description", content: "Full moon sound baths, cacao ceremonies and sunrise breathwork in New Orleans." },
      { property: "og:url", content: "https://iridescence-booking-bloom.lovable.app/events" },
    ],
    links: [
      { rel: "canonical", href: "https://iridescence-booking-bloom.lovable.app/events" },
    ],
  }),
  component: Events,
});

const events = [
  {
    date: "Monday, August 17", time: "6:30 PM",
    title: "Virtual \"Open Your Heart\" Breathwork Journey",
    loc: "Online from anywhere · $25",
    blurb: "An hour of guided breath to soften the chest, move stuck emotion and meet yourself in stillness — from wherever you are.",
    img: heroImg, offering: "Breath & Yoga",
  },
  {
    date: "Wednesday, September 9", time: "6:30 PM",
    title: "Cacao + Heart Circle",
    loc: "An intimate uptown sanctuary · address shared once your spot is held · only a few cushions left · $35",
    blurb: "Ceremonial cacao, gentle sharing and a quiet space to remember what your heart already knows.",
    img: cacaoImg, offering: "Cacao Ceremony",
  },
  {
    date: "Thursday, August 27", time: "6:30 PM",
    title: "Full Moon Sound Bath",
    loc: "A hidden New Orleans space · address shared once your spot is held · only a few cushions left · $35",
    blurb: "Lie back as crystal bowls, chimes and gong wash through the body and invite the nervous system home.",
    img: moonImg, offering: "Reiki & Sound",
  },
  {
    date: "Every Saturday", time: "9:30 AM",
    title: "Kundalini Yoga with Met @ Spyre",
    loc: "Spyre · LGD New Orleans · all levels welcome · ongoing weekly class",
    blurb: "Come experience Kundalini Yoga with Met every Saturday morning. Breath, movement and meditation to awaken your energy and start your weekend grounded.",
    img: breathYogaHero, offering: "Breath & Yoga",
  },
  // Wednesday Kundalini @ Anarchy Yoga is paused — hidden until further notice.
];

function Events() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Gather</p>
      <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance max-w-3xl">
        Upcoming circles & ceremonies.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Space is intentionally small — reserve your spot to make sure there's a cushion waiting.
      </p>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {events.map((e) => (
          <article key={e.title} className="rounded-3xl overflow-hidden bg-card border border-border shadow-card flex flex-col">
            <img src={e.img} alt={`${e.title} — ${e.loc}, healing ceremony in New Orleans`}
              loading="lazy" width={1280} height={960}
              className="h-52 w-full object-cover" />
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-[11px] text-primary uppercase tracking-wider flex items-center gap-1.5 font-bold whitespace-nowrap">
                <Calendar className="h-3 w-3 shrink-0" /> {e.date} · {e.time}
              </div>
              <h2 className="mt-2 font-display text-2xl">{e.title}</h2>
              <p className="mt-2 text-sm text-foreground/80 text-pretty">{e.blurb}</p>
              <p className="mt-2 text-sm text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {e.loc}
              </p>
              <Link
                to="/book"
                search={{ offering: e.offering, event: `${e.title} — ${e.date}` }}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Reserve Spot <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Private events</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl text-balance">
            Book Met for your retreat, hotel, wedding, or special event
          </h2>
          <p className="mt-3 text-foreground/80 text-pretty">
            Create a meaningful, memorable experience for your guests with Met's unique blend of sound healing, Reiki, breathwork, cacao ceremonies, meditation, and yoga.
          </p>
          <p className="mt-4 text-sm text-muted-foreground text-pretty">
            Before moving to the US, Met spent over 15 years in the UK events industry, producing everything from intimate gatherings to large-scale events for thousands of attendees. That background lets her combine professionalism, presence, and exceptional guest care with transformational wellness offerings.
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="rounded-2xl border border-border bg-iridescent-box p-5 shadow-card">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Available for</p>
            <ul className="mt-3 grid gap-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Retreats & wellness experiences</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Hotels & resorts</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Bridal parties & wedding weekends</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Corporate wellness events</li>
              <li className="flex items-center gap-2"><span className="text-primary">·</span> Private & group gatherings</li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-background p-5">
            <a
              href={flyerAsset.url}
              download="iridescence-hotel-wellness-flyer.jpg"
              className="group block w-full max-w-[40%] rounded-xl overflow-hidden border border-border shadow-card bg-background"
            >
              <img
                src={flyerAsset.url}
                alt="Exclusive wellness experiences for hotel events and guests — downloadable flyer"
                loading="lazy"
                width={1280}
                height={1792}
                className="w-full h-auto object-cover"
              />
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground text-pretty max-w-2xl mx-auto">
          Each experience is thoughtfully tailored to your guests, creating moments of connection, transformation, and lasting impact.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={flyerAsset.url}
            download="iridescence-hotel-wellness-flyer.jpg"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft"
          >
            Download flyer <Download className="h-4 w-4" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
          >
            Contact Met <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
