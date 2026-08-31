import { Message01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "~/lib/utils";

/**
 * Safaricom Skiza ringtone code.
 *
 * WHY THIS IS ON THE SITE AT ALL
 * ------------------------------
 * Skiza is Safaricom's caller-ringback service and it pays artists per
 * subscriber. Seven of her ten recordings have a code, and the old site never
 * mentioned any of them: the codes only existed buried in her YouTube video
 * titles, in the middle of a marketing string. For a Kenyan artist this is a
 * real, recurring revenue stream, so it belongs where fans can act on it.
 *
 * The interaction is `SMS <code> to 811`. On a phone the whole thing is a
 * tappable `sms:` link that opens the composer with the number and body
 * prefilled, which removes every step between "I like this song" and
 * subscribing. On desktop the same markup still reads correctly as
 * instructions, since `sms:` simply does nothing there.
 */
export function SkizaBadge({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  /*
   * `sms:811?body=CODE` — the `?body=` form is what iOS and modern Android
   * both accept. Android historically wanted `?` and iOS `&`, but the single
   * `?body=` on a bare number is now handled by both.
   */
  const href = `sms:811?body=${encodeURIComponent(code)}`;

  return (
    <a
      href={href}
      className={cn(
        "group inline-flex w-fit items-center gap-3 rounded-md border border-border bg-card px-4 py-3 transition-colors hover:border-primary/50",
        className,
      )}
    >
      <HugeiconsIcon
        icon={Message01Icon}
        size={18}
        strokeWidth={1.8}
        className="shrink-0 text-primary"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-xs text-muted-foreground">
          Set as your Skiza tune
        </span>
        <span className="font-display text-sm">
          SMS{" "}
          <span className="tabular-nums text-primary">{code}</span> to 811
        </span>
      </span>
    </a>
  );
}
