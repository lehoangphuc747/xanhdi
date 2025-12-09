import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define the Hành Trình (journey) collection
// Only load .mdx files, excluding README.md
const hanhTrinhCollection = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/hanh-trinh' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
    previewImages: z.array(z.string()).optional(),
  }),
});

// Define the Tin Tức (news) collection
const tinTucCollection = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/tin-tuc' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    previewImages: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  'hanh-trinh': hanhTrinhCollection,
  'tin-tuc': tinTucCollection,
};
