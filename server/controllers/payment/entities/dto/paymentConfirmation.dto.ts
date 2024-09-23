import { z } from 'zod';

// Schéma pour valider l'adresse dans une commande
export const addressSchema = z.object({
    company: z.string().optional(),
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
    codePromo: z.string().optional(),
    cashbackSpent: z.number().min(0).optional(),
    shippingMethodId: z.number().int(),
    order_address_shipping: addressSchema,
    order_address_billing: addressSchema,
    giftCardIds: z.array(z.number().int()).optional(),
});
