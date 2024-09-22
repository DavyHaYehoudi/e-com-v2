import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import { BadRequestError, DuplicateEntryError, NotFoundError } from "../../exceptions/CustomErrors.js";
import { CategoryRow } from "../category/dao/category.dao.js";
import { CollectionRow } from "../collection/dao/collection.dao.js";
import { DiscountRow } from "./dao/discount.dao.js";
import {
  CreateDiscountDTO,
  TargetTableDiscountDTO,
} from "../../controllers/discount/entities/dto/discount.dto.js";
import { ProductRow } from "../product/dao/product.dao.js";

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

  // Vérifier que le nouveau discount n'existe pas déjà pour la même table et l'id cible
  const sql2 = `
        SELECT * FROM discount
        WHERE target_table =?
        AND target_id =?
      `;
  const isDiscountExists = await query<DiscountRow[]>(sql2, [
    target_table,
    discountData.target_id,
  ]);
  if (isDiscountExists.length > 0) {
    throw new DuplicateEntryError(`Discount already exists for ${target_table} with ID ${targetId}`);
  }

  // Vérifier que la date de début est inférieure à la date de fin
  if (discountData.start_date >= discountData.end_date) {
    throw new BadRequestError("Start date must be before end date");
  }


  // Créer le nouveau discount
  const sql3 = `
        INSERT INTO discount (target_table, target_id, discount_percentage, start_date, end_date)
        VALUES (?, ?, ?, ?, ?)
      `;
  const result = await query<ResultSetHeader>(sql3, [
    target_table,
    discountData.target_id,
    discountData.discount_percentage,
    discountData.start_date,
    discountData.end_date,
  ]);
  const newDiscountId = result.insertId;
  const sql4 = `
     SELECT * FROM discount WHERE id =?
   `;
  const [newDiscount] = await query<DiscountRow[]>(sql4, [newDiscountId]);
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
