import { createFileRoute, Link } from "@tanstack/react-router";
import moonImg from "@/assets/full-moon.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import heroImg from "@/assets/breathwork-event.jpg";
import breathYogaHero from "@/assets/breath-yoga-hero.jpg";
import { Calendar, MapPin, ArrowRight, CreditCard } from "lucide-react";

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
    price: "$25", payUrl: "https://buy.stripe.com/bJe9AU0xMc9G7388TR1Jm0j",
  },
  {
    date: "Wednesday, September 9", time: "6:30 PM",
    title: "Cacao + Heart Circle",
    loc: "An intimate uptown sanctuary · address shared once your spot is held · only a few cushions left · $40",
    blurb: "Ceremonial cacao, gentle sharing and a quiet space to remember what your heart already knows.",
    img: cacaoImg, offering: "Cacao Ceremony",
    price: "$40", payUrl: "https://buy.stripe.com/00w00kcgu7Tq1IO5HF1Jm0k",
  },
  {
    date: "Thursday, August 27", time: "6:00 PM",
    title: "Full Moon Lunar Eclipse Sound Bath",
    loc: "A hidden New Orleans space · address shared once your spot is held · only a few cushions left · $40",
    blurb: "Lie back as crystal bowls, chimes and gong wash through the body and invite the nervous system home.",
    img: moonImg, offering: "Reiki & Sound",
    price: "$40", payUrl: "https://buy.stripe.com/00w6oI5S66Pm87c8TR1Jm0l",
  },
  {
    date: "Every Saturday", time: "9:30 AM",
    title: "Kundalini Yoga with Met @ Spyre",
    loc: "Spyre · LGD New Orleans · all levels welcome · ongoing weekly class",
    blurb: "Come experience Kundalini Yoga with Met every Saturday morning. Breath, movement and meditation to awaken your energy and start your weekend grounded.",
    img: breathYogaHero, offering: "Breath & Yoga",
    price: "", payUrl: "https://spyrecenter.com/schedule-class/",
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
              <div className="mt-5 flex flex-col gap-2">
                {e.payUrl ? (
                  <a
                    href={e.payUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
                  >
                    {e.price ? `Reserve Spot — Pay ${e.price}` : "Reserve Spot"} <CreditCard className="h-3.5 w-3.5" />
                  </a>
                ) : null}
                <Link
                  to="/book"
                  search={{ offering: e.offering, event: `${e.title} — ${e.date}` }}
                  className={
                    e.payUrl
                      ? "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent"
                      : "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
                  }
                >
                  {e.payUrl ? "Ask a question" : "Reserve Spot"} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Private events & experience design</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl text-balance">
            Book Met for your retreat, hotel, wedding, or special event
          </h2>
          <p className="mt-3 text-sm text-muted-foreground text-pretty">
            Sound healing, Reiki, breathwork, cacao and wellness experience design for private gatherings and hospitality. Let’s create something memorable together.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
          >
            Contact Met <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/experience-design"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
          >
            Explore Experience Design <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
