import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";

import { Container, Section } from "~/components/section";
import { buttonStyles } from "~/components/ui/button";
import { whatsappLink } from "~/content/site";

/**
 * A page whose content does not exist yet.
 *
 * The old site's Shop and Events were `<div class="grid min-h-screen bg-black
 * place-content-center"><p class="text-7xl uppercase">Coming soon!</p></div>`.
 * A dead end: no explanation, no way forward, and a full black screen that
 * looked broken rather than intentional.
 *
 * A placeholder should still do a job. This one says what is coming, and gives
 * the visitor the action they probably wanted anyway. Someone landing on
 * /events is very likely trying to book her.
 */
interface PlaceholderPageProps {
  title: string;
  description: string;
  /** What the visitor can do right now instead. */
  actionLabel: string;
}

export function PlaceholderPage({
  title,
  description,
  actionLabel,
}: PlaceholderPageProps) {
  return (
    <Section className="py-20 sm:py-28">
      <Container>
        <div className="flex max-w-xl flex-col items-start gap-5">
          <p className="font-display text-sm text-primary">In progress</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            {title}
          </h1>
          <p className="w-full max-w-[52ch] text-base leading-[1.65] text-muted-foreground sm:text-lg">
            {description}
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ size: "lg", className: "mt-2" })}
          >
            <HugeiconsIcon icon={WhatsappIcon} size={19} strokeWidth={1.8} />
            {actionLabel}
          </a>
        </div>
      </Container>
    </Section>
  );
}
