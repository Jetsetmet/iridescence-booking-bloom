import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Triangle, Sparkles } from "lucide-react";
import metImg from "@/assets/met-experience-design.jpg.asset.json";

export const Route = createFileRoute("/experience-design")({
  head: () => ({
    meta: [
      { title: "Wellness Experience Design — Hospitality & Retreats | Iridescence Healing" },
      { name: "description", content: "Bespoke wellness experience design for hotels, retreats, luxury hospitality brands and spa destinations. Sound, breath, ritual and energy medicine woven into unforgettable guest journeys." },
      { property: "og:title", content: "Wellness Experience Design — Hospitality & Retreats" },
      { property: "og:description", content: "Bespoke wellness experiences for hotels, retreats and luxury hospitality brands." },
    ],
  }),
  component: ExperienceDesign,
});

const services = [
  "Wellness Experience Design",
  "Guest Journey Development",
  "Signature Wellness Programming",
  "Luxury Hospitality Consulting",
  "Retreat Design & Facilitation",
  "Sound, Breath & Meditation Experiences",
  "Staff Training & Facilitation",
  "Creative Wellness Partnerships",
  "Corporate & Luxury Wellness Experiences",
];

function ExperienceDesign() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">For hotels, retreats & luxury brands</p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-balance">
              Wellness Experience Design for <span className="italic bg-iridescent bg-clip-text text-transparent">Hospitality & Retreats</span>
            </h1>
          </div>
          <div className="relative">
            <img
              src={metImg.url}
              alt="Mehtap — wellness experience designer and facilitator for hospitality and retreats"
              width={1080}
              height={1350}
              loading="eager"
              className="relative rounded-[2rem] shadow-card object-cover w-full h-[400px] sm:h-[480px] lg:h-[540px]"
            />
          </div>
        </div>
      </section>

      {/* MAIN BLURB */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 pb-12">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft">
          <div className="max-w-3xl mx-auto">
            <p className="text-foreground/80 leading-relaxed text-pretty">
              Beyond private healing and retreat facilitation, I collaborate with hotels, wellness destinations, luxury hospitality brands and retreat spaces to design immersive guest experiences that inspire connection, restoration and lasting wellbeing.
            </p>
            <p className="mt-5 text-foreground/80 leading-relaxed text-pretty">
              Drawing on over 20 years of experience in energy medicine, sound healing, yoga and transformational facilitation, combined with 15 years in event production and 15 years in the film industry as a professional stunt performer, I bring together creativity, operational thinking and a deep understanding of human experience to create experiences that are both memorable and meaningful.
            </p>
            <p className="mt-5 text-foreground/80 leading-relaxed text-pretty">
              From signature sound journeys and immersive wellness programming to guest journey design, staff training and experience development, my work helps organisations create distinctive offerings that deepen guest connection while remaining true to their brand.
            </p>
            <p className="mt-5 text-foreground/80 leading-relaxed text-pretty">
              I have had the privilege of facilitating at internationally recognised retreat centres and wellness destinations, designing experiences that blend sound, breath, movement, ritual and energy medicine into thoughtfully curated journeys that support relaxation, emotional wellbeing and human connection.
            </p>
            <p className="mt-5 text-foreground/80 leading-relaxed text-pretty">
              Whether developing a bespoke wellness concept, consulting on guest experience, or creating a signature programme for a luxury destination, my intention is always the same:
            </p>
            <p className="mt-6 text-center font-display text-2xl sm:text-3xl text-balance">
              To create experiences that people don't simply remember — they <span className="italic text-primary">feel</span>.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/80">What I offer</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl text-balance">Services</h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Tailored wellness design and delivery for hospitality, retreats, corporate and luxury experiences.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service}
              className="rounded-2xl bg-iridescent-box p-6 shadow-soft border border-border/50 flex items-start gap-3"
            >
              <Sparkles className="h-5 w-5 text-primary/80 flex-shrink-0 mt-0.5" />
              <span className="font-medium text-foreground/90">{service}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 sm:px-8 py-16 pb-24">
        <div className="rounded-[2rem] border border-border bg-card p-8 sm:p-12 shadow-soft text-center">
          <Triangle className="mx-auto h-6 w-6 text-primary animate-shimmer" />
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-balance">
            Let's design something extraordinary together.
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty max-w-xl mx-auto">
            Share your vision, venue and guests, and I'll create a bespoke wellness experience that feels seamless, soulful and unforgettable.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:info@iridescencehealing.com?subject=Wellness%20Experience%20Design%20Inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90 transition-opacity"
            >
              Email me about your project <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-7 py-3.5 text-sm font-medium hover:bg-accent transition-colors"
            >
              Go to contact form
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
