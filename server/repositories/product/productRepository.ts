import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import { ProductRow } from "../../types/product/product.js";
import { CreateProductDTO } from "../../dto/product/product.dto.js";

export const getAllProductsRepository = async () => {
  const sql = `SELECT * FROM product`;
  const results = await query<ProductRow[]>(sql);
  return results;
};
export const getProductRepository = async (productId: number) => {
  const sql = `SELECT * FROM product 
   WHERE id = ?`;
  const result = await query<ProductRow[]>(sql, [productId]);
  if (result.length === 0) {
    throw new NotFoundError(`Product with ID ${productId} not found`);
  }
  return result;
};
export const createProductRepository = async (
  productData: CreateProductDTO
): Promise<ProductRow> => {
  const sql = `
        INSERT INTO product (name, SKU, description, weight, continue_selling, quantity_in_stock, price, new_until, cash_back, is_published, is_star, is_archived)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

  const result = await query<ResultSetHeader>(sql, [
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
    productData.is_archived,
  ]);
  const newProductId = result.insertId;
  const sql2 = `
             SELECT * FROM product WHERE id =?
           `;
  const [newProduct] = await query<ProductRow[]>(sql2, [newProductId]);
  return newProduct;
};
export const updateProductRepository = async (
  productId: number,
  updatedFields: Record<string, any>
) => {
  const fields = Object.keys(updatedFields)
    .map((field) => `${field} = ?`)
    .join(", ");
  const values = Object.values(updatedFields);
  const sql = `UPDATE product SET ${fields} WHERE id = ?`;
  const result = await query<ResultSetHeader>(sql, [...values, productId]);
  if (result.affectedRows === 0) {
    throw new NotFoundError(`Product with ID ${productId} not found`);
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
