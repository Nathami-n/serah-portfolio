import { SITE } from "~/content/site";

/**
 * robots.txt, served from a route rather than public/ so the sitemap URL stays
 * in sync with SITE.url instead of being hardcoded in two places.
 */
export function loader() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE.url}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
