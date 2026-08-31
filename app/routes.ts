import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("music", "routes/music.tsx"),
  route("about", "routes/about.tsx"),
  route("gallery", "routes/gallery.tsx"),
  route("events", "routes/events.tsx"),
  route("shop", "routes/shop.tsx"),

  /*
   * Legacy redirects. The old site used /albums and /contacts, and those URLs
   * are in press articles and shared links that we do not control. Breaking
   * them would lose real traffic, so they 301 to the new paths.
   */
  route("albums", "routes/albums.tsx"),
  route("contacts", "routes/contacts.tsx"),

  // Infrastructure, not pages.
  route("robots.txt", "routes/robots[.]txt.ts"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
] satisfies RouteConfig;
