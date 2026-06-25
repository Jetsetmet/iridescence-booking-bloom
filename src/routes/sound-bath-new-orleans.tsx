import { createFileRoute, Link } from "@tanstack/react-router";
import soundImg from "@/assets/sound-bowls.jpg";
import { ArrowRight } from "lucide-react";
import { SQUARE_URL } from "@/lib/booking";

const URL = "https://iridescence-booking-bloom.lovable.app/sound-bath-new-orleans";

export const Route = createFileRoute("/sound-bath-new-orleans")({
  head: () => ({
    meta: [
      { title: "Sound Bath New Orleans — Crystal Bowl Sound Baths | Iridescence Healing" },
      { name: "description", content: "Sound Baths in New Orleans with Mehtap. Group and private crystal bowl sound baths, full moon sound bath events, weddings and retreats across New Orleans." },
      { name: "keywords", content: "sound bath New Orleans, crystal sound bath New Orleans, group sound bath New Orleans, full moon sound bath New Orleans" },
      { property: "og:title", content: "Sound Bath New Orleans — Iridescence Healing" },
      { property: "og:description", content: "Crystal bowl sound baths in New Orleans — group, private, weddings and retreats." },
      { property: "og:url", content: URL },
      { property: "og:image", content: soundImg },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Sound Bath New Orleans",
          serviceType: "Sound Bath",
          areaServed: { "@type": "City", name: "New Orleans" },
          provider: { "@type": "LocalBusiness", name: "Iridescence Healing", address: { "@type": "PostalAddress", addressLocality: "New Orleans", addressRegion: "LA", addressCountry: "US" } },
          url: URL,
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-8 py-16">
      <h1 className="text-4xl md:text-5xl font-serif text-foreground">Sound Bath in New Orleans</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
        New Orleans' most loved Sound Bath experience. Mehtap holds intimate group sound baths and private crystal bowl sound baths across uptown New Orleans — including full moon ceremonies, bridal events, retreats, and corporate wellness.
      </p>
      <div className="mt-8 rounded-3xl overflow-hidden shadow-card">
        <img src={soundImg} alt="Group sound bath in New Orleans with crystal singing bowls" className="w-full h-auto" />
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-6 text-foreground/90">
        <div>
          <h2 className="text-2xl font-serif">What is a Sound Bath?</h2>
          <p className="mt-3">A sound bath is an immersive meditation where you lie back and let the vibrations of 432Hz crystal bowls, Tibetan bowls and gong wash through your nervous system — releasing stress and restoring deep calm.</p>
        </div>
        <div>
          <h2 className="text-2xl font-serif">Where to find sound baths in New Orleans</h2>
          <p className="mt-3">Public events run regularly at Spyre and Wild Lotus Yoga. Private sound baths can be booked anywhere in New Orleans — your home, hotel, wedding or retreat venue.</p>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href={SQUARE_URL} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3">Book a Sound Bath <ArrowRight className="h-4 w-4" /></a>
        <Link to="/events" className="inline-flex items-center gap-2 rounded-full border border-input px-6 py-3">Upcoming Events</Link>
        <Link to="/sound-healing-new-orleans" className="inline-flex items-center gap-2 rounded-full border border-input px-6 py-3">Private Sound Healing</Link>
      </div>
    </section>
  );
}