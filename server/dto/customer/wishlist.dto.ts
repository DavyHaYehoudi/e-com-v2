import { z } from "zod";
import { parseISO, isValid } from "date-fns";

// Schéma pour les items dans la wishlist
export const WishlistItemSchema = z.object({
  product_id: z.number(),
  quantity: z.number().min(1),
  adding_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Le format de la date doit être YYYY-MM-DD.")
    .refine((date) => isValid(parseISO(date)), {
      message: "La date doit être valide.",
    }),
});

// Schéma pour les gift cards dans la wishlist
export const GiftCardSchema = z.object({
  quantity: z.number().min(1),
  amount: z.number().min(0),
  adding_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Le format de la date doit être YYYY-MM-DD.")
    .refine((date) => isValid(parseISO(date)), {
      message: "La date doit être valide.",
    }),
});

// Schéma pour l'ensemble de la wishlist
export const WishlistInputSchema = z.object({
  items: z.array(WishlistItemSchema),
  gift_cards: z.array(GiftCardSchema),
});

// Type des données entrantes validées avec Zod
export type WishlistInput = z.infer<typeof WishlistInputSchema>;
