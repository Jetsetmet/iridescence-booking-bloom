import { createFileRoute, Link } from "@tanstack/react-router";
import { Triangle } from "lucide-react";

export const Route = createFileRoute("/thanks")({
  head: () => ({ meta: [{ title: "Thank you — Iridescence Healing" }, { name: "robots", content: "noindex" }] }),
  component: Thanks,
});

function Thanks() {
  return (
    <section className="mx-auto max-w-2xl px-5 sm:px-8 py-24 text-center">
      <div className="inline-grid h-16 w-16 place-items-center rounded-full bg-iridescent shadow-glow animate-shimmer">
        <Triangle className="h-6 w-6 text-foreground" />
      </div>
      <h1 className="mt-6 font-display text-5xl text-balance">Received with love.</h1>
      <p className="mt-4 text-muted-foreground text-pretty">
        Thank you for reaching out. Met personally responds to every message — usually within 24 hours.
        In the meantime, take a slow breath. You're already on the path.
      </p>
      <div className="mt-8 flex justify-center gap-3 flex-wrap">
        <Link to="/" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">Back to home</Link>
        <Link to="/events" className="rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-medium hover:bg-accent">See upcoming events</Link>
      </div>
    </section>
  );
}
