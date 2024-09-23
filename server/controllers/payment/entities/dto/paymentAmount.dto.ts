import { z } from "zod";

// Schéma pour valider les paramètres de la route GET /payment/amount
export const paymentAmountSchema = z.object({
  codePromo: z.string().nullable().optional().default(null),
  giftCardIds: z.array(z.number().int()).optional().default([]), // Ajout d'un tableau vide par défaut
  shippingMethodId: z.number(),
  cashBackToSpend: z.number().min(0).nullable().optional().default(null),
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

  preprocessedQuery.shippingMethodId = Number(query.shippingMethodId);
  preprocessedQuery.cashBackToSpend = query.cashBackToSpend ? Number(query.cashBackToSpend) : null;

  return preprocessedQuery;
};


// Types dérivés pour PaymentAmount
export type PaymentAmountDTO = z.infer<typeof paymentAmountSchema>;

// Interface pour le cashback
export interface CashBackDetails {
  toEarn: number | null; // Cashback à gagner
  toSpend: number | null; // Cashback à utiliser
  overageToSpend: number | null; // Montant de cashback excédentaire à utiliser
  newBalance: number | null; // Nouveau solde de cashback après utilisation
}

// Interface pour la réponse PaymentAmount
export interface PaymentAmountResponse {
  orderAmount: number; // Montant total de la commande après calcul
  codePromoAmount: number | null; // Montant de la réduction de code promo (peut être null)
  codePromoPercentage: number | null; // Pourcentage de réduction du code promo (peut être null)
  totalWeight: number; // Poids total de la commande
  shippingPrice: number; // Prix de la livraison
  totalPromotionAmount: number; // Montant total des promotions appliquées
  cashBack: CashBackDetails; // Détails du cashback
}
