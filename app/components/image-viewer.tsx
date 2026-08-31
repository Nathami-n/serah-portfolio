import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  ZoomInAreaIcon,
  ZoomOutAreaIcon,
} from "@hugeicons/core-free-icons";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Photo } from "~/content/gallery";
import manifest from "~/content/image-manifest.json";
import { cn } from "~/lib/utils";

/**
 * Full-screen image viewer.
 *
 * SIZING, THE THING THAT WAS BROKEN
 * ---------------------------------
 * The first version put the image in a `flex-1` column between a header and a
 * footer and relied on `max-h-full`. That crops: a percentage max-height only
 * resolves against a parent with a DEFINITE height, and a flex item sized by
 * its own content does not have one, so tall portraits overflowed and were
 * clipped top and bottom.
 *
 * The fix is to stop nesting the image inside a flow that has to be measured.
 * The chrome (top bar, bottom bar) is absolutely positioned OVER the image
 * area, and the image itself is sized against the viewport directly with
 * `max-height: 100dvh` minus the chrome, in real units. Every photograph now
 * fits whole, in either orientation, at any viewport size.
 *
 * `dvh` rather than `vh` matters on mobile: `vh` is the LARGEST viewport,
 * ignoring the browser's address bar, so a `100vh` image is partly hidden
 * behind the chrome on iOS Safari until you scroll.
 *
 * WHAT ELSE IT DOES
 *   - click-to-zoom, then drag to pan, and the cursor reflects the state
 *   - double-click toggles zoom
 *   - neighbouring images are preloaded, so stepping through is instant
 *   - keyboard: arrows navigate, Escape closes or exits zoom first
 *   - swipe left/right on touch, disabled while zoomed so panning still works
 *   - focus trapped while open, restored on close
 */

type ManifestEntry = {
  widths: number[];
  width: number | null;
  height: number | null;
  aspectRatio: number | null;
  lqip: string;
};

const IMAGES = manifest as Record<string, ManifestEntry>;

/** Height reserved for the top and bottom chrome, in px. */
const CHROME = { top: 56, bottom: 56 } as const;

interface ImageViewerProps {
  photos: readonly Photo[];
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

  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const srcFor = useCallback((slug: string) => {
    const e = IMAGES[slug];
    if (!e) return null;
    const widest = e.widths[e.widths.length - 1];
    return {
      avif: e.widths.map((w) => `/img/${slug}-${w}.avif ${w}w`).join(", "),
      webp: e.widths.map((w) => `/img/${slug}-${w}.webp ${w}w`).join(", "),
      jpg: e.widths.map((w) => `/img/${slug}-${w}.jpg ${w}w`).join(", "),
      fallback: `/img/${slug}-${widest}.jpg`,
    };
  }, []);

  const goPrevious = useCallback(
    () => onIndexChange((index - 1 + photos.length) % photos.length),
    [index, onIndexChange, photos.length],
  );
  const goNext = useCallback(
    () => onIndexChange((index + 1) % photos.length),
    [index, onIndexChange, photos.length],
  );

  // Reset zoom, pan and the load state whenever the photograph changes.
  useEffect(() => {
    setZoomed(false);
    setPan({ x: 0, y: 0 });
    setLoaded(false);
  }, [index]);

  /*
   * Preload the neighbours. Stepping through a gallery should not show a blank
   * frame while the next file downloads; by the time the visitor presses the
   * arrow, it is already in the browser cache.
   */
  useEffect(() => {
    const neighbours = [
      photos[(index + 1) % photos.length],
      photos[(index - 1 + photos.length) % photos.length],
    ];
    for (const neighbour of neighbours) {
      if (!neighbour) continue;
      const e = IMAGES[neighbour.slug];
      if (!e) continue;
      const widest = e.widths[e.widths.length - 1];
      const img = new Image();
      img.src = `/img/${neighbour.slug}-${widest}.webp`;
    }
  }, [index, photos]);

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
        // Escape exits zoom first, and only closes if not zoomed. Otherwise a
        // zoomed-in visitor loses the whole viewer in one keystroke.
        if (zoomed) {
          setZoomed(false);
          setPan({ x: 0, y: 0 });
        } else {
          onClose();
        }
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
  }, [goNext, goPrevious, onClose, zoomed]);

  if (!photo || !entry) return null;
  const src = srcFor(photo.slug);
  if (!src) return null;

  const toggleZoom = () => {
    setZoomed((z) => !z);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption ?? "Photograph"}
      ref={dialogRef}
      className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm select-none"
      onTouchStart={(event) => {
        const t = event.touches[0];
        if (!t) return;
        touchStart.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        touchStart.current = null;
        // While zoomed, a drag is a pan, not a page turn.
        if (!start || zoomed) return;
        const t = event.changedTouches[0];
        if (!t) return;
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        // Require a mostly-horizontal move, so a vertical scroll or a tap does
        // not flip the photograph.
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx > 0) goPrevious();
        else goNext();
      }}
    >
      {/*
        THE IMAGE STAGE.
        Absolutely positioned and inset by the chrome height, so it has a
        DEFINITE height for the image's max-height to resolve against. This is
        what stops the cropping.
      */}
      <div
        className="absolute inset-x-0 flex items-center justify-center overflow-hidden"
        style={{ top: CHROME.top, bottom: CHROME.bottom }}
        onClick={(event) => {
          // Clicking the surround closes; clicking the photograph zooms.
          if (event.target === event.currentTarget && !zoomed) onClose();
        }}
        onMouseDown={(event) => {
          if (!zoomed) return;
          dragStart.current = {
            x: event.clientX - pan.x,
            y: event.clientY - pan.y,
          };
        }}
        onMouseMove={(event) => {
          if (!zoomed || !dragStart.current) return;
          setPan({
            x: event.clientX - dragStart.current.x,
            y: event.clientY - dragStart.current.y,
          });
        }}
        onMouseUp={() => {
          dragStart.current = null;
        }}
        onMouseLeave={() => {
          dragStart.current = null;
        }}
      >
        {/* LQIP behind the real image, so there is never an empty frame. */}
        {!loaded ? (
          <img
            src={entry.lqip}
            alt=""
            aria-hidden="true"
            className="absolute max-h-full max-w-full object-contain opacity-40 blur-xl"
            style={{ aspectRatio: entry.aspectRatio ?? undefined }}
          />
        ) : null}

        <picture>
          <source type="image/avif" srcSet={src.avif} sizes="100vw" />
          <source type="image/webp" srcSet={src.webp} sizes="100vw" />
          <img
            key={photo.slug}
            src={src.fallback}
            srcSet={src.jpg}
            sizes="100vw"
            alt={photo.alt}
            width={entry.width ?? undefined}
            height={entry.height ?? undefined}
            onLoad={() => setLoaded(true)}
            onClick={toggleZoom}
            onDoubleClick={toggleZoom}
            draggable={false}
            /*
             * The sizing that matters. `object-contain` plus a max-height in
             * REAL units (dvh minus the chrome) rather than a percentage, so
             * the whole photograph always fits regardless of orientation.
             */
            style={{
              maxHeight: `calc(100dvh - ${CHROME.top + CHROME.bottom}px)`,
              transform: zoomed
                ? `scale(2) translate(${pan.x / 2}px, ${pan.y / 2}px)`
                : undefined,
            }}
            className={cn(
              "max-w-full object-contain transition-[opacity,transform] duration-300",
              loaded ? "opacity-100" : "opacity-0",
              zoomed
                ? dragStart.current
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-zoom-in",
            )}
          />
        </picture>
      </div>

      {/* TOP CHROME */}
      <div
        className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 px-4 sm:px-6"
        style={{ height: CHROME.top }}
      >
        <p className="text-sm tabular-nums text-white/60">
          {index + 1} / {photos.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleZoom}
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            aria-pressed={zoomed}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <HugeiconsIcon
              icon={zoomed ? ZoomOutAreaIcon : ZoomInAreaIcon}
              size={20}
              strokeWidth={1.8}
            />
          </button>
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
      </div>

      {/* BOTTOM CHROME */}
      <div
        className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-4 sm:px-6"
        style={{ height: CHROME.bottom }}
      >
        <p className="min-w-0 flex-1 truncate text-sm text-white/70">
          {photo.caption ?? ""}
        </p>
        <div className="flex shrink-0 items-center gap-1">
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

      {/*
        Desktop-only edge arrows. Large invisible hit areas down each side, the
        pattern every serious photo viewer uses. Hidden on touch, where the
        swipe gesture and the bottom-bar buttons cover it.
      */}
      <button
        type="button"
        onClick={goPrevious}
        aria-label="Previous photograph"
        tabIndex={-1}
        className="absolute left-0 top-1/2 hidden h-24 w-16 -translate-y-1/2 items-center justify-center text-white/40 transition-colors hover:text-white lg:flex"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={28} strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next photograph"
        tabIndex={-1}
        className="absolute right-0 top-1/2 hidden h-24 w-16 -translate-y-1/2 items-center justify-center text-white/40 transition-colors hover:text-white lg:flex"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={28} strokeWidth={1.5} />
      </button>
    </div>
  );
}

/** Open-state helper for the viewer. `index` is null when closed. */
export function useImageViewer() {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback((next: number) => setIndex(next), []);
  const close = useCallback(() => setIndex(null), []);
  return { index, open, close, setIndex };
}
