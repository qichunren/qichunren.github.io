import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://qichunren.me",
  integrations: [sitemap()],
  output: "static",
  legacy: {
    collectionsBackwardsCompat: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
