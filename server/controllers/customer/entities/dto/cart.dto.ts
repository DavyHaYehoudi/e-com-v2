import { z } from "zod";

// Schéma pour les items dans le panier
export const CartItemSchema = z.object({
  product_id: z.number(),
  quantity: z.number().min(1),
  variant: z.string().nullable().optional().default(null),
});

// Schéma pour les gift cards dans le panier
export const GiftCardSchema = z.object({
  quantity: z.number().min(1),
  amount: z.number().min(0),
});

// Schéma pour l'ensemble du panier
export const CartInputSchema = z.object({
  items: z.array(CartItemSchema),
  gift_cards: z.array(GiftCardSchema),
});

// Type des données entrantes validées avec Zod
export type CartInputDTO = z.infer<typeof CartInputSchema>;
