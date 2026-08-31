import { vercelPreset } from "@vercel/react-router/vite";
import type { Config } from "@react-router/dev/config";

/*
 * SSR is on. This site's whole job is to be found: by someone searching her
 * name, and by WhatsApp/Instagram/Facebook when a link is shared. Those
 * crawlers need real HTML with real meta tags, which an SPA cannot give them.
 * The old site was a client-rendered SPA with a single global <meta
 * description> and no Open Graph tags at all.
 *
 * `vercelPreset()` is required — Vercel does not zero-config React Router v7.
 * It supplies the build output Vercel expects, per-route function config and
 * route-aware bundle splitting.
 * Verified against @vercel/react-router@1.3.6.
 */
export default {
  ssr: true,
  presets: [vercelPreset()],
} satisfies Config;
