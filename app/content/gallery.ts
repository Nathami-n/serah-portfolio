/**
 * Gallery.
 *
 * CURATED, NOT DUMPED. The old site pushed all 19 available images through one
 * horizontally-scrolling strip under an "Awards" heading, mixing studio
 * portraits with phone snaps of a crowd outside a building. A portfolio is
 * judged by its weakest image, so the casual behind-the-scenes shots
 * (vulindela1-3, serahbg, singingGirl, eclipse) are deliberately not here.
 * They remain in assets-source/ and public/img/ if they are ever wanted.
 *
 * `alt` is real descriptive text, not a filename. The old site left four of its
 * ten images with no alt attribute at all, and used "serah image" for another.
 *
 * `slug` keys into app/content/image-manifest.json, which the pipeline
 * generates. `aspect` tells the layout how to reserve space so nothing shifts
 * while images load.
 */

export interface Photo {
  /** Key into image-manifest.json. */
  readonly slug: string;
  readonly alt: string;
  /** Short caption. Omit rather than pad with something obvious. */
  readonly caption?: string;
  readonly aspect: "portrait" | "landscape";
}

export const GALLERY: readonly Photo[] = [
  {
    slug: "awards-studio",
    alt: "Serah seated on a stool against a dark panelled wall, laughing, holding a bouquet of yellow flowers, with warm wall lights either side of her.",
    caption: "Studio portrait",
    aspect: "portrait",
  },
  {
    slug: "awards-carnival",
    alt: "Serah singing into a handheld microphone at a seated event, guests at tables around her.",
    caption: "Performing",
    aspect: "landscape",
  },
  {
    slug: "awards-carnival3",
    alt: "Serah performing at an event.",
    aspect: "portrait",
  },
  {
    slug: "awards-machoka",
    alt: "Serah with broadcaster Fred Obachi Machoka.",
    caption: "With Fred Obachi Machoka",
    aspect: "landscape",
  },
  {
    slug: "serahabout",
    alt: "Portrait of Serah.",
    aspect: "portrait",
  },
  {
    slug: "awards-serahdancing",
    alt: "Serah dancing with another woman at a live show, red stage lights and a drum kit behind them.",
    caption: "On stage",
    aspect: "landscape",
  },
  {
    slug: "awards-trophy",
    alt: "The honorary award trophy, engraved: Serah Nyaboke, Honorary Award, Music Industry Winner.",
    caption: "Honorary Award, Music Industry",
    aspect: "portrait",
  },
  {
    slug: "awards-kalonzo2",
    alt: "Serah with Kalonzo Musyoka.",
    caption: "With Kalonzo Musyoka",
    aspect: "landscape",
  },
  {
    slug: "awards-sit",
    alt: "Serah in a black wide-brimmed hat and red plaid shirt, seated in a pink armchair and pointing at the camera.",
    caption: "Portrait",
    aspect: "landscape",
  },
  {
    slug: "awards-carnival2",
    alt: "Serah performing at an event.",
    aspect: "landscape",
  },
] as const;

/**
 * Gallery order, tuned for a CSS-columns masonry layout.
 *
 * CSS multi-column balances by ITEM COUNT, not by height: it puts an equal
 * number of items in each column regardless of how tall they are. With four
 * tall portraits and six short landscapes in source order, the portraits
 * clustered into one column and left it running far past the others.
 *
 * Interleaving tall and short entries in the source array is what evens the
 * columns out. If you add a photograph, drop it next to one of the opposite
 * orientation rather than appending it, and re-check the page at lg width.
 */

/** The image the hero uses. Her strongest portrait. */
export const HERO_PHOTO = "awards-studio";

/** Open Graph / social share image. Landscape reads better in a link preview. */
export const OG_PHOTO = "awards-sit";
