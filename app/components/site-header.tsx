import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { Logo } from "~/components/logo";
import { buttonStyles } from "~/components/ui/button";
import { NAV_LINKS, SITE, whatsappLink } from "~/content/site";
import { cn } from "~/lib/utils";

/**
 * Site header.
 *
 * The old HomeHeader.jsx was 248 lines that hardcoded the same six links in
 * FOUR separate JSX blocks (small nav, small dropdown, large nav, large
 * dropdown). They had already drifted: two links were dead, one used `path=`
 * instead of `to=`, and a "Pages" dropdown toggled with
 * `setMiniNav(!setMiniNav)` — negating the setter function, which is always
 * false. Here the links come from one array in content/site.ts and are rendered
 * twice, by the same map.
 *
 * Accessibility, all of which the old header lacked: the trigger is a real
 * <button> with aria-expanded and aria-controls (it was an <a href="#">),
 * Escape closes the menu, focus returns to the trigger on close, and the menu
 * closes on navigation.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Close on navigation. Without this the menu stays open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Escape closes, and focus goes back to the trigger that opened it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:h-18 lg:px-8">
        {/*
          Her real logo, inlined via the Logo component so it inherits
          currentColor. The old site rendered the raw black SVG inside a white
          `rounded-full` border, because the asset is hardcoded #000000 and was
          otherwise invisible.
        */}
        <Link to="/" className="flex items-center" aria-label={`${SITE.name}, home`}>
          <Logo variant="full" title={null} className="h-9 w-auto sm:h-10" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  "text-sm transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ size: "sm", className: "hidden sm:inline-flex" })}
          >
            Book Serah
          </a>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            <HugeiconsIcon
              icon={open ? Cancel01Icon : Menu01Icon}
              size={22}
              strokeWidth={1.8}
            />
          </button>
        </div>
      </div>

      {/*
        Rendered but hidden rather than unmounted, so the CSS transition has
        something to animate and screen readers get a stable node. `hidden`
        via inert-style attributes keeps it out of the tab order when closed.
      */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border/60 bg-background md:hidden"
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2 sm:px-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  "border-b border-border/40 py-4 font-display text-lg transition-colors last:border-0",
                  isActive ? "text-primary" : "text-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ className: "my-4 w-full" })}
          >
            Book Serah
          </a>
        </nav>
      </div>
    </header>
  );
}
