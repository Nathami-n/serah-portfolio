import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Coffee02Icon } from "@hugeicons/core-free-icons";
import { useCallback, useEffect, useRef, useState } from "react";

import { buttonStyles } from "~/components/ui/button";
import type { ButtonSize, ButtonVariant } from "~/components/ui/button";
import { SUPPORT } from "~/content/site";
import { cn } from "~/lib/utils";

export const TRIGGER_STYLE = {
  button: "button",
  link: "link",
} as const;
type TriggerStyle = (typeof TRIGGER_STYLE)[keyof typeof TRIGGER_STYLE];

/**
 * "Buy me a coffee" trigger plus the embedded CitaPay checkout.
 *
 * A native <dialog> rather than a dependency: showModal() gives focus
 * trapping, Escape to close and an inert background for free. On phones it
 * sits as a bottom sheet, on larger screens as a centred panel.
 *
 * The iframe mounts only once the dialog is opened, so the checkout costs
 * nothing for visitors who never click.
 */
export function SupportDialog({
  trigger = TRIGGER_STYLE.button,
  label = SUPPORT.cta,
  variant = "primary",
  size = "md",
  className,
}: {
  trigger?: TriggerStyle;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  const open = useCallback(() => {
    setMounted(true);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Clicking the backdrop (the dialog element itself, outside the panel) closes it.
  const onBackdropClick = useCallback((event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }, []);

  // Lock page scroll while the sheet is open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const handleOpen = useCallback(() => {
    document.documentElement.style.overflow = "hidden";
    open();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={
          trigger === TRIGGER_STYLE.link
            ? cn(
                "inline-flex w-fit items-center gap-2 py-2 text-sm text-primary transition-colors hover:text-primary/80",
                className,
              )
            : buttonStyles({ variant, size, className })
        }
      >
        <HugeiconsIcon icon={Coffee02Icon} size={18} strokeWidth={1.8} />
        {label}
      </button>

      <dialog
        ref={dialogRef}
        onClick={onBackdropClick}
        aria-labelledby="support-dialog-title"
        className="m-0 mt-auto h-[92dvh] max-h-none w-full max-w-none overflow-hidden rounded-t-xl border border-border bg-background p-0 text-foreground backdrop:bg-black/60 sm:m-auto sm:h-[min(820px,90dvh)] sm:max-w-lg sm:rounded-xl"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3">
            <h2 id="support-dialog-title" className="font-display text-lg font-semibold">
              {SUPPORT.dialogTitle}
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label={SUPPORT.close}
              className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={1.8} />
            </button>
          </div>

          <div className="min-h-0 flex-1 bg-white">
            {mounted ? (
              <iframe
                src={SUPPORT.href}
                title={`${SUPPORT.dialogTitle}, ${SUPPORT.provider.name} checkout`}
                allow="payment"
                className="size-full border-0"
              />
            ) : null}
          </div>

          <div className="flex flex-col gap-2 border-t border-border/60 px-5 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <a
              href={SUPPORT.provider.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              {SUPPORT.poweredBy}
              <img src={SUPPORT.provider.logo} alt="" width={20} height={16} className="h-4 w-auto" />
              <span className="font-medium text-foreground">{SUPPORT.provider.name}</span>
            </a>
            <a
              href={SUPPORT.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {SUPPORT.fallback}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
