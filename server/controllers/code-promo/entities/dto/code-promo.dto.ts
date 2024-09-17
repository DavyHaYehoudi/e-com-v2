import { z } from "zod";

// Schéma pour valider la création d'une promotion (POST)
export const createCodePromoSchema = z.object({
  code: z.string({
    message: "Le code est requis.",
  }),
  discount_percentage: z.number().min(0).max(100, {
    message: "Le pourcentage de réduction doit être entre 0 et 100.",
  }),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La date de début doit être au format YYYY-MM-DD.",
  }),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La date de fin doit être au format YYYY-MM-DD.",
  }),
});

export type CreateCodePromoDTO = z.infer<typeof createCodePromoSchema>;
