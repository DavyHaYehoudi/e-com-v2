import { z } from "zod";

// Schéma pour valider la création d'une promotion (POST)
export const createDiscountSchema = z.object({
  discount_percentage: z
    .number()
    .min(0)
    .max(100, {
      message: "Le pourcentage de réduction doit être entre 0 et 100.",
    }),
  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "La date de début doit être au format YYYY-MM-DD.",
    }),
  end_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "La date de fin doit être au format YYYY-MM-DD.",
    }),
  target_id: z.number({
    message: "L'identifiant de la table ciblée est requis.",
  }),
});

// Schéma pour valider le type de cible dans la query
export const targetTableSchema = z.enum(["collection", "category", "product"], {
  message: "La table ciblée doit être 'collection', 'category' ou 'product'.",
});

export type CreateDiscountDTO = z.infer<typeof createDiscountSchema>;
export type TargetTableDiscountDTO = z.infer<typeof targetTableSchema>;
