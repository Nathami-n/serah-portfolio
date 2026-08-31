import { GALLERY, OG_PHOTO } from "~/content/gallery";
import manifest from "~/content/image-manifest.json";
import { PRESS, TRACKS, watchUrl } from "~/content/music";
import { SITE, SOCIAL_LINKS, YOUTUBE_CHANNEL } from "~/content/site";

/**
 * Per-page metadata: title, description, canonical, Open Graph, Twitter card.
 *
 * WHY THIS MATTERS MORE HERE THAN ON MOST SITES
 * ---------------------------------------------
 * The old site had ONE global <meta name="description"> in index.html and
 * nothing else. No per-page titles, no Open Graph, no Twitter card. Every page
 * shared one description, and sharing any link on WhatsApp, Instagram or
 * Facebook produced a bare URL with no image and no title.
 *
 * For a musician that is the single most costly omission after image weight,
 * because her links are shared socially far more than they are searched. A
 * WhatsApp message with a rich card gets opened; a naked URL does not.
 *
 * This needs SSR to work at all: crawlers and link unfurlers read the HTML
 * response and do not run the client JavaScript an SPA needs to set tags.
 */

type ManifestEntry = { width: number | null; height: number | null };
const IMAGES = manifest as Record<string, ManifestEntry>;

/** The width we serve to unfurlers. 1280 clears every platform's minimum. */
const OG_WIDTH = 1280;

/**
 * Height of the OG image at OG_WIDTH, derived from the real aspect ratio.
 *
 * Declaring width and height lets a platform reserve the right space before the
 * image downloads, which is the difference between a card that renders
 * instantly and one that pops in. Getting the height WRONG is worse than
 * omitting it, so it is computed rather than hardcoded.
 */
function ogImageFor(slug: string) {
  const entry = IMAGES[slug];
  const width = entry?.width ?? null;
  const height = entry?.height ?? null;
  const scaledHeight =
    width && height ? Math.round((height / width) * OG_WIDTH) : null;

  const photo = GALLERY.find((p) => p.slug === slug);

  return {
    url: `${SITE.url}/img/${slug}-${OG_WIDTH}.jpg`,
    width: OG_WIDTH,
    height: scaledHeight,
    /*
     * Real alt text on the share card. Screen-reader users encounter these in
     * social feeds, where the card IS the content.
     */
    alt: photo?.alt ?? `${SITE.name}, ${SITE.tagline}`,
  };
}

interface PageMetaOptions {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/music". Used for the canonical URL. */
  path: string;
  /** Manifest slug for the share image. Defaults to the site-wide OG photo. */
  image?: string;
  /** Set for pages that should not be indexed. Rare. */
  noIndex?: boolean;
}

export function pageMeta({
  title,
  description,
  path,
  image = OG_PHOTO,
  noIndex = false,
}: PageMetaOptions) {
  const url = `${SITE.url}${path === "/" ? "/" : path}`;
  const og = ogImageFor(image);
  const fullTitle = `${title} | ${SITE.name}`;

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },

    /*
     * Explicit robots directives. `max-image-preview:large` is what allows a
     * full-size image in Google results rather than a thumbnail, which matters
     * for an artist. The others let Google use full text and video previews.
     */
    {
      name: "robots",
      content: noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },

    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: og.url },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: String(og.width) },
    ...(og.height
      ? [{ property: "og:image:height", content: String(og.height) }]
      : []),
    { property: "og:image:alt", content: og.alt },
    { property: "og:locale", content: "en_KE" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: og.url },
    { name: "twitter:image:alt", content: og.alt },

    /*
     * A generic author/creator hint. Not a ranking factor, but several
     * aggregators and readers surface it.
     */
    { name: "author", content: SITE.fullName },
  ];
}

/**
 * Schema.org structured data.
 *
 * This is what lets Google show a knowledge panel with her name, image and
 * links rather than a plain blue link, and what ties the scattered YouTube /
 * Instagram / TikTok profiles to this site as ONE entity (that is what `sameAs`
 * does).
 *
 * Modelled as a MusicGroup with an embedded Person, which is the correct shape
 * for a solo artist: the MusicGroup is the act, the Person is her. Every claim
 * below is verifiable from the site itself or from the linked press coverage.
 * Structured data that contradicts the visible page is a manual-action risk, so
 * nothing here is invented.
 */
export function musicGroupSchema() {
  const og = ogImageFor(OG_PHOTO);

  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": `${SITE.url}/#artist`,
    name: SITE.name,
    alternateName: SITE.fullName,
    description: SITE.description,
    url: SITE.url,
    image: og.url,
    genre: ["Rhumba", "Zilizopendwa", "African classical", "Benga"],
    email: SITE.email,
    foundingLocation: {
      "@type": "Place",
      name: "Nairobi, Kenya",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    // Every profile we know of, which is how search engines merge the identity.
    sameAs: SOCIAL_LINKS.map((s) => s.href),
    member: {
      "@type": "Person",
      name: SITE.fullName,
      alternateName: SITE.name,
      // Both of these are stated on the About page, so they are consistent.
      jobTitle: ["Musician", "Medical doctor"],
    },
    award: "Honorary Award, Music Industry",
    /*
     * The catalogue, as MusicRecording entries. This is what can produce a rich
     * result listing her songs, and it gives search engines a machine-readable
     * link between each cover and the video it lives on.
     */
    track: TRACKS.map((t) => ({
      "@type": "MusicRecording",
      name: t.title,
      url: watchUrl(t.id),
      ...(t.originalArtist
        ? {
            // The cover relationship, stated properly rather than implied.
            recordingOf: {
              "@type": "MusicComposition",
              name: t.title,
              composer: { "@type": "Person", name: t.originalArtist },
            },
          }
        : {}),
    })),
    subjectOf: PRESS.map((p) => ({
      "@type": "NewsArticle",
      headline: p.title,
      url: p.href,
      publisher: { "@type": "Organization", name: p.outlet },
    })),
  };
}

/**
 * WebSite node, carrying the site name for the search-result title and
 * declaring the publisher relationship to the artist entity above.
 */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en-KE",
    publisher: { "@id": `${SITE.url}/#artist` },
  };
}

/**
 * Breadcrumbs for a non-home page.
 *
 * Google renders these in place of the raw URL in results, so "Serah Ke > Music"
 * appears instead of "serahkemusic.co.ke/music".
 */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: SITE.name, path: "/" },
      ...items,
    ].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path === "/" ? "/" : item.path}`,
    })),
  };
}

/** The YouTube channel, for the ProfilePage link on the music page. */
export const CHANNEL_URL = YOUTUBE_CHANNEL;
