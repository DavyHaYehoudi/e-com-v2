import { z } from "zod";

// Schéma pour les items dans la wishlist
export const WishlistItemSchema = z.object({
  product_id: z.number(),
  quantity: z.number().min(1),
});

// Schéma pour les gift cards dans la wishlist
export const GiftCardSchema = z.object({
  quantity: z.number().min(1),
  amount: z.number().min(0),
});

// Schéma pour l'ensemble de la wishlist
export const WishlistInputSchema = z.object({
  items: z.array(WishlistItemSchema),
  gift_cards: z.array(GiftCardSchema),
});

export type WishlistInputDTO = z.infer<typeof WishlistInputSchema>;
 