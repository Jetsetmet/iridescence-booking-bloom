import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-xl">Iridescence Healing</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            A gentle return to your inner light. Reiki, sound, breath and ceremony
            in uptown New Orleans.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Link to="/about" className="text-muted-foreground hover:text-foreground">About Met</Link>
          <Link to="/offerings" className="text-muted-foreground hover:text-foreground">Offerings</Link>
          <Link to="/packages" className="text-muted-foreground hover:text-foreground">Packages</Link>
          <Link to="/retreats" className="text-muted-foreground hover:text-foreground">Retreats</Link>
          <Link to="/quiz" className="text-muted-foreground hover:text-foreground">Find Your Path</Link>
          <Link to="/events" className="text-muted-foreground hover:text-foreground">Events</Link>
          <Link to="/book" className="text-muted-foreground hover:text-foreground">Book a Session</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
        </div>
        <div className="text-sm space-y-2 text-muted-foreground">
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Uptown New Orleans, LA</div>
          <a href="mailto:met@iridescencehealing.com" className="flex items-center gap-2 hover:text-foreground">
            <Mail className="h-4 w-4" />
            <span>met@iridescencehealing.com</span>
          </a>
          <a href="https://instagram.com/iridescence_healing" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground">
            <Instagram className="h-4 w-4" /> @iridescence_healing
          </a>
          <a href="https://www.instagram.com/jetsetmet/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground">
            <Instagram className="h-4 w-4" /> @jetsetmet
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © 2026 Iridescence Healing · With love, Mehtap
      </div>
    </footer>
  );
}
