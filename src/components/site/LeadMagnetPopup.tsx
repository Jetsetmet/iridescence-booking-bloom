import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/funnel.functions";
import { X, Triangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "ih_lead_popup_seen";

export function LeadMagnetPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const submit = useServerFn(submitLead);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 18000);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  function dismiss() {
    setOpen(false);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, "1");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await submit({ data: { email, name: name || undefined, source: "lead_magnet" } });
      setDone(true);
      if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, "1");
      toast.success("Check your inbox — your meditation is on the way ✨");
    } catch (err) {
      toast.error("Something went sideways — please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-md rounded-3xl bg-card p-8 shadow-glow border border-border">
        <button onClick={dismiss} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
        <div className="grid h-12 w-12 place-items-center rounded-full bg-iridescent mb-4 shadow-soft">
          <Triangle className="h-5 w-5 text-foreground" strokeWidth={1.5} />
        </div>
        {done ? (
          <>
            <h3 className="font-display text-2xl">It's on its way ✨</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Your free meditation and breathwork for the heart is ready below — and we've also sent the link to your inbox. Take a slow breath.
            </p>
            <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl border border-border">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/DZl8dguC3cE?rel=0"
                title="Heart-opening meditation with Met"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button onClick={dismiss} className="mt-4 w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
              Close
            </button>
          </>
        ) : (
          <>
            <h3 className="font-display text-2xl text-balance">A gift to begin — free meditation and breathwork for the heart</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              An 11-minute meditation and breathwork practice for the heart — for moments of grief, heartache or heaviness. Met holds you through every breath.
            </p>
            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name (optional)"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Send me the meditation
              </button>
              <p className="text-[11px] text-center text-muted-foreground">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
