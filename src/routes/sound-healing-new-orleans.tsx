import { createFileRoute, Link } from "@tanstack/react-router";
import soundImg from "@/assets/sound-bowls.jpg";
import { ArrowRight } from "lucide-react";
import { SQUARE_URL } from "@/lib/booking";

const URL = "https://iridescence-booking-bloom.lovable.app/sound-healing-new-orleans";

export const Route = createFileRoute("/sound-healing-new-orleans")({
  head: () => ({
    meta: [
      { title: "Sound Healing New Orleans — Crystal Bowl Sound Bath | Iridescence Healing" },
      { name: "description", content: "Sound Healing in New Orleans with Mehtap of Iridescence Healing. 432Hz crystal singing bowl sound baths, private and group sessions in uptown New Orleans. Book today." },
      { name: "keywords", content: "sound healing New Orleans, sound bath New Orleans, crystal bowl sound bath New Orleans, 432Hz New Orleans, sound therapy New Orleans" },
      { property: "og:title", content: "Sound Healing New Orleans — Iridescence Healing" },
      { property: "og:description", content: "432Hz crystal singing bowl sound healing and sound baths in New Orleans with Mehtap." },
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
          name: "Sound Healing New Orleans",
          serviceType: "Sound Healing",
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
      <h1 className="text-4xl md:text-5xl font-serif text-foreground">Sound Healing in New Orleans</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
        Iridescence Healing offers the most immersive Sound Healing experiences in New Orleans — 432Hz crystal singing bowls, Tibetan bowls, gong and voice, guided by Reiki Master Mehtap. Private one-on-one sound healing, couples sessions, and group sound baths across uptown New Orleans and beyond.
      </p>
      <div className="mt-8 rounded-3xl overflow-hidden shadow-card">
        <img src={soundImg} alt="Sound healing session with crystal singing bowls in New Orleans" className="w-full h-auto" />
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-6 text-foreground/90">
        <div>
          <h2 className="text-2xl font-serif">Why choose Iridescence for Sound Healing in New Orleans</h2>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>17+ years guiding sound healing and energy work</li>
            <li>Full set of 432Hz quartz crystal singing bowls</li>
            <li>Held at Spyre, Wild Lotus Yoga and private homes across New Orleans</li>
            <li>Private, couples, and group sound bath bookings</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-serif">What a New Orleans sound healing session looks like</h2>
          <p className="mt-3">A 60–90 minute immersion combining breath, intention setting and a full crystal-bowl sound bath. Many clients pair sound healing with Reiki for deeper release.</p>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href={SQUARE_URL} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3">Book Sound Healing <ArrowRight className="h-4 w-4" /></a>
        <Link to="/sound-bath-new-orleans" className="inline-flex items-center gap-2 rounded-full border border-input px-6 py-3">Group Sound Baths</Link>
        <Link to="/reiki-new-orleans" className="inline-flex items-center gap-2 rounded-full border border-input px-6 py-3">Reiki New Orleans</Link>
      </div>
    </section>
  );
}