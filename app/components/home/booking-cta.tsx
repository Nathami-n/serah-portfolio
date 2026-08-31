import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";

import { Reveal } from "~/components/motion/primitives";
import { Container } from "~/components/section";
import { buttonStyles } from "~/components/ui/button";
import { SITE, whatsappLink } from "~/content/site";

/**
 * Booking call to action.
 *
 * WhatsApp is the primary action rather than a contact form. In Kenya that is
 * simply how bookings happen, and it also means there is no form to maintain,
 * no API key to leak and no silent-failure path. The old site's EmailJS form
 * set its success state unconditionally BEFORE the promise resolved, so a
 * failed send still told the visitor "email sent successfully" while the error
 * went to console.log.
 *
 * Email stays as a secondary option for anyone who prefers it.
 */
export function BookingCta() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-lg border border-border bg-card px-6 py-12 sm:px-12 sm:py-16">
            <h2 className="max-w-[20ch] font-display text-3xl font-semibold sm:text-4xl">
              Weddings, corporate events, private functions.
            </h2>
            <p className="w-full max-w-[54ch] text-base leading-[1.65] text-muted-foreground sm:text-lg">
              Serah performs across Kenya, solo or with a full band. Message her
              on WhatsApp with the date, the venue and what you have in mind.
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ size: "lg" })}
              >
                <HugeiconsIcon icon={WhatsappIcon} size={19} strokeWidth={1.8} />
                Message on WhatsApp
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className={buttonStyles({ variant: "outline", size: "lg" })}
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
