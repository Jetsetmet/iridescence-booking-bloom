import { createFileRoute, Link } from "@tanstack/react-router";
import packagesImg from "@/assets/moon.jpg";
import { ArrowRight, Triangle } from "lucide-react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Session Packages — In Person & Virtual" },
      { name: "description", content: "Bundled healing session packages with a 10% discount — held in person in uptown New Orleans or virtually from anywhere." },
      { property: "og:title", content: "Session Packages — Iridescence Healing" },
      { property: "og:description", content: "Commit to your practice with discounted bundles." },
      { property: "og:image", content: packagesImg },
    ],
  }),
  component: Packages,
});

const tiers = [
  { label: "Four 60-min Sessions", note: "10% discount", price: "$468" },
  { label: "Four 90-min Sessions", note: "10% discount", price: "$612" },
  { label: "Custom Package", note: "tailored to your needs", price: "Varies" },
];

function Packages() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden shadow-card">
          <img src={packagesImg} alt="Healing session packages" className="w-full h-auto md:h-[420px] object-cover" width={1280} height={960} />
        </div>
        <div>
          <div className="flex items-center gap-2 text-primary">
            <Triangle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Devotional path</span>
          </div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">Session Packages</h1>
          <p className="mt-4 text-muted-foreground text-pretty">
            Lasting change asks for return. These bundled packages — Reiki, breath, sound or a blend —
            invite you to commit to your practice over time. Held in person in uptown New Orleans or
            virtually from anywhere in the world.
          </p>
          <Link
            to="/book"
            search={{ offering: "Package" }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft"
          >
            Book a package <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 sm:px-8 pb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Pricing</p>
        <h2 className="mt-2 font-display text-3xl">Package options</h2>
        <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card/50">
          {tiers.map((t, i) => (
            <li key={i} className="flex items-baseline justify-between gap-4 px-5 py-4">
              <div>
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.note}</div>
              </div>
              {t.price === "Varies" ? (
                <Link to="/book" search={{ offering: t.label }} className="text-sm font-display text-primary whitespace-nowrap hover:underline">{t.price}</Link>
              ) : (
                <div className="text-sm font-display text-primary whitespace-nowrap">{t.price}</div>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link to="/offerings" className="text-sm text-muted-foreground hover:text-foreground">← All offerings</Link>
        </div>
      </section>
    </>
  );
}