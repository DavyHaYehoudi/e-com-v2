import * as z from "zod";

export const AddressSchema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  phone: z.string().min(1, "Téléphone requis"),
  email: z.string().email(),
  address: z.string().min(1, "Adresse requise"),
  postalCode: z.string().min(1, "Code postal requis"),
  city: z.string().min(1, "Ville requise"),
  country: z.string().default("France"),
});

export type AddressFormValues = z.infer<typeof AddressSchema>;