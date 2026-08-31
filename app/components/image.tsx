import manifest from "~/content/image-manifest.json";
import { cn } from "~/lib/utils";

/**
 * Responsive image, backed by the build-time pipeline in
 * scripts/optimise-images.mjs.
 *
 * WHAT THIS SOLVES
 * ----------------
 * The old site rendered raw camera originals straight from public/ and put a
 * Blurhash placeholder over the wait. One image was 9.4MB for a 300x300 box.
 * Here, the browser picks a format it supports (AVIF, then WebP, then JPEG)
 * at roughly the width it actually needs, and gets a blurred LQIP underneath
 * while that arrives.
 *
 * DECODING ORDER MATTERS: <source> elements are evaluated top to bottom and the
 * first supported type wins, so AVIF must precede WebP, which must precede the
 * <img> fallback.
 */

type ManifestEntry = {
  widths: number[];
  width: number | null;
  height: number | null;
  aspectRatio: number | null;
  lqip: string;
};

const IMAGES = manifest as Record<string, ManifestEntry>;

interface ImageProps {
  /** Key into image-manifest.json, e.g. "awards-studio". */
  slug: string;
  alt: string;
  /**
   * The `sizes` attribute. Tells the browser how wide this image will render
   * BEFORE layout, so it can choose a source. Getting this wrong is the usual
   * reason a responsive image still downloads far too much: the default is
   * `100vw`, which makes a thumbnail fetch the widest variant.
   */
  sizes?: string;
  className?: string;
  /** Classes for the <img> itself, e.g. object-cover / object-contain. */
  imgClassName?: string;
  /**
   * Eager-load and raise fetch priority. Use for the one image visible at the
   * top of the page, never for anything below the fold: marking everything
   * priority is the same as marking nothing.
   */
  priority?: boolean;
}

export function Image({
  slug,
  alt,
  sizes = "100vw",
  className,
  imgClassName,
  priority = false,
}: ImageProps) {
  const entry = IMAGES[slug];

  /*
   * Fail loudly in dev, quietly in production. A missing slug is a typo or a
   * pipeline that has not been re-run; either way a visitor should not see a
   * broken image element, and a developer should not have to guess why nothing
   * rendered.
   */
  if (!entry) {
    if (import.meta.env.DEV) {
      throw new Error(
        `<Image slug="${slug}"> not found in image-manifest.json. ` +
          `Either the slug is wrong, or assets-source/ changed and ` +
          `\`pnpm images\` needs re-running.`,
      );
    }
    return null;
  }

  const srcSet = (ext: string) =>
    entry.widths.map((w) => `/img/${slug}-${w}.${ext} ${w}w`).join(", ");

  // Widest available variant, as the src fallback for very old browsers.
  const widest = entry.widths[entry.widths.length - 1];

  return (
    <div
      className={cn("relative overflow-hidden bg-muted", className)}
      /*
       * Reserving the aspect ratio is what stops layout shift while the image
       * loads. The LQIP sits behind the real image and is revealed through it
       * rather than swapped, so there is no flash between the two.
       */
      style={{
        aspectRatio: entry.aspectRatio ?? undefined,
        backgroundImage: `url(${entry.lqip})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
        <img
          src={`/img/${slug}-${widest}.jpg`}
          srcSet={srcSet("jpg")}
          sizes={sizes}
          alt={alt}
          width={entry.width ?? undefined}
          height={entry.height ?? undefined}
          loading={priority ? "eager" : "lazy"}
          // `fetchPriority` is camelCase in React 19.
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      </picture>
    </div>
  );
}
