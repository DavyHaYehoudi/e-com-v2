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

  if (query.codePromo) {
    preprocessedQuery.codePromo = query.codePromo;
  }else{
    preprocessedQuery.codePromo = null; // Défaut à null
  }

  if (query.giftCardIds) {
    preprocessedQuery.giftCardIds = Array.isArray(query.giftCardIds)
      ? query.giftCardIds.map(Number) // Assurer que ce sont des nombres
      : [Number(query.giftCardIds)];
  } else {
    preprocessedQuery.giftCardIds = []; // Défaut à un tableau vide
  }

  if (query.shippingMethodId) {
    preprocessedQuery.shippingMethodId = Number(query.shippingMethodId);
  }else{
    preprocessedQuery.shippingMethodId = null; // Défaut à null
  }

  return preprocessedQuery;
};

// Types dérivés pour PaymentAmount
export type PaymentAmountDTO = z.infer<typeof paymentAmountSchema>;
