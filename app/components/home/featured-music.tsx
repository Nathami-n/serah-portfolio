import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, YoutubeIcon } from "@hugeicons/core-free-icons";
import { Link } from "react-router";

import { Reveal } from "~/components/motion/primitives";
import { Container, Section, SectionHeading } from "~/components/section";
import { VideoPlayer, VideoThumbnail } from "~/components/video-player";
import { TRACKS } from "~/content/music";
import { YOUTUBE_CHANNEL } from "~/content/site";
import { usePlaylist } from "~/hooks/use-playlist";

/**
 * Featured recordings.
 *
 * Four tracks, not the whole catalogue: the home page's job is to get someone
 * listening, and the full list lives on /music.
 *
 * Playing happens in-page via VideoPlayer rather than navigating away. The
 * catalogue is explicitly not exhaustive, so the section also links to her
 * YouTube channel, where the rest lives.
 */
const FEATURED = TRACKS.slice(0, 4);

export function FeaturedMusic() {
  const playlist = usePlaylist(FEATURED);

  return (
    <Section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <SectionHeading
            title="Recordings"
            description="Covers of the songs that built the genre."
          />
          <Link
            to="/music"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            All {TRACKS.length} recordings
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {FEATURED.map((track, index) => (
            <li key={track.id} className="min-w-0">
              <Reveal index={index}>
                <VideoThumbnail
                  track={track}
                  size="sm"
                  onPlay={() => playlist.play(index)}
                />
              </Reveal>
            </li>
          ))}
        </ul>

        {/*
          The catalogue on this site is curated, not complete. Saying so and
          pointing at the channel is more useful than implying these ten are
          everything she has recorded.
        */}
        <Reveal index={2}>
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2.5 border-b border-foreground/20 pb-1 text-sm transition-colors hover:border-primary hover:text-primary"
          >
            <HugeiconsIcon icon={YoutubeIcon} size={18} strokeWidth={1.8} />
            More on her YouTube channel
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={15}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>
      </Container>

      {playlist.current ? (
        <VideoPlayer
          track={playlist.current}
          onClose={playlist.close}
          onPrevious={playlist.onPrevious}
          onNext={playlist.onNext}
        />
      ) : null}
    </Section>
  );
}
