import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/*
 * Plugin order matters: tailwindcss() before reactRouter() before
 * tsconfigPaths(). This is the order Vercel's React Router documentation
 * specifies, and the same order CitaPay's apps/web/vite.config.ts uses.
 *
 * No `build.rollupOptions.input` here — that is only needed for a CUSTOM
 * server entrypoint (e.g. Hono). We use the default, so omitting it is correct.
 */
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
