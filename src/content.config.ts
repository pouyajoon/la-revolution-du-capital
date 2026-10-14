import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { locales } from './i18n/locales';

const localeEnum = z.enum(locales);

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  locale: localeEnum,
  readingMinutes: z.number().int().positive(),
  heroLede: z.string(),
  fabrication: z.string(),
  chaptersHeading: z.string(),
  fabricationHeading: z.string(),
  draft: z.boolean().default(false),
  /** Titles keyed by stable chapter id */
  chapterTitles: z.record(z.string(), z.string()).optional(),
});

const chapterSchema = z.object({
  title: z.string(),
  description: z.string(),
  locale: localeEnum,
  /** Stable id matching src/data/chapters.ts */
  id: z.string(),
  readingMinutes: z.number().int().positive(),
  draft: z.boolean().default(false),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: pageSchema,
});

const chapters = defineCollection({
  loader: glob({
    pattern: '**/!(_*).md',
    base: './src/content/chapters',
  }),
  schema: chapterSchema,
});

export const collections = { pages, chapters };
