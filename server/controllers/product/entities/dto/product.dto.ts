import { z } from "zod";

// Schéma pour valider la création d'un produit (POST)
export const productSchema = z.object({
  name: z.string().min(1, { message: "Le nom du produit est requis." }),
  SKU: z.string().nullable(),
  description: z.string(),
  weight: z.number().nullable(),
  continue_selling: z.boolean().default(true),
  quantity_in_stock: z
    .number()
    .int()
    .min(1, { message: "La quantité doit au moins être égale à 1." }),
  price: z
    .number()
    .min(1, { message: "Le prix doit être supérieur ou égal à 1." }),
  new_until: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "La date de nouveauté doit être au format YYYY-MM-DD.",
    })

    .nullable(),
  cash_back: z.number().nullable(),
  is_published: z.boolean().default(true),
  is_star: z.boolean().default(false),
  is_archived: z.boolean().default(false),
  images: z
    .array(
      z.object({
        url: z.string(),
        is_main: z.boolean(),
      })
    )
    .refine((images) => images.some((image) => image.url && image.is_main), {
      message:
        "Au moins une image doit avoir une URL et être marquée comme principale.",
    }),
  categories: z
    .array(z.number().int())
    .min(1, { message: "Au moins une catégorie est requise." }),
  tags: z.array(z.number().int()), 
  variants: z.array(z.string()),
});

// Types dérivés pour Product
export type ProductDTO = z.infer<typeof productSchema>;
