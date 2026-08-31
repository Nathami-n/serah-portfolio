/**
 * Her recorded catalogue.
 *
 * Every entry is a real, published YouTube video carried over from the previous
 * site. `originalArtist` matters editorially: these are covers of African
 * classics, and naming the original is the respect the genre runs on. It is
 * also what a Zilizopendwa listener actually searches for.
 *
 * VERIFY: this list ends where the old site stopped being updated. Ask Serah
 * for anything released since, and for the release years, which the old site
 * never recorded.
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
}

export const TRACKS: readonly Track[] = [
  {
    id: "AQrj2WoHjOs",
    title: "Charonyi Ni Wasi",
    originalArtist: "Maroon Commandos",
    note: "One of her signature covers, and the one people ask for by name.",
  },
  {
    id: "q4T6Wx7og8k",
    title: "Afro",
    originalArtist: "Les Wanyika",
    note: "A Les Wanyika standard, and the other song she is best known for.",
  },
  {
    id: "XjB8A-UIxj4",
    title: "Mario",
    originalArtist: "Franco",
    note: "Franco's Rhumba classic, and among her most recent recordings.",
  },
  {
    id: "nl7EFmzUlQA",
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
    title: "Angelike",
    originalArtist: null,
  },
  {
    id: "2yUiB5J1_p4",
    title: "Sina Makosa",
    originalArtist: "Les Wanyika",
  },
  {
    id: "dCLB1oC9SPQ",
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
    title: "Silent Night",
    originalArtist: null,
    note: "A Christmas recording.",
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
