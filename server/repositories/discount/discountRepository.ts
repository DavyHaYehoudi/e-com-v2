import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import { CategoryRow } from "../../types/category/category.js";
import { CollectionRow } from "../../types/collection/collection.js";
import { DiscountRow } from "../../types/discount/discount.js";
import {
  CreateDiscountDTO,
  TargetTableDiscountDTO,
} from "../../dto/discount/discount.dto.js";
import { ProductRow } from "../../types/product/product.js";

export const getAllDiscountsRepository = async () => {
  const sql = `SELECT * FROM discount`;
  const results = await query<DiscountRow[]>(sql);
  return results;
};
export const createDiscountRepository = async (
  target_table: TargetTableDiscountDTO,
  discountData: CreateDiscountDTO
): Promise<DiscountRow> => {
  // Vérifier que l'id de la table existe bien
  const targetId = discountData.target_id;
  const sql1 = `SELECT * FROM ${target_table} WHERE id = ?`;
  const isTargetExists = await query<
    CollectionRow[] | CategoryRow[] | ProductRow[]
  >(sql1, [targetId]);
  if (isTargetExists.length === 0) {
    throw new NotFoundError(`${target_table} with ID ${targetId} not found`);
  }

  // Créer le nouveau discount
  const sql2 = `
        INSERT INTO discount (target_table, target_id, discount_percentage, start_date, end_date)
        VALUES (?, ?, ?, ?, ?)
      `;
  const result = await query<ResultSetHeader>(sql2, [
    target_table,
    discountData.target_id,
    discountData.discount_percentage,
    discountData.start_date,
    discountData.end_date,
  ]);
  const newDiscountId = result.insertId;
  const sql3 = `
     SELECT * FROM discount WHERE id =?
   `;
  const [newDiscount] = await query<DiscountRow[]>(sql3, [newDiscountId]);
  return newDiscount;
};

export const deleteDiscountRepository = async (discountId: number) => {
  const sql = `
        DELETE FROM discount
        WHERE id = ?
      `;
  const result = await query<ResultSetHeader>(sql, [discountId]);

  if (result.affectedRows === 0) {
    throw new NotFoundError(`Discount with ID ${discountId} not found`);
  }
};
