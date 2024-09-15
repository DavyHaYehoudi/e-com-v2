import { z } from "zod";

// Schéma pour valider la création d'un produit (POST)
export const createProductSchema = z.object({
  name: z.string().min(1, { message: "Le nom du produit est requis." }),
  SKU: z.string().optional().nullable(),
  description: z.string(),
  weight: z.number().optional().nullable(),
  continue_selling: z.boolean().default(true),
  quantity_in_stock: z.number().int().min(0).default(0),
  price: z
    .number()
    .min(0, { message: "Le prix doit être supérieur ou égal à 0." }),
  new_until: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "La date de nouveauté doit être au format YYYY-MM-DD.",
    })
    .optional()
    .nullable(),
  cash_back: z.number().optional().nullable(),
  is_published: z.boolean().default(true),
  is_star: z.boolean().default(false),
  is_archived: z.boolean().default(false),
});

// Schéma pour valider la modification d'un produit (PATCH)
export const updateProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Le nom du produit est requis." })
    .optional(),
  SKU: z.string().optional().nullable(),
  description: z.string().optional(),
  weight: z.number().optional().nullable(),
  continue_selling: z.boolean().optional(),
  quantity_in_stock: z.number().int().min(0).optional(),
  price: z
    .number()
    .min(0, { message: "Le prix doit être supérieur ou égal à 0." })
    .optional(),
  new_until: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "La date de nouveauté doit être au format YYYY-MM-DD.",
    })
    .optional()
    .nullable(),
  cash_back: z.number().optional().nullable(),
  is_published: z.boolean().optional(),
  is_star: z.boolean().optional(),
  is_archived: z.boolean().optional(),
});

// Types dérivés pour Product
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
