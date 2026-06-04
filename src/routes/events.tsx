import { createFileRoute, Link } from "@tanstack/react-router";
import moonImg from "@/assets/full-moon.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import heroImg from "@/assets/breathwork-event.jpg";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

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
    date: "Thursday, May 30", time: "6:30 PM",
    title: "Virtual \"Open Your Heart\" Breathwork Journey",
    loc: "Online from anywhere · $25",
    blurb: "An hour of guided breath to soften the chest, move stuck emotion and meet yourself in stillness — from wherever you are.",
    img: heroImg, offering: "Breath & Yoga",
  },
  {
    date: "Thursday, June 4", time: "6:30 PM",
    title: "Cacao + Heart Circle",
    loc: "An intimate uptown sanctuary · address shared once your spot is held · only a few cushions left · $35",
    blurb: "Ceremonial cacao, gentle sharing and a quiet space to remember what your heart already knows.",
    img: cacaoImg, offering: "Cacao Ceremony",
  },
  {
    date: "Sunday, June 14", time: "11:00 AM",
    title: "New Moon Sound Bath",
    loc: "A hidden New Orleans space · address shared once your spot is held · only a few cushions left · $35",
    blurb: "Lie back as crystal bowls, chimes and gong wash through the body and invite the nervous system home.",
    img: moonImg, offering: "Reiki & Sound",
  },
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
              <h3 className="mt-2 font-display text-2xl">{e.title}</h3>
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
    </section>
  );
}
