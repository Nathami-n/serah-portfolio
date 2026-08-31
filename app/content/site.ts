/**
 * Single source of truth for site-wide constants.
 *
 * ALL user-facing copy lives in app/content/. Never hardcode copy in a
 * component. Same rule as the CitaTech landing page, and for the same reason:
 * copy about a real person needs one place to review and correct.
 *
 * ---------------------------------------------------------------------------
 * VERIFY BEFORE LAUNCH
 * ---------------------------------------------------------------------------
 * Items marked `VERIFY:` were carried over from the previous site, which was
 * last meaningfully updated years ago. They describe a real person, so a stale
 * claim here is not a style problem, it is a factual error on her public page.
 * Confirm each with Serah, then delete the marker.
 */

export const SITE = {
  name: "Serah Ke",
  /** Her legal name, as engraved on the honorary award trophy. */
  fullName: "Serah Nyaboke",
  tagline: "Kenyan Rhumba and Zilizopendwa",
  description:
    "Serah Ke sings Rhumba and Zilizopendwa, the African classics, with a voice built for them. Covers of Franco, Mpongo Love, Les Wanyika and the Maroon Commandos.",
  email: "serahkemusic@gmail.com",
  location: "Nairobi, Kenya",

  /*
   * Bookings run through WhatsApp, which is how they actually happen in Kenya.
   *
   * Stored in INTERNATIONAL format, digits only, no + and no spaces, because
   * that is what wa.me requires. The number was supplied as 0771642266, the
   * local Kenyan form; the leading 0 is a domestic trunk prefix and is replaced
   * by the 254 country code rather than kept. A wa.me link with the 0 left in
   * resolves to no account and fails silently, which is the worst possible
   * failure mode for the site's primary call to action.
   */
  whatsapp: "254771642266",

  /** Prefilled so an enquiry arrives with context instead of a bare "hi". */
  whatsappMessage: "Hi Serah, I'd like to talk about a booking.",

  /*
   * VERIFY: the previous site had no custom domain configured beyond Vercel.
   * Needed for canonical URLs, the sitemap and Open Graph tags, all of which
   * require absolute URLs.
   */
  url: "https://serahke.com",
} as const;

/** The WhatsApp deep link, prefilled. Works on mobile and WhatsApp Web. */
export const whatsappLink = () =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

/*
 * Navigation, defined ONCE.
 *
 * The old site hardcoded these six links in four separate JSX blocks inside a
 * single 248-line header component: a small nav, a small dropdown, a large nav
 * and a large dropdown. They had already drifted apart, shipping two dead
 * links (`/contact` where the route was `/contacts`, and `/Albums` with a
 * capital A). One array, rendered everywhere, makes that class of bug
 * impossible.
 */
export const NAV_LINKS = [
  { label: "Music", href: "/music" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
] as const;

/*
 * Her YouTube channel. Confirmed by Serah's team, note the underscore and the
 * capital K: @serah_Ke, not @serahke.
 *
 * The catalogue in content/music.ts is a curated selection, NOT everything she
 * has published. The channel has more, and it keeps growing, so every music
 * surface links out to it rather than pretending the list is complete.
 */
export const YOUTUBE_CHANNEL = "https://www.youtube.com/@serah_Ke";

/**
 * Social links.
 *
 * `handle` is shown to humans; `href` is where it goes. Every one of these
 * opens in a new tab and MUST carry rel="noopener noreferrer" — the old site
 * had 11 target="_blank" links and not one rel attribute, with ESLint's
 * jsx-no-target-blank rule explicitly switched off in .eslintrc.cjs.
 */
export const SOCIAL_LINKS = [
  {
    label: "YouTube",
    handle: "@serah_Ke",
    href: YOUTUBE_CHANNEL,
  },
  {
    label: "Instagram",
    handle: "@serah__ke",
    href: "https://www.instagram.com/serah__ke",
  },
  {
    label: "TikTok",
    handle: "@serahke",
    href: "https://www.tiktok.com/@serahke",
  },
  {
    label: "Facebook",
    handle: "Serah Ke",
    href: "https://www.facebook.com/harez.tanya.50",
  },
  {
    label: "X",
    handle: "@NyabokeSerah",
    href: "https://x.com/NyabokeSerah",
  },
] as const;
