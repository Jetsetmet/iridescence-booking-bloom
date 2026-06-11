import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendTestNotification } from "@/lib/admin-email.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/test-email")({
  head: () => ({
    meta: [
      { title: "Send Test Email | Iridescence Healing" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminTestEmail,
});

function AdminTestEmail() {
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const sendFn = useServerFn(sendTestNotification);

  async function trigger(template: "booking-notification" | "quiz-notification") {
    setStatus("sending");
    setMessage("");
    try {
      await sendFn({ data: { password, template } });
      setStatus("success");
      setMessage(
        `Queued ${template} → info@iridescencehealing.com. It should arrive within ~10 seconds. From should display as noreply@notify.iridescencehealing.com.`,
      );
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Failed to queue test email.");
    }
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsAuthed(true);
          }}
          className="w-full max-w-sm space-y-4"
        >
          <h1 className="font-display text-3xl text-foreground">Test Email</h1>
          <p className="text-sm text-muted-foreground">Enter the admin password to continue.</p>
          <div>
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Continue</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-xl space-y-6">
        <div>
          <h1 className="font-display text-3xl text-foreground">Send a test email</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sends a sample of the chosen template to{" "}
            <strong>info@iridescencehealing.com</strong> using the live email pipeline.
            Only works on the published site (the queue processor runs there).
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => trigger("booking-notification")}
              disabled={status === "sending"}
              className="flex-1"
            >
              {status === "sending" ? "Queuing…" : "Send booking test"}
            </Button>
            <Button
              onClick={() => trigger("quiz-notification")}
              disabled={status === "sending"}
              variant="secondary"
              className="flex-1"
            >
              {status === "sending" ? "Queuing…" : "Send quiz test"}
            </Button>
          </div>

          {status === "success" && (
            <p className="text-sm text-emerald-600">{message}</p>
          )}
          {status === "error" && (
            <p className="text-sm text-destructive">{message}</p>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Tip: check your inbox plus spam. If nothing arrives within a minute, the project may not be published yet.
        </p>
      </div>
    </div>
  );
}