import { ExternalLink, Mail, Download } from "lucide-react";

const MAILTO =
  "mailto:info@iridescencehealing.com,markvsno@gmail.com?subject=" +
  encodeURIComponent("Reignite & Restore Mexico Retreat");

const pricing = [
  ["King Suite (2 people)", "$4,600"],
  ["Twin Room", "$2,150"],
  ["Two Twin Room w/ Shared Bathroom (4 people)", "$1,950"],
  ["Bunk Room", "$1,800"],
];

const includes = [
  "Vinyasa Yoga, Kundalini Kriyas, meditation & breathwork",
  "Sound healing & sunset cacao ceremony",
  "Traditional Temazcal (sweat lodge) ceremony",
  "Sacred cenote excursion & healing rebirth ceremony",
  "Beach time, swimming, rest & journaling",
  "Christmas celebration dinner & White Elephant gift exchange",
  "Reflecting on 2026 & setting intentions for 2027",
  "Optional Reiki, massage & healing sessions",
];

const days = [
  ["Sun, Dec 20", "Arriving & Grounding", "Welcome circle, gentle movement & grounding meditation · welcome dinner"],
  ["Mon, Dec 21", "Reignite Your Inner Fire", "Kundalini, kriyas & breathwork · beach · sunset cacao, intention setting & sound healing"],
  ["Tue, Dec 22", "Flow & Release", "Vinyasa & meditation · optional healing sessions · traditional Temazcal ceremony"],
  ["Wed, Dec 23", "Waters of Renewal", "Yoga & breathwork · cenote excursion & rebirth ceremony · restorative yoga"],
  ["Thu, Dec 24", "Opening the Heart", "Heart-opening Kundalini · beach & rest · sunset breathwork & sound healing"],
  ["Fri, Dec 25", "Christmas by the Sea", "Christmas flow & gratitude meditation · beach · celebration dinner & gift exchange"],
  ["Sat, Dec 26", "Integration & New Beginnings", "Gentle yoga, meditation & closing circle · departures"],
];

export function MexicoRetreat() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
      <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 p-6 sm:p-10">
          <img
            src="/media/mexico-retreat-poster.png"
            alt="Reignite & Restore Christmas wellness retreat in Mexico poster"
            className="w-full rounded-2xl shadow-soft"
            loading="lazy"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">New · Holiday retreat</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl text-balance">Reignite & Restore</h2>
            <p className="mt-1 text-muted-foreground">
              December 20–26, 2026 ·{" "}
              <a
                href="https://www.casaom.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                Casa Om
              </a>
              , Puerto Morelos, Mexico
            </p>
            <p className="mt-4 text-sm text-pretty">
              Gift yourself the time to slow down, soak up the sunshine, wade in the Caribbean, swim in a
              magical cenote and simply be present. Let's close this year together with love, connection
              and a little magic.
            </p>

            <h3 className="mt-6 font-display text-2xl">Pricing per room</h3>
            <ul className="mt-2 divide-y divide-border text-sm">
              {pricing.map(([room, price]) => (
                <li key={room} className="flex justify-between gap-4 py-2">
                  <span>{room}</span>
                  <span className="font-medium">{price}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 font-display text-2xl">What we'll be doing</h3>
            <ul className="mt-2 space-y-1 text-sm list-disc pl-5">
              {includes.map((i) => <li key={i}>{i}</li>)}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={MAILTO} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:opacity-90">
                <Mail className="h-4 w-4" /> Email us to reserve
              </a>
              <a href="/reignite-restore-mexico-2026.pdf" download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-muted">
                <Download className="h-4 w-4" /> Download flyer (PDF)
              </a>
              <a href="https://www.casaom.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:bg-muted">
                <ExternalLink className="h-4 w-4" /> Visit Casa Om
              </a>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              info@iridescencehealing.com · markvsno@gmail.com
            </p>
          </div>
        </div>

        <div className="border-t border-border p-6 sm:p-10">
          <h3 className="font-display text-2xl">Approximate itinerary</h3>
          <p className="text-xs text-muted-foreground">Subject to change · all activities are invitations</p>
          <ol className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
            {days.map(([d, theme, desc]) => (
              <li key={d} className="rounded-2xl bg-muted/50 p-4">
                <div className="text-xs uppercase tracking-wider text-primary/80">{d}</div>
                <div className="font-medium">{theme}</div>
                <div className="mt-1 text-muted-foreground">{desc}</div>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t border-border p-6 sm:p-10">
          <h3 className="font-display text-2xl">Your Retreat Hosts</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-6 text-sm">
            <div className="flex gap-4">
              <img src="/media/host-met.jpg" alt="Met Salih with a singing bowl" className="h-24 w-24 rounded-full object-cover object-top shrink-0" loading="lazy" />
              <p><span className="font-medium">Met Salih</span> — a holistic wellness practitioner, yoga teacher and retreat facilitator with 19 years of experience, weaving together breathwork, sound healing, Reiki, movement and ancient healing traditions to nurture connection, self-discovery & transformation.</p>
            </div>
            <div className="flex gap-4">
              <img src="/media/host-mark.jpeg" alt="Mark Berger" className="h-24 w-24 rounded-full object-cover object-top shrink-0" loading="lazy" />
              <p><span className="font-medium">Mark Berger</span> — a wellness leader, yoga teacher, athlete, author, retreat leader and storyteller passionate about helping people live healthier, happier and more purposeful lives through movement, spirituality, travel and daily practice.</p>
            </div>
          </div>
          <p className="mt-6 font-display italic text-lg">With love, Met & Mark</p>
        </div>
      </div>
    </section>
  );
}
