import { useCallback, useState } from "react";

/**
 * Playlist state for the video player.
 *
 * Holds the INDEX of the playing track rather than the track object, so the
 * player can render a rail showing position within the list, and previous/next
 * are simple bounds checks against one source of truth. Both the home page's
 * featured row and the full music page use this, so the player behaves
 * identically in both.
 *
 * Every returned function is wrapped in useCallback: a consumer that put one of
 * these in a useEffect dependency array would otherwise re-run the effect on
 * every render.
 */
export function usePlaylist() {
  const [index, setIndex] = useState<number | null>(null);

  const play = useCallback((next: number) => setIndex(next), []);
  const close = useCallback(() => setIndex(null), []);

  return { index, play, close, setIndex };
}
