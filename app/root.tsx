import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Image } from "~/components/image";
import { PageTransition } from "~/components/motion/page-transition";
import { ScrollProgress } from "~/components/motion/primitives";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import { buttonStyles } from "~/components/ui/button";
import { SITE } from "~/content/site";

import type { Route } from "./+types/root";
import "./app.css";

export const meta: Route.MetaFunction = () => [
  { title: `${SITE.name} | ${SITE.tagline}` },
  { name: "description", content: SITE.description },
];

/**
 * Favicons, generated from her real logo mark by scripts/generate-favicons.mjs.
 *
 * The SVG is listed first so modern browsers use the crisp vector at any size;
 * the PNGs are fallbacks. The mark is rendered in brand gold on the dark
 * surface, because the source logo asset is hardcoded black and disappears
 * against a dark browser tab.
 */
export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  { rel: "icon", href: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
  { rel: "manifest", href: "/site.webmanifest" },
];

/**
 * The layout, defined ONCE.
 *
 * The old site had no layout route at all: every page component individually
 * imported and rendered <HomeHeader /> and <HomeFooter />. The About page
 * rendered AboutAddition, which rendered a SECOND <HomeFooter />, so that page
 * shipped two footers.
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    /*
     * `className="dark"` is set on the server so the first paint is already
     * dark. This site does not offer a light toggle: it is photography-led and
     * every image is low-key. The light tokens exist in app.css regardless,
     * because a half-defined theme is how a token ends up undefined.
     */
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#231d16" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <SiteFooter />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let heading = "Something went wrong";
  let details = "An unexpected error occurred. Please try again.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    heading = error.status === 404 ? "Page not found" : "Something went wrong";
    details =
      error.status === 404
        ? "That page does not exist, or it has moved."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-center lg:gap-16">
            <div className="flex min-w-0 max-w-xl flex-col items-start gap-5">
              <p className="font-display text-sm text-primary">
                {isRouteErrorResponse(error) ? error.status : "Error"}
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
                {heading}
              </h1>
              <p className="text-muted-foreground">{details}</p>

              {/*
                A 404 should offer somewhere to go, not just apologise. These
                are the two things almost anyone landing here actually wants.
              */}
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <a href="/music" className={buttonStyles()}>
                  Listen to the music
                </a>
                <a href="/" className={buttonStyles({ variant: "outline" })}>
                  Back to home
                </a>
              </div>
            </div>

            {is404 ? (
              <div className="min-w-0">
                <Image
                  slug="awards-sit"
                  alt="Serah in a black wide-brimmed hat and red plaid shirt, seated in a pink armchair."
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="rounded-lg"
                />
              </div>
            ) : null}
          </div>

          {stack ? (
            <pre className="mt-8 w-full overflow-x-auto border border-border bg-muted p-4 text-xs">
              <code>{stack}</code>
            </pre>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
