import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendNewsletter } from "@/lib/newsletter.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/newsletter")({
  head: () => ({
    meta: [
      { title: "Compose Newsletter | Iridescence Healing" },
      { name: "description", content: "Send a newsletter to your Mailchimp audience." },
    ],
  }),
  component: AdminNewsletter,
});

function AdminNewsletter() {
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [subject, setSubject] = useState("");
  const [preview, setPreview] = useState("");
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [ctaText, setCtaText] = useState("See upcoming events");
  const [ctaUrl, setCtaUrl] = useState("/events");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const sendFn = useServerFn(sendNewsletter);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple check — server will validate properly on send
    setIsAuthed(true);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const fullCtaUrl = ctaUrl.startsWith("http")
        ? ctaUrl
        : `https://project--deb780b1-75ae-489c-aa24-abec8fc6ac34.lovable.app${ctaUrl}`;

      const result = await sendFn({
        data: {
          password,
          subjectLine: subject,
          previewText: preview,
          headline: headline || undefined,
          bodyHtml: body,
          ctaText: ctaText || undefined,
          ctaUrl: fullCtaUrl,
          imageUrl: imageUrl || undefined,
        },
      });
      setStatus("success");
      setMessage(`Newsletter sent! Campaign ID: ${result.campaignId}`);
    } catch (err: any) {
      console.error("Send failed:", err);
      setStatus("error");
      setMessage(err?.message || "Failed to send newsletter.");
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="font-display text-3xl text-foreground">Newsletter</h1>
          <p className="text-sm text-muted-foreground">Enter the admin password to compose.</p>
          <div>
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full">Enter</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Admin</p>
        <h1 className="mt-2 font-display text-4xl text-foreground">Compose newsletter</h1>
        <p className="mt-2 text-muted-foreground">Write once, reach everyone in your Mailchimp audience.</p>

        <form onSubmit={handleSend} className="mt-8 space-y-6">
          <div>
            <Label htmlFor="subject">Subject line</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. June · circles, ceremonies & quiet moments"
              required
            />
          </div>

          <div>
            <Label htmlFor="preview">Preview text</Label>
            <Input
              id="preview"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
              placeholder="What shows in the inbox preview..."
            />
          </div>

          <div>
            <Label htmlFor="headline">Headline (optional)</Label>
            <Input
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Defaults to a warm monthly greeting"
            />
          </div>

          <div>
            <Label htmlFor="body">Body (HTML)</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="<p>Your message here...</p><p>Use simple HTML tags.</p>"
              rows={8}
              required
            />
            <p className="mt-1 text-xs text-muted-foreground">Supports basic HTML: paragraphs, links, lists, bold, etc.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ctaText">Button text</Label>
              <Input
                id="ctaText"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                placeholder="See upcoming events"
              />
            </div>
            <div>
              <Label htmlFor="ctaUrl">Button link</Label>
              <Input
                id="ctaUrl"
                value={ctaUrl}
                onChange={(e) => setCtaUrl(e.target.value)}
                placeholder="/events"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="imageUrl">Header image URL (optional)</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... or leave blank for no image"
            />
          </div>

          {status === "success" && (
            <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-green-800 text-sm">
              {message}
            </div>
          )}
          {status === "error" && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-800 text-sm">
              {message}
            </div>
          )}

          <Button
            type="submit"
            disabled={status === "sending"}
            className="w-full sm:w-auto"
          >
            {status === "sending" ? "Sending…" : "Send to audience"}
          </Button>
        </form>
      </div>
    </div>
  );
}
