import { z } from 'zod';

// Schéma pour valider la création d'une collection (POST)
export const createCollectionSchema = z.object({
  name: z.string().min(1, { message: "Le nom de la collection est requis." }),
  image_url: z.string().url(),
  is_star: z.boolean().optional(),
});

// Schéma pour valider la modification d'une collection (PATCH)
export const updateCollectionSchema = z.object({
  name: z.string().min(1, { message: "Le nom de la collection est requis." }).optional(),
  image_url: z.string().url().optional(),
  is_star: z.boolean().optional(),
});

export type CreateCollectionDTO = z.infer<typeof createCollectionSchema>;
export type UpdateCollectionDTO = z.infer<typeof updateCollectionSchema>;
