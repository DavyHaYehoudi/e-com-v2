import { z } from "zod";

// Schéma pour valider les queries de la route GET
export const orderFiltersSchema = z.object({
  customerId: z.number().int().nullable().optional().default(null),
  order_status_id: z.number().int().nullable().optional().default(null),
  payment_status_id: z.number().int().nullable().optional().default(null),
  confirmation_number: z.string().nullable().optional().default(null),
});

// Fonction pour prétraiter les queries provenant de l'URL
export const preprocessOrderQueries = (query: any) => {
  return {
    customerId: query.customerId ? parseInt(query.customerId, 10) : null,
    order_status_id: query.order_status_id
      ? parseInt(query.order_status_id, 10)
      : null,
    payment_status_id: query.payment_status_id
      ? parseInt(query.payment_status_id, 10)
      : null,
    confirmation_number: query.confirmation_number || null,
  };
};

// Types dérivés pour OrderFilters
export type OrderFiltersDTO = z.infer<typeof orderFiltersSchema>;

export interface OrderInputDTO {
  order_status_id?: number;
  payment_status_id?: number;
  notes_admin?: string;
}

// Schémaa pour valider les entrées du tracking
export const orderTrackingAdminSchema = z.object({
  customer_id: z.number().int(),
  tracking_number: z
    .string()
    .min(1, { message: "Le numéro de suivi est requis." }),
  date_sending: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La date doit être au format YYYY-MM-DD.",
  }),
});
// Types dérivés pour Tracking
export type OrderTrackingAdminDTO = z.infer<typeof orderTrackingAdminSchema>;

export const orderTrackingCustomerSchema = z.object({
  tracking_number: z
    .string()
    .min(1, { message: "Le numéro de suivi est requis." }),
  date_sending: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La date doit être au format YYYY-MM-DD.",
  }),
});
// Types dérivés pour Tracking
export type OrderTrackingCustomerDTO = z.infer<
  typeof orderTrackingCustomerSchema
>;

// Schéma de validation pour créer un message
export const createOrderMessageSchema = z.object({
  sender: z.enum(["admin", "customer"]),
  body: z
    .string()
    .min(1, { message: "Le contenu du message ne peut pas être vide." }),
});

// Schéma de validation pour mettre à jour un message (seulement tant qu'il n'a pas été lu)
export const updateOrderMessageSchema = z.object({
  sender: z.enum(["admin", "customer"]),
  body: z.string().optional(),
  is_read: z.boolean().optional(),
});

// Types dérivés pour l'usage dans le code
export type CreateOrderMessageDTO = z.infer<typeof createOrderMessageSchema>;
export type UpdateOrderMessageDTO = z.infer<typeof updateOrderMessageSchema>;
