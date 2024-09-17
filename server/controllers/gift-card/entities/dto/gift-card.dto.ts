import { z } from "zod";

// Schéma pour valider la création d'une carte cadeau (POST)
export const createGiftCardSchema = z.object({
  first_holder_id: z.number({
    required_error: "L'ID du détenteur initial est requis.",
  }), // Requis car l'admin attribue la carte à un client particulier
  initial_value: z.number().min(0, {
    message: "La valeur initiale doit être supérieure ou égale à 0.",
  }), // Requis et doit être positif ou égal à 0
  is_issued_by_admin: z.literal(true), // Toujours true car émis par l'admin
  expiration_date: z.string({
    required_error: "La date d'expiration est requise.",
  }), // Requis
  order_id: z.null(), // Toujours null car c'est un cadeau sans commande
});

// Typage TypeScript dérivé des schémas Zod
export type CreateGiftCardDTO = z.infer<typeof createGiftCardSchema>;
