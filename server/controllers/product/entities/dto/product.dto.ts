import { RowDataPacket } from "mysql2";
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

// Schéma pour valider les paramètres de requête (GET /products)
export const productQueriesSchema = z.object({
  name: z.string().optional(), // nom du produit, optionnel
  category_ids: z.array(z.number().int()).optional().default([]), // Défaut à un tableau vide
  tag_ids: z.array(z.number().int()).optional().default([]), // Défaut à un tableau vide
  min_price: z.number().optional(), // prix minimum, optionnel
  max_price: z.number().optional(), // prix maximum, optionnel
  on_promotion: z.boolean().optional(), // promotion, optionnel
  is_new: z.boolean().optional(), // nouveauté, optionnel
  sort_by_sales: z.boolean().optional(), // meilleures ventes, optionnel
  collection_ids: z.array(z.number().int()).optional().default([]), // Défaut à un tableau vide
  limit: z.number().optional(),
});

// Fonction de prétraitement des requêtes pour la récupération des produits
export const preprocessProductQueries = (query: any) => {
  const preprocessedQuery: any = {};

  if (query.name) {
    preprocessedQuery.name = query.name;
  }

  preprocessedQuery.category_ids = query.category_ids
    ? query.category_ids.split(",").map(Number)
    : []; // Défaut à un tableau vide

  preprocessedQuery.tag_ids = query.tag_ids
    ? query.tag_ids.split(",").map(Number)
    : []; // Défaut à un tableau vide

  preprocessedQuery.min_price = query.min_price
    ? Number(query.min_price)
    : undefined;
  preprocessedQuery.max_price = query.max_price
    ? Number(query.max_price)
    : undefined;

  preprocessedQuery.on_promotion =
    query.on_promotion === "true" ? true : undefined;
  preprocessedQuery.is_new = query.is_new === "true" ? true : undefined;
  preprocessedQuery.sort_by_sales =
    query.sort_by_sales === "true" ? true : undefined;

  preprocessedQuery.collection_ids = query.collection_ids
    ? query.collection_ids.split(",").map(Number)
    : []; // Défaut à un tableau vide
  preprocessedQuery.limit = query.limit ? Number(query.limit) : undefined;

  return preprocessedQuery;
};

// Types dérivés pour Product
export type ProductQueriesDTO = z.infer<typeof productQueriesSchema>;

export interface ProductUpdateStock extends RowDataPacket {
  quantity_in_stock: number;
  continue_selling: boolean;
}
