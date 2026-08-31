import { ArrowRight01Icon, YoutubeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Reveal } from "~/components/motion/primitives";
import { Container, Section, SectionHeading } from "~/components/section";
import { SkizaBadge } from "~/components/skiza-badge";
import { VideoPlayer, VideoThumbnail } from "~/components/video-player";
import { TRACKS } from "~/content/music";
import { YOUTUBE_CHANNEL } from "~/content/site";
import { usePlaylist } from "~/hooks/use-playlist";
import { breadcrumbSchema, pageMeta } from "~/lib/meta";

import type { Route } from "./+types/music";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "Music",
    description:
      "Serah Ke's recordings: Rhumba and Zilizopendwa covers of Franco, Mpongo Love, Les Wanyika, Brenda Fassie and the Maroon Commandos.",
    path: "/music",
    image: "awards-serahdancing",
  });

/**
 * Music.
 *
 * Everything plays in-page through VideoPlayer, so the visitor never loses the
 * page to a YouTube tab. Nothing from YouTube loads until they actually press
 * play, which means opening this page sets no third-party cookies.
 *
 * The first track gets a large feature treatment and the rest a grid. A flat
 * grid of ten identical tiles is exactly the sameness that makes a page read as
 * generated, and the featured recording is genuinely the one to lead with.
 *
 * The catalogue is curated, not exhaustive, so the page says so and links to
 * the channel rather than implying these ten are everything.
 */
export default function Music() {
  const playlist = usePlaylist();

  const [lead, ...rest] = TRACKS;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: "Music", path: "/music" }])),
        }}
      />
      <Section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            size="lg"
            title="Recordings"
            description="Covers of the songs that built Rhumba and Zilizopendwa. Press play, everything runs here."
          />

          {/* Lead recording, given real room. */}
          {lead ? (
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
              <Reveal className="min-w-0">
                <VideoThumbnail
                  track={lead}
                  size="md"
                  onPlay={() => playlist.play(0)}
                />
              </Reveal>
              <Reveal index={1} className="min-w-0">
                <div className="flex flex-col gap-5">
                  {lead.note ? (
                    <p className="w-full max-w-[46ch] text-base leading-[1.65] text-muted-foreground sm:text-lg">
                      {lead.note}
                    </p>
                  ) : null}
                  {lead.skiza ? <SkizaBadge code={lead.skiza} /> : null}
                </div>
              </Reveal>
            </div>
          ) : null}

          {/* The rest. */}
          <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
            {rest.map((track, i) => (
              <li key={track.id} className="min-w-0">
                <Reveal index={Math.min(i, 4)}>
                  <VideoThumbnail
                    track={track}
                    size="sm"
                    // +1 because `rest` is offset by the lead track.
                    onPlay={() => playlist.play(i + 1)}
                  />
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <div className="mt-14 flex flex-col items-start gap-4 border-t border-border/60 pt-10">
              <h2 className="font-display text-xl font-medium sm:text-2xl">
                There is more on YouTube
              </h2>
              <p className="w-full max-w-[54ch] text-base leading-[1.65] text-muted-foreground">
                This page is a selection. Serah's channel has the full run of
                recordings, live sessions and the newest uploads.
              </p>
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-1 inline-flex items-center gap-2.5 border-b border-foreground/20 pb-2 pt-2 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                <HugeiconsIcon icon={YoutubeIcon} size={18} strokeWidth={1.8} />
                Visit the channel
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={15}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>

      {playlist.index !== null ? (
        <VideoPlayer
          tracks={TRACKS}
          index={playlist.index}
          onClose={playlist.close}
          onIndexChange={playlist.setIndex}
        />
      ) : null}
    </>
  );
}
