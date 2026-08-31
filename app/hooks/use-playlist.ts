import { useCallback, useMemo, useState } from "react";

import type { Track } from "~/content/music";

/**
 * Playlist state for the video player.
 *
 * Holds the index of the playing track rather than the track object, so
 * previous/next are simple bounds checks and there is one source of truth. Both
 * the home page's featured row and the full music page use this, so the
 * player behaves identically in both.
 *
 * Every returned function is wrapped in useCallback: a consumer that puts one
 * of these in a useEffect dependency array would otherwise re-run the effect on
 * every render.
 */
export function usePlaylist(tracks: readonly Track[]) {
  const [index, setIndex] = useState<number | null>(null);

  const play = useCallback((next: number) => setIndex(next), []);
  const close = useCallback(() => setIndex(null), []);

  const previous = useCallback(
    () => setIndex((current) => (current === null ? null : current - 1)),
    [],
  );
  const next = useCallback(
    () => setIndex((current) => (current === null ? null : current + 1)),
    [],
  );

  const current = index === null ? null : (tracks[index] ?? null);

  /*
   * Null rather than a no-op when there is nowhere to go, so the player can
   * disable the button. A no-op function would leave it looking enabled.
   */
  const onPrevious = useMemo(
    () => (index !== null && index > 0 ? previous : null),
    [index, previous],
  );
  const onNext = useMemo(
    () => (index !== null && index < tracks.length - 1 ? next : null),
    [index, next, tracks.length],
  );

  return { current, play, close, onPrevious, onNext };
}
