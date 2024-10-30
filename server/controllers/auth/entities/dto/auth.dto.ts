import { z } from "zod";

// Schéma pour un élément de la wishlist
const wishlistItemSchema = z.object({
  product_id: z.number(),
});

// Schéma complet de la wishlist
const wishlistSchema = z.array(wishlistItemSchema).default([]);

// Schéma pour un élément d'item dans le panier
const cartItemSchema = z.object({
  product_id: z.number(),
  quantity: z.number().positive(),
  variant: z.string().optional().nullable().default(null),
});

// Schéma pour un élément de carte cadeau dans le panier
const cartGiftCardSchema = z.object({
  amount: z.number().positive(),
  quantity: z.number().positive(),
});

// Schéma complet du panier
const cartSchema = z.object({
  items: z.array(cartItemSchema).default([]),
  gift_cards: z.array(cartGiftCardSchema).default([]),
});

// Schéma principal pour l'authentification avec wishlist et cart
export const authRequestSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  wishlist: wishlistSchema,
  cart: cartSchema,
});

// Export des types pour une utilisation externe
export type WishlistItem = z.infer<typeof wishlistItemSchema>;
export type Wishlist = z.infer<typeof wishlistSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type CartGiftCard = z.infer<typeof cartGiftCardSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type AuthRequestDTO = z.infer<typeof authRequestSchema>;
