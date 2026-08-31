/**
 * Regenerate the favicon set from public/favicon.svg.
 *
 * The SVG itself is built from the mark half of her logo (the orbiting note),
 * rendered in brand gold on the dark surface. The source asset
 * `assets-source/serahLogo.svg` hardcodes fill="#000000", which is invisible
 * against a dark browser tab, so the favicon cannot simply reference it.
 *
 * Run: node scripts/generate-favicons.mjs
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SVG = path.join(ROOT, "public", "favicon.svg");

const SIZES = [
  ["favicon-16x16", 16],
  ["favicon-32x32", 32],
  ["apple-touch-icon", 180],
  ["icon-192", 192],
  ["icon-512", 512],
];

const svg = readFileSync(SVG);

for (const [name, size] of SIZES) {
  // High density so the vector is rasterised cleanly before downscaling.
  await sharp(svg, { density: 600 })
    .resize(size, size)
    .png()
    .toFile(path.join(ROOT, "public", `${name}.png`));
  console.log(`  ${name}.png  ${size}x${size}`);
}

console.log("\nFavicons regenerated from public/favicon.svg");
