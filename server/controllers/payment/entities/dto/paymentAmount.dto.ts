import { z } from "zod";

// Schéma pour valider les paramètres de la route GET /payment/amount
export const paymentAmountSchema = z.object({
  codePromo: z.string().nullable().optional().default(null),
  giftCardIds: z.array(z.number().int()).optional().default([]), // Ajout d'un tableau vide par défaut
  shippingMethodId: z.number().int(),
  cashBackToSpend: z.number().min(0).nullable().optional().default(null),
  emailCustomer: z.string().email().nullable().optional().default(null)
});

// Fonction de prétraitement des requêtes
export const preprocessPaymentAmountQuery = (query: any) => {
  const preprocessedQuery: any = {};

  preprocessedQuery.codePromo = query.codePromo || null;
  preprocessedQuery.emailCustomer = query.emailCustomer || null; 

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
  preprocessedQuery.cashBackToSpend = query.cashBackToSpend
    ? Number(query.cashBackToSpend)
    : null;

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
// Interface pour le détail des produits en promotion
export interface orderItem {
  productId: number; // Id du produit
  discount_percentage: number | null; // Montant de la réduction
  price_before_discount: number; // Prix du produit avant la promotion
  article_number: number; // Nombre de produit concernés par la promotion
  variant: string | null; // Variété du produit (peut être null)
}
// Interface pour la réponse PaymentAmount
export interface PaymentAmountResponse {
  orderAmount: number; // Montant total de la commande après calcul
  codePromoAmount: number | null; // Montant de la réduction de code promo (peut être null)
  codePromoPercentage: number | null; // Pourcentage de réduction du code promo (peut être null)
  totalWeight: number; // Poids total de la commande
  shippingPrice: number; // Prix de la livraison
  totalPromotionAmount: number; // Montant total des promotions appliquées
  orderItems: orderItem[];
  amountGiftCardUsed: number; // Montant total utilisé avec les cartes cadeau
  cashBack: CashBackDetails; // Détails du cashback
}
