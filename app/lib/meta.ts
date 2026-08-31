import { OG_PHOTO } from "~/content/gallery";
import { SITE } from "~/content/site";

/**
 * Per-page metadata, including Open Graph and Twitter cards.
 *
 * The old site had ONE global <meta name="description"> in index.html and
 * nothing else: no per-page titles, no Open Graph, no Twitter card. Every page
 * shared one description, and sharing any link on WhatsApp, Instagram or
 * Facebook produced a bare URL with no image and no title. For a musician,
 * whose links are shared socially far more than they are searched, that is the
 * single most costly omission on the old site after the image weight.
 *
 * This needs SSR to work at all: crawlers and link unfurlers read the HTML
 * response, and do not run the client JavaScript that an SPA needs to set tags.
 */

interface PageMetaOptions {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/music". Used for the canonical URL. */
  path: string;
  /** Manifest slug for the share image. Defaults to the site-wide OG photo. */
  image?: string;
}

export function pageMeta({
  title,
  description,
  path,
  image = OG_PHOTO,
}: PageMetaOptions) {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  /*
   * Absolute URL, and a JPEG rather than AVIF/WebP. Several unfurlers (older
   * WhatsApp builds among them) still do not decode AVIF, and a card that
   * fails to render is worse than a slightly larger one. 1280 is comfortably
   * above the 600px minimum the major platforms want.
   */
  const imageUrl = `${SITE.url}/img/${image}-1280.jpg`;
  const fullTitle = `${title} | ${SITE.name}`;

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },

    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: "1280" },
    { property: "og:locale", content: "en_KE" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];
}

/**
 * Schema.org structured data describing Serah as a MusicGroup.
 *
 * This is what lets Google show a knowledge panel with her name, image and
 * links rather than a plain blue link. `sameAs` is the property that ties the
 * scattered social profiles together into one recognised entity.
 */
export function musicGroupSchema(socials: readonly { href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: SITE.name,
    alternateName: SITE.fullName,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}/img/${OG_PHOTO}-1280.jpg`,
    genre: ["Rhumba", "Zilizopendwa", "African classical"],
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    sameAs: socials.map((s) => s.href),
  };
}
