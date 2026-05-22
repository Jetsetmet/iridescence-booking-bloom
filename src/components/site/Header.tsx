import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpg";

type NavItem =
  | { to: string; label: string; children?: never }
  | { label: string; children: ReadonlyArray<{ to: string; label: string }>; to?: never };

const nav: ReadonlyArray<NavItem> = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  {
    label: "Offerings",
    children: [
      { to: "/offerings", label: "All Offerings" },
      { to: "/crystal-reiki", label: "Crystal Reiki & Sound" },
      { to: "/sound-baths", label: "Sound Baths" },
      { to: "/cacao-ceremonies", label: "Cacao Ceremonies" },
      { to: "/breath-yoga", label: "Breath & Yoga" },
      { to: "/self-love-mentoring", label: "Mentoring" },
      { to: "/packages", label: "Session Packages" },
    ],
  },
  { to: "/retreats", label: "Retreats" },
  { to: "/events", label: "Events" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

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
          {nav.map((n) =>
            n.children ? (
              <div key={n.label} className="relative group">
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 transition-colors ${
                    n.label === "Offerings"
                      ? "text-purple-600 hover:text-purple-700 font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-opacity">
                  <div className="min-w-[12rem] rounded-2xl border border-border bg-background/95 backdrop-blur shadow-soft p-2">
                    {n.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className="block rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-foreground transition-colors"
                        activeProps={{ className: "bg-accent text-foreground font-medium" }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={n.to}
                to={n.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            )
          )}
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
            {nav.map((n) =>
              n.children ? (
                <div key={n.label} className="py-1">
                  <div className={`py-1 text-xs uppercase tracking-[0.2em] ${
                    n.label === "Offerings" ? "text-purple-600 font-medium" : "text-muted-foreground"
                  }`}>
                    {n.label}
                  </div>
                  <div className="flex flex-col pl-3">
                    {n.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        onClick={() => setOpen(false)}
                        className="py-2 text-foreground/80"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-2 text-foreground/80"
                >
                  {n.label}
                </Link>
              )
            )}
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
