import { z } from "zod";

// Schéma pour valider la création d'un commentaire (POST)
export const createReviewSchema = z.object({
  order_id: z.number().nullable().optional(),    // Peut être null ou absent
  product_id: z.number().nullable().optional(),  // Peut être null ou absent
  review_text: z
    .string()
    .min(1, { message: "Le texte du commentaire est requis." })
    .max(500, { message: "Le texte du commentaire ne peut pas dépasser 500 caractères." }), // Limite à 500 caractères
  rating: z
    .number()
    .min(1, { message: "Le nombre d'étoiles doit être au moins 1." })
    .max(5, { message: "Le nombre d'étoiles ne peut pas dépasser 5." })
    .default(5),  // Valeur par défaut : 5
});

// Schéma pour valider la mise à jour d'un commentaire (PATCH)
export const updateReviewCustomerSchema = z.object({
  review_text: z
    .string()
    .min(1, { message: "Le texte du commentaire est requis." })
    .max(500, { message: "Le texte du commentaire ne peut pas dépasser 500 caractères." })
    .optional(),  // Limite à 500 caractères
  rating: z
    .number()
    .min(1, { message: "Le nombre d'étoiles doit être au moins 1." })
    .max(5, { message: "Le nombre d'étoiles ne peut pas dépasser 5." })
    .optional(),
});
// Schéma pour valider la mise à jour d'un commentaire ADMIN (PATCH)
export const updateReviewAdminSchema = z.object({
  toggle_validate: z.boolean()
});

// Types dérivés pour Review
export type CreateReviewDTO = z.infer<typeof createReviewSchema>;
export type UpdateReviewCustomerDTO = z.infer<typeof updateReviewCustomerSchema>;
export type UpdateReviewAdminDTO = z.infer<typeof updateReviewAdminSchema>;