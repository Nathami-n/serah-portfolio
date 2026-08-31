/**
 * Biography and career facts.
 *
 * ---------------------------------------------------------------------------
 * VERIFY BEFORE LAUNCH — this section describes a real person
 * ---------------------------------------------------------------------------
 * The prose below is adapted from the previous site, which was last
 * meaningfully updated years ago. Two claims are time-sensitive and are very
 * likely stale now:
 *
 *   1. "medical student" — she may well have qualified since. Publishing
 *      "student" about a working doctor would be wrong and would undersell her.
 *   2. The award year and any career milestones since.
 *
 * Confirm both with Serah, update, then delete this block. Do not guess.
 */

/** The one-line version, used in the hero and as the meta description base. */
export const SHORT_BIO =
  "Serah Ke sings the African classics, Rhumba and Zilizopendwa, the songs of Franco, Mpongo Love and Les Wanyika, for the people who remember them and the people meeting them for the first time.";

/**
 * The full biography, as paragraphs.
 *
 * Kept as an array rather than one blob so the layout can set them
 * individually (a lead paragraph at a larger size, for instance) without
 * splitting prose in a component.
 */
export const BIO_PARAGRAPHS: readonly string[] = [
  "Serah discovered she could sing at three years old, in a local church choir. What began there turned into a career built on a specific and unfashionable conviction: that the African classics deserve to be sung properly, not merely sampled.",
  "She works in Zilizopendwa and Rhumba, the music of Franco, Mpongo Love, Les Wanyika and the Maroon Commandos. Her covers are not nostalgia pieces. She sings them straight, with a contemporary production sensibility and a voice that can carry the originals, which is a harder thing than it sounds.",
  // VERIFY: "medical student" may be out of date. See the block at the top.
  "Alongside the music she is a medical student, and holds a Bachelor's degree in Education Science, in mathematics and physics.",
  "Her best-known recordings are Charonyi Ni Wasi, first done by the Maroon Commandos, and Afro, by Les Wanyika. She has since covered Ndaya by the Congolese great Mpongo Love, and Mario, by the Rhumba legend Franco.",
] as const;

/**
 * Career facts, shown as a definition list on the About page.
 *
 * A definition list rather than a grid of icon cards: three consecutive
 * sections of bordered cards is what makes a page read as generated, and an
 * icon in a tinted rounded square above a heading above a checkmark list is a
 * specifically documented tell. See the landing page's design-instructions.md.
 */
export interface Fact {
  readonly term: string;
  readonly detail: string;
}

export const FACTS: readonly Fact[] = [
  { term: "Genre", detail: "Rhumba, Zilizopendwa, African classics" },
  { term: "Based in", detail: "Nairobi, Kenya" },
  { term: "Sings in", detail: "Swahili, Lingala, English, Ekegusii" },
  { term: "Started", detail: "Age three, in a church choir" },
] as const;

/**
 * The honorary award.
 *
 * Verifiable: the trophy in the gallery is engraved "SERAH NYABOKE, HONORARY
 * AWARD, MUSIC INDUSTRY WINNER", and the Tuko article in PRESS reports it
 * independently. Safe to state plainly.
 *
 * VERIFY: the year. The old site never recorded it.
 */
export const AWARD = {
  title: "Honorary Award, Music Industry",
  presenter: "Regional Business Leadership Awards Gala",
  note: "Recognised for her work keeping African classical music in circulation.",
} as const;
