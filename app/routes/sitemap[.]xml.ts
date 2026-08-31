import { SITE } from "~/content/site";

/**
 * sitemap.xml.
 *
 * Derived from one list rather than hand-maintained, so a new page cannot be
 * added to the site and silently left out of the sitemap.
 *
 * The legacy redirect routes (/albums, /contacts) are deliberately absent: a
 * sitemap should list canonical destinations, not URLs that 301 elsewhere.
 */
const PAGES = [
  { path: "/", priority: "1.0" },
  { path: "/music", priority: "0.9" },
  { path: "/about", priority: "0.8" },
  { path: "/gallery", priority: "0.7" },
  { path: "/events", priority: "0.6" },
  { path: "/shop", priority: "0.4" },
] as const;

export function loader() {
  const urls = PAGES.map(
    ({ path, priority }) =>
      `  <url>\n` +
      `    <loc>${SITE.url}${path === "/" ? "/" : path}</loc>\n` +
      `    <priority>${priority}</priority>\n` +
      `  </url>`,
  ).join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
