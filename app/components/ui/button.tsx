import type * as React from "react";

import { cn } from "~/lib/utils";

/**
 * Button styles as a plain function rather than a component, so a <Link> or an
 * <a> can wear them without a Slot/asChild indirection. Most buttons on this
 * site are navigation, not actions.
 *
 * Note `transition-colors`, not `transition-all`. Animating `all` means
 * animating layout properties by accident, and it is a listed lazy-motion tell.
 */
const VARIANTS = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-foreground/25",
  ghost: "bg-transparent text-foreground hover:bg-secondary",
} as const;

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
} as const;

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 rounded-md font-medium",
    "transition-colors duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
