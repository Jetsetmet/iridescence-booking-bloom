import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Instagram, Calendar } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Mehtap - Reiki & Sound Healing in New Orleans" },
      { name: "description", content: "Contact Mehtap for Reiki, sound healing, cacao ceremonies, breathwork, yoga and private group sessions in uptown New Orleans." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto max-w-3xl px-5 sm:px-8 py-20 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Reach out</p>
      <h1 className="mt-2 font-display text-5xl sm:text-6xl text-balance">Let's connect.</h1>
      <p className="mt-4 text-muted-foreground text-pretty">
        Questions, custom sessions, or private group ceremonies — I'd love to hear what brought you here.
      </p>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <a href="https://book.squareup.com/appointments/375ed9f0-ab7e-432c-a72d-65545ae811a5/location/8Z003QJZ46SBG/services?rwg_token=AFd1xnG8opsnB8WvxAc5Gu92w-ep4LAQyNqcaVA4S02XPh2Ls2RPId34yddJHpbz57l-ZkUuMTWlbLQRyenGhZi2TDn3gUVGPg%3D%3D" target="_blank" rel="noreferrer" className="rounded-3xl border border-border bg-card p-6 shadow-card hover:shadow-glow transition-shadow">
          <Calendar className="h-5 w-5 mx-auto text-primary" />
          <div className="mt-3 font-medium text-sm">Book a session</div>
          <div className="mt-1 text-xs text-muted-foreground">Square Appointments</div>
        </a>
        <a href="mailto:hello@iridescencehealing.com" className="rounded-3xl border border-border bg-card p-6 shadow-card hover:shadow-glow transition-shadow">
          <Mail className="h-5 w-5 mx-auto text-primary" />
          <div className="mt-3 font-medium text-sm">Email</div>
          <div className="mt-1 text-xs text-muted-foreground break-all">hello@iridescencehealing.com</div>
        </a>
        <a href="https://instagram.com/iridescence_healing" target="_blank" rel="noreferrer" className="rounded-3xl border border-border bg-card p-6 shadow-card hover:shadow-glow transition-shadow">
          <Instagram className="h-5 w-5 mx-auto text-primary" />
          <div className="mt-3 font-medium text-sm">Instagram</div>
          <div className="mt-1 text-xs text-muted-foreground">@iridescence_healing</div>
        </a>
        <a href="https://instagram.com/jetsetmet" target="_blank" rel="noreferrer" className="rounded-3xl border border-border bg-card p-6 shadow-card hover:shadow-glow transition-shadow">
          <Instagram className="h-5 w-5 mx-auto text-primary" />
          <div className="mt-3 font-medium text-sm">Instagram</div>
          <div className="mt-1 text-xs text-muted-foreground">@jetsetmet</div>
        </a>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <MapPin className="h-5 w-5 mx-auto text-primary" />
          <div className="mt-3 font-medium text-sm">Location</div>
          <div className="mt-1 text-xs text-muted-foreground">Uptown New Orleans, LA</div>
        </div>
      </div>
    </section>
  );
}
