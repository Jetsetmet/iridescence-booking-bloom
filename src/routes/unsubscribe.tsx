import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Triangle } from "lucide-react";

export const Route = createFileRoute("/unsubscribe")({
  head: () => ({
    meta: [
      { title: "Unsubscribe — Iridescence Healing" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Unsubscribe,
});

type State =
  | { kind: "loading" }
  | { kind: "ready" }
  | { kind: "already" }
  | { kind: "invalid" }
  | { kind: "done" }
  | { kind: "error"; msg: string };

function Unsubscribe() {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token");
    if (!t) {
      setState({ kind: "invalid" });
      return;
    }
    setToken(t);
    fetch(`/email/unsubscribe?token=${encodeURIComponent(t)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) setState({ kind: "ready" });
        else if (data.reason === "already_unsubscribed") setState({ kind: "already" });
        else setState({ kind: "invalid" });
      })
      .catch(() => setState({ kind: "error", msg: "Network error" }));
  }, []);

  async function confirm() {
    if (!token) return;
    setState({ kind: "loading" });
    try {
      const r = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await r.json();
      if (data.success) setState({ kind: "done" });
      else if (data.reason === "already_unsubscribed") setState({ kind: "already" });
      else setState({ kind: "error", msg: data.error || "Something went wrong" });
    } catch {
      setState({ kind: "error", msg: "Network error" });
    }
  }

  return (
    <section className="mx-auto max-w-xl px-5 sm:px-8 py-24 text-center">
      <div className="inline-grid h-16 w-16 place-items-center rounded-full bg-iridescent shadow-glow">
        <Triangle className="h-6 w-6 text-foreground" />
      </div>
      {state.kind === "loading" && (
        <p className="mt-8 text-muted-foreground">One moment…</p>
      )}
      {state.kind === "ready" && (
        <>
          <h1 className="mt-6 font-display text-4xl">Unsubscribe?</h1>
          <p className="mt-4 text-muted-foreground">
            We'll stop sending you emails from Iridescence Healing.
          </p>
          <button
            onClick={confirm}
            className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Confirm unsubscribe
          </button>
        </>
      )}
      {state.kind === "already" && (
        <>
          <h1 className="mt-6 font-display text-4xl">Already unsubscribed</h1>
          <p className="mt-4 text-muted-foreground">You're no longer on the list.</p>
        </>
      )}
      {state.kind === "done" && (
        <>
          <h1 className="mt-6 font-display text-4xl">Unsubscribed ✨</h1>
          <p className="mt-4 text-muted-foreground">
            You won't receive further emails. With love.
          </p>
        </>
      )}
      {state.kind === "invalid" && (
        <>
          <h1 className="mt-6 font-display text-4xl">Invalid link</h1>
          <p className="mt-4 text-muted-foreground">
            This unsubscribe link is invalid or has expired.
          </p>
        </>
      )}
      {state.kind === "error" && (
        <>
          <h1 className="mt-6 font-display text-4xl">Something went sideways</h1>
          <p className="mt-4 text-muted-foreground">{state.msg}</p>
        </>
      )}
    </section>
  );
}