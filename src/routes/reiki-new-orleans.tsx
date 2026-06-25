import { createFileRoute, Link } from "@tanstack/react-router";
import reikiImg from "@/assets/reiki-hands.jpg";
import { ArrowRight } from "lucide-react";
import { SQUARE_URL } from "@/lib/booking";

const URL = "https://iridescence-booking-bloom.lovable.app/reiki-new-orleans";

export const Route = createFileRoute("/reiki-new-orleans")({
  head: () => ({
    meta: [
      { title: "Reiki New Orleans — Crystal Reiki Master Mehtap | Iridescence Healing" },
      { name: "description", content: "Reiki in New Orleans with Master practitioner Mehtap. Crystal Reiki, chakra balancing and energy healing — 17+ years of experience in uptown New Orleans. Book today." },
      { name: "keywords", content: "Reiki New Orleans, Reiki Master New Orleans, crystal Reiki New Orleans, energy healing New Orleans, chakra healing New Orleans" },
      { property: "og:title", content: "Reiki New Orleans — Iridescence Healing" },
      { property: "og:description", content: "Crystal Reiki and energy healing in New Orleans with Reiki Master Mehtap." },
      { property: "og:url", content: URL },
      { property: "og:image", content: reikiImg },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Reiki New Orleans",
          serviceType: "Reiki",
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
      <h1 className="text-4xl md:text-5xl font-serif text-foreground">Reiki in New Orleans</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
        Looking for Reiki in New Orleans? Mehtap is a Reiki Master with 17+ years of practice, offering Crystal Reiki, chakra balancing and intuitive energy healing in uptown New Orleans. Private sessions, couples sessions, and group bookings welcome.
      </p>
      <div className="mt-8 rounded-3xl overflow-hidden shadow-card">
        <img src={reikiImg} alt="Reiki session in New Orleans with Reiki Master Mehtap" className="w-full h-auto" />
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-6 text-foreground/90">
        <div>
          <h2 className="text-2xl font-serif">Why book Reiki with Iridescence</h2>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>Reiki Master with 17+ years of training</li>
            <li>Crystal Reiki — Reiki woven with crystal therapy and sound</li>
            <li>Trusted by clients across New Orleans, Louisiana and beyond</li>
            <li>In-person uptown New Orleans, plus distance Reiki</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-serif">What to expect</h2>
          <p className="mt-3">A 60 or 90 minute Reiki session — fully clothed, lying down, while hands-on (or hovering) energy work clears blocks and restores balance. Many sessions close with a short crystal bowl sound bath.</p>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href={SQUARE_URL} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3">Book Reiki <ArrowRight className="h-4 w-4" /></a>
        <Link to="/crystal-reiki" className="inline-flex items-center gap-2 rounded-full border border-input px-6 py-3">About Crystal Reiki</Link>
        <Link to="/sound-healing-new-orleans" className="inline-flex items-center gap-2 rounded-full border border-input px-6 py-3">Sound Healing</Link>
      </div>
    </section>
  );
}