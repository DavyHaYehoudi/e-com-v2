import { z } from "zod";

// Schéma pour valider les paramètres de la route GET /payment/amount
export const paymentAmountSchema = z.object({
  codePromo: z.string().nullable().optional().default(null),
  giftCardIds: z.array(z.number().int()).optional().default([]), // Ajout d'un tableau vide par défaut
  shippingMethodId: z.number().nullable().optional().default(null),
});



// Fonction de prétraitement des requêtes
export const preprocessPaymentAmountQuery = (query: any) => {
  const preprocessedQuery: any = {};

  preprocessedQuery.codePromo = query.codePromo || null;

  if (query.giftCardIds) {
    // Si giftCardIds est déjà un tableau, on map les valeurs à Number
    // Si c'est un seul élément, on le transforme en tableau
    preprocessedQuery.giftCardIds = Array.isArray(query.giftCardIds)
      ? query.giftCardIds.map(Number) // Assurer que ce sont des nombres
      : [Number(query.giftCardIds)];
  } else {
    preprocessedQuery.giftCardIds = []; // Défaut à un tableau vide
  }

  preprocessedQuery.shippingMethodId = query.shippingMethodId ? Number(query.shippingMethodId) : null;

  return preprocessedQuery;
};


// Types dérivés pour PaymentAmount
export type PaymentAmountDTO = z.infer<typeof paymentAmountSchema>;

export interface PaymentAmountResponse {
  amount: number; // Montant total de la commande après calcul
  cashBack: number; // Montant total du cashback
}
