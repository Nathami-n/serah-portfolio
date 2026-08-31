import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { useCallback, useEffect, useRef, useState } from "react";

import { type Track, thumbnailUrl, watchUrl } from "~/content/music";
import { cn } from "~/lib/utils";

/**
 * Video player.
 *
 * DESIGN GOALS
 * ------------
 * 1. Nothing from YouTube loads until the visitor actually presses play. The
 *    grid renders a static thumbnail, so opening the music page sets no
 *    third-party cookies and costs no third-party JavaScript. The old site
 *    shipped `react-player` and mounted an iframe immediately, which loads
 *    YouTube's tracking for everyone, including the majority who never play
 *    anything.
 * 2. Once playing, the iframe uses youtube-nocookie.com.
 * 3. Full keyboard support. The old site's video modal could only be dismissed
 *    by clicking the backdrop: no Escape, no focus trap, no focus restore.
 *
 * KEYBOARD
 *   Escape        close
 *   ArrowLeft     previous track
 *   ArrowRight    next track
 *   Tab           cycles within the dialog (focus trap)
 */

interface VideoPlayerProps {
  track: Track;
  /** Called to close. */
  onClose: () => void;
  /** Step through the playlist. Null disables that direction. */
  onPrevious: (() => void) | null;
  onNext: (() => void) | null;
}

export function VideoPlayer({
  track,
  onClose,
  onPrevious,
  onNext,
}: VideoPlayerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /*
   * Remember what had focus before the dialog opened, and restore it on close.
   * Without this, dismissing the dialog dumps keyboard focus back to the top of
   * the document and the visitor loses their place in the list.
   */
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => restoreFocusRef.current?.focus();
  }, []);

  // Lock body scroll while open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft" && onPrevious) {
        event.preventDefault();
        onPrevious();
        return;
      }
      if (event.key === "ArrowRight" && onNext) {
        event.preventDefault();
        onNext();
        return;
      }

      // Focus trap: keep Tab inside the dialog.
      if (event.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])',
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
    },
    [onClose, onNext, onPrevious],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${track.title}`}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6"
      onClick={(event) => {
        // Backdrop click closes, but a click inside the panel must not.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="flex w-full max-w-5xl flex-col gap-3"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate font-display text-lg font-medium text-white sm:text-xl">
              {track.title}
            </h2>
            {track.originalArtist ? (
              <p className="truncate text-sm text-white/60">
                Originally {track.originalArtist}
              </p>
            ) : null}
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.8} />
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            /*
             * `key` forces a fresh iframe when the track changes. Without it,
             * React reuses the element and only swaps the src, which YouTube's
             * player handles inconsistently: it can keep playing the previous
             * video's audio over the new one.
             */
            key={track.id}
            src={`https://www.youtube-nocookie.com/embed/${track.id}?autoplay=1&rel=0&modestbranding=1`}
            title={track.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPrevious?.()}
              disabled={!onPrevious}
              aria-label="Previous track"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={() => onNext?.()}
              disabled={!onNext}
              aria-label="Next track"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={20}
                strokeWidth={1.8}
              />
            </button>
          </div>

          <a
            href={watchUrl(track.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * A thumbnail that opens the player.
 *
 * Deliberately a <button>, not a div with an onClick: it must be reachable by
 * keyboard and announce itself. The old site's VideoCard was a bare <div
 * onClick>, invisible to keyboard and screen reader users alike.
 */
interface VideoThumbnailProps {
  track: Track;
  onPlay: () => void;
  className?: string;
  /** Larger type and a bigger play affordance, for the featured row. */
  size?: "sm" | "md";
}

export function VideoThumbnail({
  track,
  onPlay,
  className,
  size = "md",
}: VideoThumbnailProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play ${track.title}`}
      className={cn("group flex w-full flex-col gap-3 text-left", className)}
    >
      <div className="relative w-full overflow-hidden rounded-md bg-muted">
        <img
          src={thumbnailUrl(track.id)}
          alt=""
          width={480}
          height={360}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          /*
           * YouTube's hqdefault is 4:3 with black bars top and bottom on 16:9
           * video. Scaling up and cropping to aspect-video removes them.
           */
          className={cn(
            "aspect-video w-full scale-[1.35] object-cover transition-[transform,opacity] duration-500",
            "group-hover:scale-[1.42]",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Play affordance. Sits above the image, ignores pointer events. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-[2px]",
              "transition-[transform,background-color] duration-300",
              "group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110",
              size === "md" ? "h-14 w-14" : "h-11 w-11",
            )}
          >
            <HugeiconsIcon
              icon={PlayIcon}
              size={size === "md" ? 24 : 19}
              strokeWidth={2}
              className="translate-x-[1px]"
            />
          </span>
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <h3
          className={cn(
            "font-display font-medium transition-colors group-hover:text-primary",
            size === "md" ? "text-lg" : "text-base",
          )}
        >
          {track.title}
        </h3>
        {track.originalArtist ? (
          <p className="text-sm text-muted-foreground">
            Originally {track.originalArtist}
          </p>
        ) : null}
      </div>
    </button>
  );
}
