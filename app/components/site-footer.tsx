import { Link } from "react-router";

import { Logo } from "~/components/logo";
import { NAV_LINKS, SITE, SOCIAL_LINKS, whatsappLink } from "~/content/site";

/**
 * Site footer.
 *
 * Same link array as the header, so the two cannot drift apart. The old footer
 * hardcoded its own copy of the six links inside a <ul> that contained <div>s
 * containing <Link>s with no <li> anywhere, which is invalid markup.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-sm flex-col gap-3">
            <Link to="/" className="flex items-center" aria-label={`${SITE.name}, home`}>
              <Logo variant="full" title={null} className="h-12 w-auto" />
            </Link>
            <p className="text-sm leading-[1.65] text-muted-foreground">
              {SITE.tagline}. Based in {SITE.location}.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 w-fit py-2 text-sm text-primary transition-colors hover:text-primary/80"
            >
              Enquire about a booking
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div className="flex flex-col gap-3">
              <h2 className="text-xs font-medium text-muted-foreground">
                Pages
              </h2>
              <ul className="flex flex-col gap-0.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="inline-block py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xs font-medium text-muted-foreground">
                Elsewhere
              </h2>
              <ul className="flex flex-col gap-0.5">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="-my-1 inline-block py-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE.name}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="-my-2 inline-block py-2 transition-colors hover:text-foreground"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
