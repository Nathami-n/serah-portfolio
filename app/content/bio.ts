/**
 * Biography and career facts.
 *
 * This describes a real person, so nothing here is inferred. The previous site
 * said "medical student", which was true when it was written years ago and is
 * not now: she has since qualified, confirmed 2026-08-31. That correction
 * matters beyond accuracy, because "student" undersells a working doctor.
 *
 * One item is still open: the YEAR of the honorary award. The old site never
 * recorded it, so AWARD below states the award without dating it rather than
 * guessing. Add the year when known.
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
  "Serah works in a repertoire most singers her age have only heard sampled: Zilizopendwa and Rhumba, the music of Franco, Mpongo Love, Les Wanyika and the Maroon Commandos. She sings it straight, at full length, with the arrangements intact.",
  "Her covers are not nostalgia pieces, and they are not novelty either. The songs are treated as the standards they are, given a contemporary recording and a voice with enough range to hold them. Anyone can put a Rhumba track through a modern mix; carrying a Franco vocal line is a different job.",
  "Alongside the music she is a medical doctor, and holds a Bachelor's degree in Education Science, in mathematics and physics.",
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
  { term: "Singing since", detail: "Age three" },
  { term: "Also", detail: "Medical doctor" },
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
