import type * as React from "react";

import { cn } from "~/lib/utils";

/** Standard max-width and gutters. */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

/**
 * Wider container, for content that should escape the standard measure.
 * Use sparingly: if everything is wide, nothing is.
 */
export function Wide({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[92rem] px-5 sm:px-6 lg:px-10",
        className,
      )}
      {...props}
    />
  );
}

/**
 * NOTE ON PADDING: this is a default rhythm, not a rule. Sections are expected
 * to override it. Identical vertical padding on every section is one of the
 * clearest signals a page was generated rather than designed, so vary it on
 * purpose: tighten a section that acts as a hinge, open one that needs air.
 */
export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-20 sm:py-28", className)} {...props} />;
}

const TITLE_SIZES = {
  sm: "text-2xl sm:text-3xl",
  md: "text-3xl sm:text-4xl",
  lg: "text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]",
} as const;

type HeadingSize = keyof typeof TITLE_SIZES;

interface SectionHeadingProps {
  title: string;
  description?: string;
  /**
   * Sections should not all shout at the same volume.
   *   lg  carries the page
   *   md  the default
   *   sm  supporting or utility
   */
  size?: HeadingSize;
  /** Render as h1 on a page where this is the primary heading. */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  title,
  description,
  size = "md",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Tag className={cn("font-display font-semibold", TITLE_SIZES[size])}>
        {title}
      </Tag>
      {description ? (
        <p className="w-full max-w-[58ch] text-base leading-[1.65] text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
