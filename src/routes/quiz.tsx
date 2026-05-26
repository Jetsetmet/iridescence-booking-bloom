import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitQuiz } from "@/lib/funnel.functions";
import { ArrowRight, ArrowLeft, Loader2, Triangle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Find Your Path — Iridescence Healing Quiz" },
      { name: "description", content: "A 60-second quiz to discover which healing practice is calling you — Reiki, sound, cacao, breathwork or mentoring." },
    ],
  }),
  component: Quiz,
});

type Q = { id: string; question: string; options: { label: string; weight: Record<string, number> }[] };

const questions: Q[] = [
  {
    id: "intention",
    question: "What's calling you most right now?",
    options: [
      { label: "I'm ready to clear heavy, stuck energy", weight: { Reiki: 3, "Sound Bath": 1 } },
      { label: "I want to drop into deep stillness", weight: { "Sound Bath": 3, Breathwork: 2 } },
      { label: "I'm ready to open my heart again", weight: { "Cacao Ceremony": 3, Mentoring: 1 } },
      { label: "I want to release stored emotion", weight: { Breathwork: 3, Reiki: 1 } },
      { label: "I want long-term transformation", weight: { Mentoring: 3 } },
      { label: "I want to step away and immerse fully", weight: { Retreat: 3 } },
    ],
  },
  {
    id: "format",
    question: "How do you most want to be held?",
    options: [
      { label: "Quietly, just you and me", weight: { Reiki: 2, Breathwork: 2, Mentoring: 2 } },
      { label: "In a small circle of others", weight: { "Sound Bath": 2, "Cacao Ceremony": 3 } },
      { label: "Fully held away from daily life", weight: { Retreat: 3 } },
      { label: "Either — I trust the flow", weight: { Reiki: 1, "Sound Bath": 1, "Cacao Ceremony": 1, Breathwork: 1 } },
    ],
  },
  {
    id: "body",
    question: "Where do you feel it most in your body?",
    options: [
      { label: "Chest / heart — tightness or grief", weight: { "Cacao Ceremony": 3, Reiki: 2 } },
      { label: "Head / mind — racing, can't slow down", weight: { "Sound Bath": 3, Breathwork: 2 } },
      { label: "Belly / hips — old emotion sitting there", weight: { Breathwork: 3, Reiki: 1 } },
      { label: "Everywhere — I need full reset", weight: { Retreat: 2, Reiki: 2, Mentoring: 1 } },
    ],
  },
  {
    id: "pace",
    question: "How much time do you have to give yourself?",
    options: [
      { label: "An hour-ish — I need this soon", weight: { Reiki: 2, "Sound Bath": 2, Breathwork: 2 } },
      { label: "An afternoon — I want to go deeper", weight: { "Cacao Ceremony": 3 } },
      { label: "I'm ready for a longer journey", weight: { Mentoring: 3 } },
      { label: "A few days fully away", weight: { Retreat: 3 } },
    ],
  },
  {
    id: "experience",
    question: "Is this familiar work for you?",
    options: [
      { label: "Brand new — I'm gently curious", weight: { "Sound Bath": 2, Reiki: 2 } },
      { label: "I've dabbled, ready to deepen", weight: { "Cacao Ceremony": 2, Breathwork: 2 } },
      { label: "I'm on a real path now", weight: { Mentoring: 2, Reiki: 1, Retreat: 1 } },
    ],
  },
];

function tally(answers: Record<string, number>) {
  const scores: Record<string, number> = { Reiki: 0, "Sound Bath": 0, "Cacao Ceremony": 0, Breathwork: 0, Mentoring: 0, Retreat: 0 };
  questions.forEach((q) => {
    const idx = answers[q.id];
    if (idx === undefined) return;
    const opt = q.options[idx];
    for (const [k, v] of Object.entries(opt.weight)) scores[k] = (scores[k] || 0) + v;
  });
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0][0];
}

const blurbs: Record<string, string> = {
  Reiki: "A one-on-one Reiki session — gentle, deep and clearing. This is where you let go.",
  "Sound Bath": "A sound bath — bowls, gongs and a soft place to land. Quiet the mind, drop in.",
  "Cacao Ceremony": "A cacao ceremony — heart-opening medicine held in sacred circle.",
  Breathwork: "Guided breathwork — to move what's been stored and meet yourself underneath.",
  Mentoring: "Self-love mentoring — a four-session journey to come home to your wholeness.",
  Retreat: "A retreat — full immersion away from daily life, woven with sound, breath, cacao and ceremony.",
};

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = useServerFn(submitQuiz);
  const navigate = useNavigate();

  const total = questions.length;
  const q = questions[step];
  const progress = recommendation ? 100 : Math.round(((step) / total) * 100);

  function choose(idx: number) {
    const next = { ...answers, [q.id]: idx };
    setAnswers(next);
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setRecommendation(tally(next));
    }
  }

  async function onSaveAndBook(e: React.FormEvent) {
    e.preventDefault();
    if (!recommendation) return;
    setLoading(true);
    try {
      const stringAnswers: Record<string, string> = {};
      for (const q of questions) {
        const idx = answers[q.id];
        if (idx !== undefined) stringAnswers[q.id] = q.options[idx].label;
      }
      await submit({
        data: {
          email: email || undefined,
          name: name || undefined,
          answers: stringAnswers,
          recommended_offering: recommendation,
        },
      });
      toast.success("Saved — taking you to booking ✨");
      navigate({ to: "/book", search: { offering: recommendation } });
    } catch {
      toast.error("Couldn't save — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-5 sm:px-8 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Find your path</p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl text-balance">
        Five gentle questions.
      </h1>
      <p className="mt-3 text-muted-foreground">Trust the first answer that softens.</p>

      <div className="mt-8 h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-iridescent transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card shadow-card p-7 sm:p-10">
        {!recommendation ? (
          <div key={q.id} className="animate-fade-up">
            <div className="text-xs text-muted-foreground">Question {step + 1} of {total}</div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl text-balance">{q.question}</h2>
            <div className="mt-6 space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className="w-full text-left rounded-2xl border border-border bg-background/60 px-5 py-4 hover:border-primary hover:bg-accent/40 transition-colors flex items-center justify-between gap-4"
                >
                  <span className="text-sm">{opt.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
          </div>
        ) : (
          <div className="animate-fade-up text-center">
            <Triangle className="mx-auto h-7 w-7 text-primary animate-shimmer" />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary/80">Your path</p>
            <h2 className="mt-2 font-display text-4xl bg-iridescent bg-clip-text text-transparent">
              {recommendation}
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">{blurbs[recommendation]}</p>

            <form onSubmit={onSaveAndBook} className="mt-8 space-y-3 text-left">
              <p className="text-sm font-medium">Save your result & book your session</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com (optional)"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Continue to booking <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
