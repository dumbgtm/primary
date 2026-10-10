import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    // Where the idea sits in the dumb idea loop.
    stage: z.enum(['dumb', 'working', 'everywhere', 'boring']).optional(),
    draft: z.boolean().default(false),
    // Optional FAQ: rendered at the end of the post and as FAQPage structured data.
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    // Optional sources: rendered as a numbered list and as citations in structured data.
    sources: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          publisher: z.string().optional(),
          date: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

// Dumb Ideas: the long-form slide pieces. The markdown body is split into slides
// on each `---` line; the first image in a slide becomes that slide's visual.
const ideas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    stage: z.enum(['dumb', 'working', 'everywhere', 'boring']).optional(),
    draft: z.boolean().default(false),
    // Card image on the Dumb Ideas page (e.g. /ideas/<slug>/cover.png). Falls back to the share image.
    cover: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z
      .array(z.object({ title: z.string(), url: z.string().url(), publisher: z.string().optional(), date: z.string().optional() }))
      .default([]),
  }),
});

export const collections = { blog, ideas };
