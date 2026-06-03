// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// Cloudflare Workers Builds (bun run build + wrangler deploy) needs @cloudflare/vite-plugin
// to emit dist/server/wrangler.json — same as successful CF logs (index.js + worker-entry).
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  plugins: [cloudflare({ viteEnvironment: { name: "ssr" } })],
  tanstackStart: {
    server: { entry: "server" },
  },
});