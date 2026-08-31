/**
 * Her recorded catalogue.
 *
 * Every entry is a real, published YouTube video carried over from the previous
 * site. `originalArtist` matters editorially: these are covers of African
 * classics, and naming the original is the respect the genre runs on. It is
 * also what a Zilizopendwa listener actually searches for.
 *
 * CURATED BY HAND, DELIBERATELY. All fourteen videos were verified live on
 * 2026-08-31 via YouTube's keyless oEmbed endpoint.
 *
 * The list is kept in reverse-chronological order, newest first, so the lead
 * slot on /music is always her most recent work. Four were added on 2026-08-31
 * after reading the channel listing: Taabu / Twist Ni Nzuri, Suzanna, Kasongo
 * and Shida. Two other non-Shorts on the channel are deliberately NOT here:
 * "WHY SHIDA?" (a behind-the-scenes piece, not a recording) and "Am Back!" (a
 * channel announcement). The catalogue is songs only.
 *
 * Do NOT replace this with an automatic pull from the channel feed. The raw
 * YouTube titles are ringtone marketing, not song titles, e.g.
 *   "CHARONYI NI WASI (COVER)OFFICIAL VIDEO SMS 'Skiza 7743096' to 811 for..."
 * and the channel's fifteen most recent uploads are all Shorts titled with
 * hashtag spam ("#shortsfeed #serahke #shortsviral"). Auto-syncing would
 * replace a clean catalogue with that. The titles here are the editorial
 * ones; the Skiza codes below were salvaged FROM those raw titles, which is
 * the one genuinely useful thing they carried.
 *
 * NOTE ON THUMBNAILS: the old site hotlinked i.ytimg.com thumbnail URLs
 * carrying expiring `sqp`/`rs` signature params. Those URLs rot. We derive the
 * stable thumbnail path from the video id instead, and the player is a
 * click-to-load facade so no YouTube iframe (and no YouTube cookie) is shipped
 * to a visitor who never presses play.
 */

export interface Track {
  /** YouTube video id. The single source for both the link and the thumbnail. */
  readonly id: string;
  readonly title: string;
  /** Who recorded it first. Null for an original, which the catalogue has none of yet. */
  readonly originalArtist: string | null;
  /** One line of why this one matters. Shown on the music page, not the grid. */
  readonly note?: string;
  /**
   * Safaricom Skiza ringtone code, where one exists.
   *
   * A real revenue stream for a Kenyan artist and one the old site never
   * surfaced at all. Recovered from the video titles on her channel, which
   * carry them as "SMS 'Skiza 7743096' to 811". Subscribing is
   * `SMS <code> to 811`, which is why the UI shows both parts.
   */
  readonly skiza?: string;
}

export const TRACKS: readonly Track[] = [
  {
    id: "KMrSuUMfiSI",
    title: "Taabu / Twist Ni Nzuri",
    originalArtist: null,
    note: "Her most recent release, pairing two songs in a single cut.",
  },
  {
    id: "5hrGCiruwuk",
    title: "Suzanna",
    originalArtist: "Mbilia Bel",
  },
  {
    id: "9Ms0GzAhuPQ",
    title: "Kasongo",
    originalArtist: "Orchestra Super Mazembe",
    note: "The Super Mazembe standard, and one of the best-known Swahili Rhumba records ever cut.",
  },
  {
    id: "dnrkaKHyMMc",
    skiza: "7743121",
    title: "Shida",
    originalArtist: null,
  },
  {
    id: "AQrj2WoHjOs",
    skiza: "7743096",
    title: "Charonyi Ni Wasi",
    originalArtist: "Maroon Commandos",
    note: "One of her signature covers, and the one people ask for by name.",
  },
  {
    id: "q4T6Wx7og8k",
    skiza: "7743094",
    title: "Afro",
    originalArtist: "Les Wanyika",
    note: "A Les Wanyika standard, and the other song she is best known for.",
  },
  {
    id: "XjB8A-UIxj4",
    skiza: "7743097",
    title: "Mario",
    originalArtist: "Franco",
    note: "Franco's Rhumba classic.",
  },
  {
    id: "nl7EFmzUlQA",
    skiza: "7743099",
    title: "Ndaya",
    originalArtist: "Mpongo Love",
    note: "The Congolese great, covered in full.",
  },
  {
    id: "9hlpZ1kk8Pw",
    title: "Vulindlela",
    originalArtist: "Brenda Fassie",
  },
  {
    id: "rApKXFBzg-s",
    skiza: "7743095",
    title: "Angelike",
    originalArtist: null,
  },
  {
    id: "2yUiB5J1_p4",
    skiza: "7743101",
    title: "Sina Makosa",
    originalArtist: "Les Wanyika",
  },
  {
    id: "dCLB1oC9SPQ",
    skiza: "7743098",
    title: "Massu",
    originalArtist: null,
  },
  {
    id: "x1IBsRKwhoE",
    title: "Nakei Nairobi",
    originalArtist: "Mbilia Bel",
  },
  {
    id: "Y1qULpT0eWU",
    title: "Silent Night / Malaika",
    originalArtist: null,
    note: "A Christmas mashup, pairing Silent Night with Malaika.",
  },
] as const;

/** Watch URL for a track. */
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/**
 * Stable thumbnail URL.
 *
 * `hqdefault.jpg` exists for every video and never expires, unlike the signed
 * `i.ytimg.com/...?sqp=...&rs=...` URLs the old site pasted in by hand.
 */
export const thumbnailUrl = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/**
 * Press coverage. Real, verifiable, third-party.
 *
 * This is the strongest credibility material she has, and the old site buried
 * it behind a floating button that slid a panel in from off-screen. On the
 * rebuild it belongs on the About page where a promoter will actually see it.
 */
export interface PressItem {
  readonly outlet: string;
  readonly title: string;
  readonly href: string;
}

export const PRESS: readonly PressItem[] = [
  {
    outlet: "Nation Africa",
    title:
      "Meet the medical student who has found fame as a Rhumba singer",
    href: "https://nation.africa/kenya/life-and-style/dn2/-meet-the-medical-student-who-has-found-fame-as-rhumba-singer--4531190",
  },
  {
    outlet: "Tuko",
    title:
      "Fast-rising Zilizopendwa cover artiste receives prestigious honorary award",
    href: "https://www.tuko.co.ke/people/527742-fast-rising-zilizopendwa-cover-artiste-receives-prestigious-honorary-award/",
  },
  {
    outlet: "Ghafla",
    title: "Queen of Zilizopendwa honoured by Fred Obachi Machoka",
    href: "https://www.ghafla.com/ke/talented-queen-of-zilizopendwa-serah-george-honored-by-fred-obachi-machokaavideo/",
  },
  {
    outlet: "Who Owns Kenya",
    title:
      "Recognising Serah Nyaboke, the Nyamira-based songbird delivering Rhumba masterpieces",
    href: "https://whownskenya.com/recognising-serah-nyaboke-nyamira-based-songbird-delivering-masterpieces-in-rhumba-music-covers/",
  },
] as const;
