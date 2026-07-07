import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const principios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/principios' }),
  schema: z.object({
    numero: z.number(),
    titulo: z.string(),
    resumen: z.string(),
    autores: z.array(z.string()).default([]),
  }),
});

export const collections = { principios };
