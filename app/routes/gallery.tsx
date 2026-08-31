import { ImageViewer, useImageViewer } from "~/components/image-viewer";
import { Image } from "~/components/image";
import { Container, Section, SectionHeading } from "~/components/section";
import { GALLERY } from "~/content/gallery";
import { pageMeta } from "~/lib/meta";

import type { Route } from "./+types/gallery";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "Gallery",
    description:
      "Photographs of Serah Ke performing, in the studio, and receiving her honorary music industry award.",
    path: "/gallery",
  });

/**
 * Gallery.
 *
 * WHY MASONRY (CSS columns) AND NOT A GRID
 * ----------------------------------------
 * The first version used `grid grid-cols-4` with a couple of `col-span-2`
 * feature tiles. It looked broken, and the cause is structural rather than
 * cosmetic: this set mixes four portrait photographs (up to 3712x5126) with six
 * landscape ones, and every tile keeps its own aspect ratio. In a fixed grid,
 * row height is set by the tallest item in the row, so a portrait tile next to
 * a landscape one leaves a column-width of dead space beneath the short one.
 * With ten mixed-orientation photos that produced two entirely empty tiles in
 * the last row.
 *
 * CSS multi-column flows each item into the shortest available column instead,
 * so mixed aspect ratios pack tightly with no gaps and no per-image layout
 * maths. The trade-off is that column flow is top-to-bottom then left-to-right,
 * so visual order differs from DOM order. That is acceptable here: these are
 * photographs with no narrative sequence, and the viewer navigates in DOM order
 * regardless.
 *
 * `break-inside: avoid` on each figure is what stops a photograph being sliced
 * across a column boundary.
 */
export default function Gallery() {
  const viewer = useImageViewer();

  return (
    <>
      <Section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            size="lg"
            title="Gallery"
            description="On stage, in the studio, and the honorary award."
          />

          <div className="mt-12 gap-3 [column-count:2] sm:gap-4 lg:[column-count:3]">
            {GALLERY.map((photo, index) => (
              <figure
                key={photo.slug}
                /*
                 * mb matches the column gap so vertical and horizontal rhythm
                 * agree; break-inside-avoid keeps a photo whole.
                 */
                className="mb-3 break-inside-avoid sm:mb-4"
              >
                <button
                  type="button"
                  onClick={() => viewer.open(index)}
                  aria-label={`View: ${photo.caption ?? photo.alt}`}
                  className="group block w-full cursor-zoom-in text-left"
                >
                  <Image
                    slug={photo.slug}
                    alt={photo.alt}
                    imgClassName="transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    /*
                     * Two columns on mobile, three from lg. A tile is never
                     * more than half the viewport, so telling the browser 50vw
                     * / 33vw stops it fetching variants far wider than needed.
                     */
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="overflow-hidden rounded-md"
                  />
                  {photo.caption ? (
                    <figcaption className="mt-2 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      {photo.caption}
                    </figcaption>
                  ) : null}
                </button>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {viewer.index !== null ? (
        <ImageViewer
          photos={GALLERY}
          index={viewer.index}
          onClose={viewer.close}
          onIndexChange={viewer.setIndex}
        />
      ) : null}
    </>
  );
}
