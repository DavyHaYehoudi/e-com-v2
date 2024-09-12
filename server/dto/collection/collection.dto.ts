import { z } from 'zod';

// Schéma pour valider la création d'une collection (POST)
export const createCollectionSchema = z.object({
  label: z.string().min(1, { message: "Le nom de la collection est requis." }),
  image_url: z.string(),
  is_star: z.boolean().optional(),
  is_archived: z.boolean().optional(),
});

// Schéma pour valider la modification d'une collection (PATCH)
export const updateCollectionSchema = z.object({
  label: z.string().min(1, { message: "Le nom de la collection est requis." }).optional(),
  image_url: z.string().optional(),
  is_star: z.boolean().optional(),
  is_archived: z.boolean().optional(),
});

export type CreateCollectionDTO = z.infer<typeof createCollectionSchema>;
