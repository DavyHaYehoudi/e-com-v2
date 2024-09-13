import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import {
  DuplicateEntryError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import { CodePromoRow } from "../../types/code-promo/code-promo.js";
import { CreateCodePromoDTO } from "../../dto/code-promo/code-promo.dto.js";

export const verifyCodePromoRepository = async (
  codePromo: string
): Promise<boolean> => {
  const sql = `
      SELECT * FROM code_promo
      WHERE code = ? 
        AND start_date <= CURRENT_DATE()
        AND end_date >= CURRENT_DATE()
    `;

  const results = await query<CodePromoRow[]>(sql, [codePromo]);

  if (results.length === 0) {
    throw new NotFoundError(`Code promo '${codePromo}' is invalid or expired.`);
  }

  return results.length > 0;
};
export const getAllCodePromosRepository = async () => {
  const sql = `SELECT * FROM code_promo`;
  const results = await query<CodePromoRow[]>(sql);
  return results;
};
export const createCodePromoRepository = async (
  codePromoData: CreateCodePromoDTO
): Promise<CodePromoRow> => {
  const sql = `
        INSERT INTO code_promo (code, discount_percentage, start_date, end_date)
        VALUES (?, ?, ?, ?)
      `;

  try {
    const result = await query<ResultSetHeader>(sql, [
      codePromoData.code,
      codePromoData.discount_percentage,
      codePromoData.start_date,
      codePromoData.end_date,
    ]);
    const newCodePromoId = result.insertId;
    const sql2 = `
             SELECT * FROM code_promo WHERE id =?
           `;
    const [newCodePromo] = await query<CodePromoRow[]>(sql2, [newCodePromoId]);
    return newCodePromo;
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new DuplicateEntryError(
        `Code '${codePromoData.code}' already exists`
      );
    }
    throw error;
  }
};

export const deleteCodePromoRepository = async (codePromoId: number) => {
  const sql = `
        DELETE FROM code_promo
        WHERE id = ?
      `;
  const result = await query<ResultSetHeader>(sql, [codePromoId]);

  if (result.affectedRows === 0) {
    throw new NotFoundError(`Code Promo with ID ${codePromoId} not found`);
  }
};
