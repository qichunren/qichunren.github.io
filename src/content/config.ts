import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z
      .union([z.string(), z.array(z.string())])
      .transform((v) => (typeof v === "string" ? [v] : v))
      .optional()
      .default([]),
  }),
});

const devTips = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

const wiki = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { posts, "dev-tips": devTips, wiki };
