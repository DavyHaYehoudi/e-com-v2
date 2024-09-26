import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import {
  BadRequestError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import {
  CategoryIdRow,
  ProductImageRow,
  ProductRow,
  ProductVariantRow,
  TagIdRow,
} from "./dao/product.dao.js";
import {
  ProductDTO,
  ProductUpdateStock,
} from "../../controllers/product/entities/dto/product.dto.js";
import {
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} from "../../utils/transaction.js";
import { orderItem } from "../../controllers/payment/entities/dto/paymentAmount.dto.js";

export const getAllProductsRepository = async (filters: {
  name?: string;
  category_ids?: number[];
  tag_ids?: number[];
  min_price?: number;
  max_price?: number;
  on_promotion?: boolean;
  is_new?: boolean;
  collection_ids?: number[];
  sort_by_sales?: boolean;
  limit?: number;
}) => {
  let sql = `
    SELECT DISTINCT
      p.*, 
      pi.url AS main_image,
      d.discount_percentage,
      IFNULL(SUM(oi.article_number), 0) AS total_sales
    FROM product p
    LEFT JOIN product_image pi 
      ON p.id = pi.product_id 
      AND pi.is_main = true
    LEFT JOIN discount d 
      ON p.id = d.target_id 
      AND d.target_table = 'product'
      AND d.start_date <= CURRENT_DATE
      AND d.end_date >= CURRENT_DATE
    LEFT JOIN product_category pc 
      ON p.id = pc.product_id
    LEFT JOIN category c 
      ON pc.category_id = c.id
    LEFT JOIN collection cl 
      ON c.parent_collection_id = cl.id
    LEFT JOIN order_item oi 
      ON p.id = oi.product_id
  `;

  // Initialisation des clauses WHERE
  const conditions: string[] = [];
  const params: any[] = [];

  // Filtre par nom (recherche partielle)
  if (filters.name) {
    conditions.push(`p.name LIKE ?`);
    params.push(`%${filters.name}%`);
  }

  // Filtre par catégories
  if (filters.category_ids && filters.category_ids.length > 0) {
    conditions.push(
      `pc.category_id IN (${filters.category_ids.map(() => "?").join(",")})`
    );
    params.push(...filters.category_ids);
  }

  // Filtre par tags
  if (filters.tag_ids && filters.tag_ids.length > 0) {
    conditions.push(`EXISTS (
      SELECT 1 FROM product_tag pt 
      WHERE pt.product_id = p.id 
      AND pt.tag_id IN (${filters.tag_ids.map(() => "?").join(",")})
    )`);
    params.push(...filters.tag_ids);
  }

  // Filtre par prix
  if (filters.min_price !== undefined) {
    conditions.push(`p.price >= ?`);
    params.push(filters.min_price);
  }
  if (filters.max_price !== undefined) {
    conditions.push(`p.price <= ?`);
    params.push(filters.max_price);
  }

  // Filtre par promotion active
  if (filters.on_promotion) {
    conditions.push(`d.discount_percentage IS NOT NULL`);
  }

  // Filtre par nouveauté
  if (filters.is_new) {
    conditions.push(`p.new_until >= CURRENT_DATE`);
  }

  // Filtre par collections
  if (filters.collection_ids && filters.collection_ids.length > 0) {
    conditions.push(
      `cl.id IN (${filters.collection_ids.map(() => "?").join(",")})`
    );
    params.push(...filters.collection_ids);
  }

  // Ajout des conditions au SQL
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  // Groupement par produit pour calculer le total des ventes
  sql += `
    GROUP BY p.id, pi.url, d.discount_percentage
  `;

  // Option pour trier par meilleures ventes
  if (filters.sort_by_sales) {
    sql += ` ORDER BY total_sales DESC`; // Trie par total des ventes
  }
  // Limite
  const limit = filters.limit !== undefined ? filters.limit : 0; // 0 signifie pas de limite
  if (limit > 0) {
    sql += ` LIMIT ?`;
    params.push(limit); // Ajout du paramètre de limite
  }
  const results = await query<
    (ProductRow & {
      main_image: string | null;
      discount_percentage: number | null;
      total_sales: number; // Ajout du champ total_sales
    })[]
  >(sql, params);

  return results;
};
export const getProductRepository = async (productId: number) => {
  // Récupérer les informations de base du produit
  const productSql = `
 SELECT id, name, SKU, description, weight, continue_selling, quantity_in_stock, 
        price, new_until, cash_back, is_published, is_star, is_archived, 
        created_at, updated_at
 FROM product 
 WHERE id = ?`;

  const productResult = await query<ProductRow[]>(productSql, [productId]);

  if (productResult.length === 0) {
    throw new NotFoundError(`Product with ID ${productId} not found`);
  }

  const product = productResult[0];

  // Récupérer les images associées au produit
  const imagesSql = `
 SELECT url, is_main 
 FROM product_image 
 WHERE product_id = ?`;

  const imagesResult = await query<ProductImageRow[]>(imagesSql, [productId]);

  // Récupérer les variants associées au produit
  const variantsSql = `
 SELECT combination 
 FROM product_variant 
 WHERE product_id = ?`;

  const variantsResult = await query<ProductVariantRow[]>(variantsSql, [
    productId,
  ]);

  // Récupérer les catégories associées au produit
  const categoriesSql = `
 SELECT category_id 
 FROM product_category 
 WHERE product_id = ?`;

  const categoriesResult = await query<CategoryIdRow[]>(categoriesSql, [
    productId,
  ]);

  // Récupérer les tags associés au produit
  const tagsSql = `
 SELECT tag_id 
 FROM product_tag 
 WHERE product_id = ?`;

  const tagsResult = await query<TagIdRow[]>(tagsSql, [productId]);

  // Construire l'objet produit complet
  const completeProduct = {
    id: product.id,
    name: product.name,
    SKU: product.SKU,
    description: product.description,
    weight: product.weight,
    continue_selling: product.continue_selling,
    quantity_in_stock: product.quantity_in_stock,
    price: product.price,
    new_until: product.new_until,
    cash_back: product.cash_back,
    is_published: product.is_published,
    is_star: product.is_star,
    is_archived: product.is_archived,
    created_at: product.created_at,
    updated_at: product.updated_at,
    images: imagesResult.map((image) => ({
      url: image.url,
      is_main: image.is_main,
    })),
    categories: categoriesResult.map((category) => category.category_id),
    tags: tagsResult.map((tag) => tag.tag_id),
    variants: variantsResult.map((variant) => variant.combination),
  };

  return completeProduct;
};
export const createProductRepository = async (
  productData: ProductDTO
): Promise<ProductRow> => {
  const sql1 = `
    INSERT INTO product (name, SKU, description, weight, continue_selling, quantity_in_stock, price, new_until, cash_back, is_published, is_star, is_archived)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const result = await query<ResultSetHeader>(sql1, [
    productData.name,
    productData.SKU,
    productData.description,
    productData.weight,
    productData.continue_selling,
    productData.quantity_in_stock,
    productData.price,
    productData.new_until,
    productData.cash_back,
    productData.is_published,
    productData.is_star,
    false,
  ]);

  const newProductId = result.insertId;

  // Insérer les images associées
  if (productData.images && productData.images.length > 0) {
    const sql2 = `
      INSERT INTO product_image (url, is_main, product_id)
      VALUES (?, ?, ?)
    `;
    for (const image of productData.images) {
      await query<ResultSetHeader>(sql2, [
        image.url,
        image.is_main,
        newProductId,
      ]);
    }
  }
  // Insérer les variants
  if (productData.variants && productData.variants.length > 0) {
    const sql6 = `
      INSERT INTO product_variant (combination, product_id)
      VALUES (?, ?)
    `;
    for (const variant of productData.variants) {
      await query<ResultSetHeader>(sql6, [variant, newProductId]);
    }
  }

  // Insérer les catégories associées
  if (productData.categories && productData.categories.length > 0) {
    const sql3 = `
      INSERT INTO product_category (product_id, category_id)
      VALUES (?, ?)
    `;
    for (const categoryId of productData.categories) {
      await query<ResultSetHeader>(sql3, [newProductId, categoryId]);
    }
  }

  // Insérer les tags associés
  if (productData.tags && productData.tags.length > 0) {
    const sql4 = `
      INSERT INTO product_tag (product_id, tag_id)
      VALUES (?, ?)
    `;
    for (const tagId of productData.tags) {
      await query<ResultSetHeader>(sql4, [newProductId, tagId]);
    }
  }

  // Retourner le produit créé
  const sql5 = `SELECT * FROM product WHERE id = ?`;
  const [newProduct] = await query<ProductRow[]>(sql5, [newProductId]);
  return newProduct;
};
export const updateProductRepository = async (
  productId: number,
  updatedFields: ProductDTO
) => {
  try {
    await beginTransaction();
    const productFields = {
      name: updatedFields.name,
      SKU: updatedFields.SKU,
      description: updatedFields.description,
      weight: updatedFields.weight,
      continue_selling: updatedFields.continue_selling,
      quantity_in_stock: updatedFields.quantity_in_stock,
      price: updatedFields.price,
      new_until: updatedFields.new_until,
      cash_back: updatedFields.cash_back,
      is_published: updatedFields.is_published,
      is_star: updatedFields.is_star,
      is_archived: updatedFields.is_archived,
    };
    // Filtrer les champs non définis pour ne pas les inclure dans la requête SQL
    const filteredFields = Object.entries(productFields).filter(
      ([_, value]) => value !== undefined
    );

    if (filteredFields.length > 0) {
      const fieldsToUpdate = filteredFields
        .map(([key]) => `${key} = ?`)
        .join(", ");
      const values = filteredFields.map(([_, value]) => value);
      const sqlProduct = `UPDATE product SET ${fieldsToUpdate} WHERE id = ?`;

      const resultProduct = await query<ResultSetHeader>(sqlProduct, [
        ...values,
        productId,
      ]);
      if (resultProduct.affectedRows === 0) {
        throw new NotFoundError(`Product with ID ${productId} not found`);
      }
    }

    // Mise à jour des images du produit
    if (updatedFields.images) {
      // Suppression des images existantes
      const sqlDeleteImages = `DELETE FROM product_image WHERE product_id = ?`;
      await query(sqlDeleteImages, [productId]);

      // Insertion des nouvelles images
      const sqlInsertImages = `
        INSERT INTO product_image (url, is_main, product_id)
        VALUES (?, ?, ?)`;
      for (const item of updatedFields.images) {
        await query(sqlInsertImages, [item.url, item.is_main, productId]);
      }
    }

    // Mise à jour des catégories du produit
    if (updatedFields.categories) {
      // Suppression des catégories existantes
      const sqlDeleteCategories = `DELETE FROM product_category WHERE product_id = ?`;
      await query(sqlDeleteCategories, [productId]);

      // Insertion des nouvelles catégories
      const sqlInsertCategories = `
        INSERT INTO product_category (product_id, category_id)
        VALUES (?, ?)`;
      for (const item of updatedFields.categories) {
        await query(sqlInsertCategories, [productId, item]);
      }
    }

    // Mise à jour des tags du produit
    if (updatedFields.tags) {
      // Suppression des tags existants
      const sqlDeleteTags = `DELETE FROM product_tag WHERE product_id = ?`;
      await query(sqlDeleteTags, [productId]);

      // Insertion des nouveaux tags
      const sqlInsertTags = `
        INSERT INTO product_tag (product_id, tag_id)
        VALUES (?, ?) `;
      for (const item of updatedFields.tags) {
        await query(sqlInsertTags, [productId, item]);
      }
    }

    await commitTransaction();
  } catch (error) {
    await rollbackTransaction();
    throw error;
  }
};
export const deleteProductRepository = async (productId: number) => {
  const sql = `
        DELETE FROM product
        WHERE id = ?
      `;
  const result = await query<ResultSetHeader>(sql, [productId]);

  if (result.affectedRows === 0) {
    throw new NotFoundError(`Product with ID ${productId} not found`);
  }
};
export const updateProductStockRepository = async (orderItems: orderItem[]) => {
  for (const item of orderItems) {
    const { productId, article_number } = item;

    // Récupérer la quantité en stock et l'état continue_selling du produit
    const sqlSelectProduct = `
      SELECT quantity_in_stock, continue_selling
      FROM product
      WHERE id = ?
    `;
    const [product] = await query<ProductUpdateStock[]>(sqlSelectProduct, [
      productId,
    ]);

    if (!product) {
      throw new BadRequestError(`Produit avec l'ID ${productId} non trouvé.`);
    }

    const { quantity_in_stock, continue_selling } = product;

    // Calcul du nouveau stock
    const newQuantityInStock = quantity_in_stock - article_number;

    // Si le stock devient négatif et que le produit ne permet pas de continuer à vendre
    if (newQuantityInStock < 0 && !continue_selling) {
      throw new BadRequestError(
        `Le stock du produit ${productId} est insuffisant, et les ventes ne sont pas autorisées avec un stock négatif.`
      );
    }

    // Mettre à jour la quantité en stock du produit
    const sqlUpdateStock = `
      UPDATE product
      SET quantity_in_stock = ?
      WHERE id = ?
    `;
    await query(sqlUpdateStock, [newQuantityInStock, productId]);
  }
};
