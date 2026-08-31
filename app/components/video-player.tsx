import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { useCallback, useEffect, useRef, useState } from "react";

import { SkizaBadge } from "~/components/skiza-badge";
import { type Track, thumbnailUrl, watchUrl } from "~/content/music";
import { YOUTUBE_CHANNEL } from "~/content/site";
import { cn } from "~/lib/utils";

/**
 * Video player.
 *
 * DESIGN GOALS
 * ------------
 * 1. Nothing from YouTube loads until the visitor presses play. The grid shows
 *    a static thumbnail, so opening the music page sets no third-party cookies
 *    and costs no third-party JavaScript. The old site shipped `react-player`
 *    and mounted an iframe immediately, loading YouTube's tracking for everyone
 *    including the majority who never play anything. Once playing, the embed
 *    uses youtube-nocookie.com.
 *
 * 2. It behaves like a playlist, not a lightbox with one video in it. The rail
 *    underneath shows what is playing and what is next, and clicking any entry
 *    switches to it without closing and reopening. That is the difference
 *    between "watch this one video" and "keep listening", which is the whole
 *    point for an artist whose catalogue is the product.
 *
 * 3. Full keyboard control, with the shortcuts actually visible rather than
 *    hidden. The old site's modal could only be dismissed by clicking the
 *    backdrop: no Escape, no focus trap, no focus restore.
 *
 * KEYBOARD
 *   Escape        close
 *   ArrowLeft     previous track
 *   ArrowRight    next track
 *   Tab           cycles within the dialog (focus trap)
 */

interface VideoPlayerProps {
  /** The full list, so the player can show a playlist rail. */
  tracks: readonly Track[];
  /** Index of the playing track within `tracks`. */
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function VideoPlayer({
  tracks,
  index,
  onClose,
  onIndexChange,
}: VideoPlayerProps) {
  const track = tracks[index];

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const hasPrevious = index > 0;
  const hasNext = index < tracks.length - 1;

  const goPrevious = useCallback(() => {
    if (index > 0) onIndexChange(index - 1);
  }, [index, onIndexChange]);

  const goNext = useCallback(() => {
    if (index < tracks.length - 1) onIndexChange(index + 1);
  }, [index, onIndexChange, tracks.length]);

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

  /*
   * Keep the playing entry visible in the rail. Without this, stepping with the
   * arrow keys eventually moves the highlight off-screen and the rail stops
   * being useful.
   */
  useEffect(() => {
    const active = railRef.current?.querySelector<HTMLElement>(
      '[data-active="true"]',
    );
    active?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [index]);

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
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrevious, onClose]);

  if (!track) return null;

  const upNext = tracks[index + 1];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${track.title}`}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div ref={dialogRef} className="flex w-full max-w-5xl flex-col gap-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate font-display text-lg font-medium text-white sm:text-xl">
              {track.title}
            </h2>
            <p className="truncate text-sm text-white/55">
              {track.originalArtist
                ? `Originally ${track.originalArtist}`
                : "Serah Ke"}
              <span className="mx-2 text-white/25">/</span>
              <span className="tabular-nums">
                {index + 1} of {tracks.length}
              </span>
            </p>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.8} />
          </button>
        </div>

        {/* The video */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-white/10">
          <iframe
            /*
             * `key` forces a fresh iframe when the track changes. Without it
             * React reuses the element and only swaps the src, which YouTube's
             * player handles inconsistently: it can keep playing the previous
             * video's audio underneath the new one.
             */
            key={track.id}
            src={`https://www.youtube-nocookie.com/embed/${track.id}?autoplay=1&rel=0&modestbranding=1`}
            title={track.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        {/*
          The Skiza offer, shown while the song is actually playing. This is the
          moment someone decides they like it, which is the only moment the
          offer is welcome rather than an advert.
        */}
        {track.skiza ? (
          <SkizaBadge
            code={track.skiza}
            className="border-white/15 bg-white/5 hover:border-primary/60"
          />
        ) : null}

        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={goPrevious}
              disabled={!hasPrevious}
              aria-label="Previous track"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-25"
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={20}
                strokeWidth={1.8}
              />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!hasNext}
              aria-label="Next track"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-25"
            >
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={20}
                strokeWidth={1.8}
              />
            </button>

            {/* What is coming, so the rail has a reason to exist. */}
            {upNext ? (
              <p className="ml-1 hidden min-w-0 truncate text-sm text-white/45 sm:block">
                Up next: <span className="text-white/70">{upNext.title}</span>
              </p>
            ) : null}
          </div>

          <a
            href={watchUrl(track.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm text-white/55 transition-colors hover:text-white"
          >
            Watch on YouTube
          </a>
        </div>

        {/*
          PLAYLIST RAIL.
          Horizontally scrollable on every size. Hidden below sm, where the
          screen is already mostly video and a rail would push the controls off.
        */}
        <div
          ref={railRef}
          className="hidden gap-2 overflow-x-auto pb-1 sm:flex [scrollbar-width:thin]"
        >
          {tracks.map((item, i) => (
            <button
              key={item.id}
              type="button"
              data-active={i === index}
              onClick={() => onIndexChange(i)}
              aria-label={`Play ${item.title}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "group relative w-32 shrink-0 overflow-hidden rounded text-left transition-opacity",
                i === index ? "opacity-100" : "opacity-45 hover:opacity-80",
              )}
            >
              <div className="relative overflow-hidden rounded bg-white/5">
                <img
                  src={thumbnailUrl(item.id)}
                  alt=""
                  width={480}
                  height={360}
                  loading="lazy"
                  className="aspect-video w-full scale-[1.35] object-cover"
                />
                {i === index ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-black/40"
                  >
                    <HugeiconsIcon
                      icon={PlayIcon}
                      size={16}
                      strokeWidth={2.5}
                      className="text-primary"
                    />
                  </span>
                ) : null}
              </div>
              <p
                className={cn(
                  "mt-1.5 truncate text-xs",
                  i === index ? "text-white" : "text-white/70",
                )}
              >
                {item.title}
              </p>
            </button>
          ))}

          {/* The rail ends by pointing at the rest of the catalogue. */}
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-32 shrink-0 flex-col items-center justify-center rounded border border-dashed border-white/20 px-2 py-4 text-center text-xs text-white/50 transition-colors hover:border-white/40 hover:text-white"
          >
            More on YouTube
          </a>
        </div>

        {/* Keyboard hints. Desktop only: there is no keyboard to hint at on touch. */}
        <p className="hidden text-center text-xs text-white/25 lg:block">
          Arrow keys to change track, Esc to close
        </p>
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
          className={cn(
            "aspect-video w-full scale-[1.35] object-cover transition-[transform,opacity] duration-500",
            "group-hover:scale-[1.42]",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />

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
