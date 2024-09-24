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
