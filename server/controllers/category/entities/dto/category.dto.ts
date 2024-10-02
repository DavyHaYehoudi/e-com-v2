import { z } from 'zod';

// Schéma pour valider la création d'une catégorie(POST)
export const createCategorySchema = z.object({
  label: z.string().min(1, { message: "Le nom de la catégorie est requis." }),
  parent_collection_id: z.number(),
  is_archived: z.boolean().optional(),
});

// Schéma pour valider la modification d'une catégorie (PATCH)
export const updateCategorySchema = z.object({
  label: z.string().min(1, { message: "Le nom de la catégorie est requis." }).optional(),
  parent_collection_id: z.number().optional(),
  is_archived: z.boolean().optional(),
});

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
