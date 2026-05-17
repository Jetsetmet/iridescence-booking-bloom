import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/offerings", label: "Offerings" },
  { to: "/quiz", label: "Find Your Path" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Iridescence Healing"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover shadow-glow group-hover:scale-105 transition-transform mix-blend-multiply"
          />
          <span className="font-display text-lg tracking-wide">Iridescence Healing</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/book"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:opacity-90 transition-opacity"
          >
            Book a Session
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <nav className="flex flex-col p-5 gap-3 text-base">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground/80"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground"
            >
              Book a Session
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
