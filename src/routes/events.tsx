import { createFileRoute, Link } from "@tanstack/react-router";
import moonImg from "@/assets/full-moon.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import heroImg from "@/assets/hero-meditation.jpg";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Upcoming Events — Iridescence Healing" },
      { name: "description", content: "Group sound baths, cacao ceremonies and breathwork circles in New Orleans." },
      { property: "og:title", content: "Upcoming Events — Iridescence Healing" },
      { property: "og:description", content: "Group sound baths, cacao ceremonies and breathwork circles." },
    ],
  }),
  component: Events,
});

const events = [
  { date: "Friday, May 30", time: "7:00 PM", title: "Full Moon Sound Bath", loc: "Uptown Studio, New Orleans", img: moonImg, slug: "Sound Bath" },
  { date: "Sunday, June 9",  time: "5:30 PM", title: "Cacao + Heart Circle", loc: "Private Garden, Uptown", img: cacaoImg, slug: "Cacao Ceremony" },
  { date: "Saturday, June 22", time: "9:00 AM", title: "Sunrise Breathwork Journey", loc: "Audubon Park", img: heroImg, slug: "Breathwork" },
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
            <img src={e.img} alt={e.title} loading="lazy" width={1280} height={960}
              className="h-52 w-full object-cover" />
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-xs text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {e.date} · {e.time}
              </div>
              <h3 className="mt-2 font-display text-2xl">{e.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {e.loc}
              </p>
              <Link
                to="/book"
                search={{ offering: e.slug, event: e.title }}
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
