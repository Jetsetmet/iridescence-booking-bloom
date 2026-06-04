import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://iridescence-booking-bloom.lovable.app";
const paths = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/offerings", priority: "0.9" },
  { path: "/crystal-reiki", priority: "0.8" },
  { path: "/resonance-release", priority: "0.8" },
  { path: "/self-love-mentoring", priority: "0.8" },
  { path: "/cacao-ceremonies", priority: "0.8" },
  { path: "/breath-yoga", priority: "0.8" },
  { path: "/meditation", priority: "0.7" },
  { path: "/packages", priority: "0.7" },
  { path: "/retreats", priority: "0.7" },
  { path: "/reviews", priority: "0.6" },
  { path: "/quiz", priority: "0.9" },
  { path: "/book", priority: "1.0" },
  { path: "/events", priority: "0.8" },
  { path: "/contact", priority: "0.6" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = paths.map((e) => `  <url>
    <loc>${BASE_URL}${e.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
