import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-meditation.jpg";
import reikiImg from "@/assets/reiki-hands.jpg";
import cacaoImg from "@/assets/cacao-ceremony.jpg";
import breathYogaHero from "@/assets/breath-yoga-hero.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sound Healing New Orleans | Sound Bath & Reiki — Iridescence Healing" },
      { name: "description", content: "Sound Healing, Sound Baths and Reiki in New Orleans with Master practitioner Mehtap. 17+ years of crystal Reiki, sound bath ceremonies, cacao and breathwork in uptown New Orleans. Book in-person or virtual." },
      { name: "keywords", content: "sound healing New Orleans, sound bath New Orleans, Reiki New Orleans, New Orleans Reiki Master, crystal Reiki New Orleans, cacao ceremony New Orleans, breathwork New Orleans, energy healing New Orleans, uptown New Orleans Reiki" },
      { property: "og:title", content: "Sound Healing New Orleans | Sound Bath & Reiki — Iridescence Healing" },
      { property: "og:description", content: "New Orleans' trusted Sound Healing, Sound Bath and Reiki practitioner. Crystal Reiki, cacao ceremonies, breathwork and intuitive guidance with Mehtap in uptown New Orleans." },
      { property: "og:url", content: "https://iridescence-booking-bloom.lovable.app/" },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "https://iridescence-booking-bloom.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://iridescence-booking-bloom.lovable.app/#business",
          name: "Iridescence Healing — Sound Healing, Sound Bath & Reiki New Orleans",
          image: "https://iridescence-booking-bloom.lovable.app/og.jpg",
          url: "https://iridescence-booking-bloom.lovable.app/",
          telephone: "",
          priceRange: "$$",
          description:
            "Sound Healing, Sound Bath and Reiki sessions in New Orleans with Master practitioner Mehtap. Crystal Reiki, cacao ceremonies, breathwork and intuitive energy guidance.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "New Orleans",
            addressRegion: "LA",
            addressCountry: "US",
          },
          geo: { "@type": "GeoCoordinates", latitude: 29.9511, longitude: -90.0715 },
          areaServed: [
            { "@type": "City", name: "New Orleans" },
            { "@type": "AdministrativeArea", name: "Louisiana" },
          ],
          makesOffer: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sound Healing New Orleans" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sound Bath New Orleans" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reiki New Orleans" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Crystal Reiki New Orleans" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cacao Ceremony New Orleans" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Breathwork New Orleans" } },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

const journeys = [
  {
    title: "Private Healing",
    subtitle: "Reiki • Sound • Mentoring • Breathwork",
    to: "/offerings",
    img: reikiImg,
  },
  {
    title: "Retreats & Events",
    subtitle: "Retreats • Ceremonies • Cacao • Group Experiences",
    to: "/retreats",
    img: cacaoImg,
  },
  {
    title: "Experience Design",
    subtitle: "Hotels • Hospitality • Corporate • Wellness Programming",
    to: "/experience-design",
    img: "/media/experience-design.png",
  },
  {
    title: "Meditation",
    subtitle: "Downloads • YouTube • Resources",
    to: "/breath-yoga",
    img: breathYogaHero,
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance">
              A gentle return to your <span className="italic">inner light</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty">
              I'm Mehtap, a Transformational Practitioner, Retreat Facilitator and Wellness Experience Designer, creating immersive wellness experiences through Reiki, Sound and Ceremony for individuals, retreats and hospitality destinations worldwide.
            </p>
            <div className="mt-8">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-soft hover:opacity-90 transition-opacity"
              >
                Book a Session
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Mehtap leading meditation and energy healing at golden hour — Reiki and sound healing in New Orleans"
              width={1080}
              height={1920}
              className="relative rounded-[2rem] shadow-card object-cover w-full h-[520px] lg:h-[640px]"
            />
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR JOURNEY */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Choose your journey</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-balance">
            Where are you being called?
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {journeys.map((j) => (
            <Link
              key={j.title}
              to={j.to}
              className="group relative overflow-hidden rounded-3xl bg-card border border-border shadow-card hover:shadow-glow transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={j.img}
                  alt={j.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl sm:text-3xl">{j.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">{j.subtitle}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
