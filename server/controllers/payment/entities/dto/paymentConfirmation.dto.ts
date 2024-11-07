import { z } from "zod";

// Schéma pour valider l'adresse dans une commande
export const addressSchema = z.object({
  company: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  street_number: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  postal_code: z.string(),
  country: z.string().optional(),
});

// Schéma pour valider les informations d'une commande
export const createOrderSchema = z.object({
  codePromo: z.string().optional().nullable().default(null),
  cashBackToSpend: z.number().min(0).nullable().optional().default(null),
  shippingMethodId: z.number().int(),
  order_address_shipping: addressSchema,
  order_address_billing: addressSchema,
  giftCardIds: z.array(z.number().int()).optional().default([]),
});

// Schema pour la création d'une commande
export interface orderSchema {
  customerId: number;
  orderStatusId: number;
  paymentStatusId: number;
  confirmationNumber: string;
  codePromoAmount: number | null;
  totalPromoProducts: number | null;
  totalPrice: number;
  shippingPrice: number;
  cashBackEarned: number | null;
  cashBackSpent: number | null;
  totalWeight: number | null;
}
// Types dérivés pour PaymentConfirmation
export type PaymentConfirmationDTO = z.infer<typeof createOrderSchema>;
export type AddressConfirmationDTO = z.infer<typeof addressSchema>;
