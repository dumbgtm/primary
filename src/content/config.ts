import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).default([]),
    // Where the idea sits in the dumb idea loop.
    stage: z.enum(['dumb', 'working', 'everywhere', 'boring']).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
