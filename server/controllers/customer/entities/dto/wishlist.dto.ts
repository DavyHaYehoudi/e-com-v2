import { z } from "zod";

// Schéma Zod pour valider le payload de la requête
export const WishlistInputSchema = z.object({
  items: z.array(
    z.object({
      product_id: z.number().positive(),
    })
  ),
});

export type WishlistInputDTO = z.infer<typeof WishlistInputSchema>;
