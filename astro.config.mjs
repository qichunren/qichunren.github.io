import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://qichunren.me",
  integrations: [sitemap()],
  output: "static",
  legacy: {
    collectionsBackwardsCompat: true,
  },
});
