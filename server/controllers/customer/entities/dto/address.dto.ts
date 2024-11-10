import { z } from "zod";

export const addressSchema = z.object({
  company: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  street_number: z.string().max(10),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  postal_code: z.string().max(20),
  country: z.string().default("France"),
});

// Schéma spécifique pour valider seulement le type
export const addressTypeSchema = z.enum(["shipping", "billing"]);

export type AddressInputDTO = z.infer<typeof addressSchema>;
