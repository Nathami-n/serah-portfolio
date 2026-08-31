import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { useCallback, useEffect, useRef, useState } from "react";

import manifest from "~/content/image-manifest.json";
import type { Photo } from "~/content/gallery";

/**
 * Full-screen image viewer (lightbox).
 *
 * The old site had nothing like this: gallery images were fixed-size tiles you
 * could not enlarge, so a 6000x4000 photograph was only ever seen at 400px.
 *
 * Behaviour:
 *   - opens at the largest sensible variant, not the original master
 *   - arrow keys and on-screen controls step through the set, wrapping around
 *   - Escape closes, focus is trapped while open and restored on close
 *   - swipe left/right on touch
 *   - the caption and a counter are always visible, so context is never lost
 *
 * Accessibility notes: this is a modal dialog, so it carries role="dialog" and
 * aria-modal, the backdrop is inert to screen readers, and every control has a
 * real label. The old site's video modal had none of this: it was a div with an
 * onClick, dismissable only by clicking the backdrop.
 */

type ManifestEntry = {
  widths: number[];
  width: number | null;
  height: number | null;
  aspectRatio: number | null;
  lqip: string;
};

const IMAGES = manifest as Record<string, ManifestEntry>;

interface ImageViewerProps {
  photos: readonly Photo[];
  /** Index into `photos`. */
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function ImageViewer({
  photos,
  index,
  onClose,
  onIndexChange,
}: ImageViewerProps) {
  const photo = photos[index];
  const entry = photo ? IMAGES[photo.slug] : undefined;

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Wrap around at both ends: from the last photo, "next" returns to the first.
  const goPrevious = useCallback(
    () => onIndexChange((index - 1 + photos.length) % photos.length),
    [index, onIndexChange, photos.length],
  );
  const goNext = useCallback(
    () => onIndexChange((index + 1) % photos.length),
    [index, onIndexChange, photos.length],
  );

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => restoreFocusRef.current?.focus();
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        return;
      }

      // Focus trap.
      if (event.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrevious, onClose]);

  if (!photo || !entry) return null;

  const srcSet = (ext: string) =>
    entry.widths.map((w) => `/img/${photo.slug}-${w}.${ext} ${w}w`).join(", ");
  const widest = entry.widths[entry.widths.length - 1];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption ?? "Photograph"}
      ref={dialogRef}
      className="fixed inset-0 z-100 flex flex-col bg-black/95 backdrop-blur-sm"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX ?? null;
        touchStartX.current = null;
        if (start === null || end === null) return;
        // 50px threshold, so a tap or a vertical scroll is not read as a swipe.
        const delta = end - start;
        if (Math.abs(delta) < 50) return;
        if (delta > 0) goPrevious();
        else goNext();
      }}
    >
      {/* Top bar: counter and close. */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <p className="text-sm tabular-nums text-white/60">
          {index + 1} / {photos.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.8} />
        </button>
      </div>

      {/*
        The image area. Clicking the empty space around the image closes the
        viewer, which is the behaviour people expect from a lightbox, but a
        click on the image itself must not.
      */}
      <div
        className="flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <picture>
          <source type="image/avif" srcSet={srcSet("avif")} sizes="100vw" />
          <source type="image/webp" srcSet={srcSet("webp")} sizes="100vw" />
          <img
            src={`/img/${photo.slug}-${widest}.jpg`}
            srcSet={srcSet("jpg")}
            sizes="100vw"
            alt={photo.alt}
            width={entry.width ?? undefined}
            height={entry.height ?? undefined}
            /*
             * object-contain, never cover: this is the one place the whole
             * photograph must be visible. max-h keeps it inside the viewport
             * so the chrome above and below is never pushed off screen.
             */
            className="max-h-full max-w-full object-contain"
          />
        </picture>
      </div>

      {/* Bottom bar: caption and navigation. */}
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p className="min-w-0 flex-1 truncate text-sm text-white/70">
          {photo.caption ?? ""}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={goPrevious}
            aria-label="Previous photograph"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photograph"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Open-state helper for the viewer. Returns null when closed. */
export function useImageViewer() {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback((next: number) => setIndex(next), []);
  const close = useCallback(() => setIndex(null), []);
  return { index, open, close, setIndex };
}
