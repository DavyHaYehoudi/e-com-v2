import { z } from "zod";

export const updateCustomerSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone number should contain only digits.")
    .length(10)
    .optional(), // Numéro de téléphone doit être de 10 chiffres
  email_marketing_consent: z.boolean().optional(),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date format must be YYYY-MM-DD.")
    .optional(),
});
