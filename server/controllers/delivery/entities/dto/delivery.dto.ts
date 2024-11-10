import { z } from "zod";

// Schéma pour valider la création d'une méthode de livraison (POST)
export const createDeliverySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Le nom de la méthode de livraison est requis." }),
  icon_url: z.string().optional(),
  is_active: z.boolean().optional(),
  is_default: z.boolean().optional(),
  is_free: z.boolean().optional(),
  rates: z.array(
    z.object({
      min_weight: z.number().min(0, {
        message: "Le poids minimum doit être supérieur ou égal à 0.",
      }),
      max_weight: z.number().min(0, {
        message: "Le poids maximum doit être supérieur ou égal à 0.",
      }),
      price: z
        .number()
        .min(0, { message: "Le prix doit être supérieur ou égal à 0." }),
    })
  ),
});

// Schéma pour valider la mise à jour d'une méthode de livraison (PATCH)
export const updateDeliverySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Le nom de la méthode de livraison est requis." })
    .optional(),
  icon_url: z.string().optional(),
  is_active: z.boolean().optional(),
  is_default: z.boolean().optional(),
  is_free: z.boolean().optional(),
  rates: z
    .array(
      z.object({
        min_weight: z
          .number()
          .min(0, {
            message: "Le poids minimum doit être supérieur ou égal à 0.",
          }),
        max_weight: z
          .number()
          .min(0, {
            message: "Le poids maximum doit être supérieur ou égal à 0.",
          }),
        price: z
          .number()
          .min(0, { message: "Le prix doit être supérieur ou égal à 0." })
      })
    )
    .optional(),
});

// Typage TypeScript dérivé des schémas Zod
export type CreateDeliveryDTO = z.infer<typeof createDeliverySchema>;
export type UpdateDeliveryDTO = z.infer<typeof updateDeliverySchema>;
