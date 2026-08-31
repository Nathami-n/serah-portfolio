/**
 * Image pipeline: assets-source/ (originals, gitignored) -> public/img/ (web).
 *
 * WHY THIS EXISTS
 * ---------------
 * The previous site shipped 102MB of unprocessed camera originals straight out
 * of `public/`. Vite copies `public/` verbatim into the build, so every one of
 * those bytes was reachable by a visitor. Measured before this script existed:
 *
 *   awards/sit.JPG        6000x4000   9.4MB   rendered in a 300x300 box
 *   vulindela1-3.jpg      6960x4640   ~13MB each
 *   awards/carnival.jpg   6720x4480   11MB
 *   awards/studio.jpg     3712x5126   12MB
 *   serahAbout.jpg        3548x5231   12MB    rendered at 300x400
 *
 * A Blurhash placeholder was rendered while these loaded, which made the wait
 * *look* handled while a visitor on Kenyan mobile data paid for every byte.
 * That is the single worst problem with the old site, worse than any code
 * issue, and this script is the fix.
 *
 * WHAT IT DOES
 * ------------
 * For each source image, emits AVIF + WebP + a JPEG fallback at several widths,
 * so `<picture>`/`srcset` can hand each device roughly the pixels it needs.
 * Also emits a tiny blurred base64 LQIP per image for placeholder use, which
 * replaces the `react-blurhash` dependency and its hand-maintained hash strings
 * (the old imageData.jsx carried hashes copied in by hand).
 *
 * Output is written to `public/img/` and IS committed — Vercel builds from the
 * repo and we do not want a sharp run on every deploy. The originals in
 * `assets-source/` are gitignored: they are masters, not deployables.
 *
 * Run: pnpm images
 */

import { existsSync } from "node:fs";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.join(ROOT, "assets-source");
const OUT_DIR = path.join(ROOT, "public", "img");
const MANIFEST = path.join(ROOT, "app", "content", "image-manifest.json");

/**
 * Widths we emit. Chosen against the real layouts rather than a generic ladder:
 * 400 for gallery thumbs, 800 for cards and portraits, 1280 for the hero on a
 * laptop, 1920 for a wide desktop hero. Nothing larger — no image on this site
 * is ever displayed above 1920 CSS pixels, and a 6960px original serves no one.
 */
const WIDTHS = [400, 800, 1280, 1920];

/** Encoder settings. AVIF at q50 is visually clean and roughly half of WebP. */
const AVIF = { quality: 50, effort: 6 };
const WEBP = { quality: 78, effort: 5 };
const JPEG = { quality: 80, mozjpeg: true, progressive: true };

/** Files that are UI chrome rather than photography, so they are left alone. */
const SKIP = new Set(["serahLogo.svg", "musiclogo.svg"]);

/** Recursively collect every raster image under a directory. */
async function collect(dir, base = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const rel = base ? path.join(base, entry.name) : entry.name;
    if (entry.isDirectory()) {
      files.push(...(await collect(path.join(dir, entry.name), rel)));
      continue;
    }
    if (SKIP.has(entry.name)) continue;
    if (!/\.(jpe?g|png)$/i.test(entry.name)) continue;
    files.push(rel);
  }
  return files;
}

/**
 * A 20px-wide blurred JPEG, inlined as a data URI. Rendered underneath the real
 * image so there is something to look at during the load, and so the layout
 * does not jump. Replaces react-blurhash + the hand-copied hash strings.
 */
async function lqip(input) {
  const buffer = await sharp(input)
    .resize(20, null, { fit: "inside" })
    .blur(1.2)
    .jpeg({ quality: 40 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.error(
      `No assets-source/ directory found at ${SOURCE_DIR}.\n` +
        `It holds the full-resolution originals and is gitignored, so a fresh\n` +
        `clone will not have it. Restore it from the originals before running.`,
    );
    process.exitCode = 1;
    return;
  }

  const sources = await collect(SOURCE_DIR);
  if (sources.length === 0) {
    console.error("assets-source/ contains no .jpg/.jpeg/.png files.");
    process.exitCode = 1;
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });

  const manifest = {};
  let totalIn = 0;
  let totalOut = 0;

  for (const rel of sources) {
    const input = path.join(SOURCE_DIR, rel);
    const image = sharp(input);
    const meta = await image.metadata();
    const stat = await sharp(input).toBuffer();
    totalIn += stat.byteLength;

    // Flatten `awards/foo.jpg` -> `awards-foo` so output is a single flat dir.
    const slug = rel
      .replace(/\.[^.]+$/, "")
      .replace(/[\\/]/g, "-")
      .toLowerCase();

    // Never upscale: an 800px-wide source should not be written at 1920.
    const widths = WIDTHS.filter((w) => w <= (meta.width ?? 0));
    if (widths.length === 0) widths.push(meta.width ?? WIDTHS[0]);

    const sizes = [];
    for (const width of widths) {
      const resized = sharp(input).resize(width, null, {
        fit: "inside",
        withoutEnlargement: true,
      });

      const [avif, webp, jpeg] = await Promise.all([
        resized.clone().avif(AVIF).toBuffer(),
        resized.clone().webp(WEBP).toBuffer(),
        resized.clone().jpeg(JPEG).toBuffer(),
      ]);

      await Promise.all([
        writeFile(path.join(OUT_DIR, `${slug}-${width}.avif`), avif),
        writeFile(path.join(OUT_DIR, `${slug}-${width}.webp`), webp),
        writeFile(path.join(OUT_DIR, `${slug}-${width}.jpg`), jpeg),
      ]);

      totalOut += avif.byteLength + webp.byteLength + jpeg.byteLength;
      sizes.push(width);
    }

    manifest[slug] = {
      widths: sizes,
      width: meta.width ?? null,
      height: meta.height ?? null,
      aspectRatio:
        meta.width && meta.height
          ? Number((meta.width / meta.height).toFixed(4))
          : null,
      lqip: await lqip(input),
    };

    const mb = (stat.byteLength / 1024 / 1024).toFixed(1);
    console.log(`  ${rel.padEnd(28)} ${String(meta.width).padStart(5)}px  ${mb}MB -> ${sizes.length} widths`);
  }

  await mkdir(path.dirname(MANIFEST), { recursive: true });
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  const inMb = (totalIn / 1024 / 1024).toFixed(1);
  const outMb = (totalOut / 1024 / 1024).toFixed(1);
  console.log(
    `\n${sources.length} images.  originals ${inMb}MB -> output ${outMb}MB ` +
      `(all formats, all widths combined).\n` +
      `A single page loads one format at one width, so real transfer is a ` +
      `small fraction of that.\nManifest: app/content/image-manifest.json`,
  );
}

await main();
