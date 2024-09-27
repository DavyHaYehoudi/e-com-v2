import { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "../../config/req.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import { ReviewRow } from "./dao/review.dao.js";
import {
  CreateReviewDTO,
  UpdateReviewCustomerDTO,
} from "../../controllers/review/entities/dto/review.dto.js";

export const getAllReviewsRepository = async () => {
  const sql = `SELECT * FROM review`;
  const results = await query<ReviewRow[]>(sql);
  return results;
};
export const getReviewRepository = async (reviewId: number) => {
  const sql = `SELECT * FROM review 
   WHERE id = ?`;
  const result = await query<ReviewRow[]>(sql, [reviewId]);
  if (result.length === 0) {
    throw new NotFoundError(`Review with ID ${reviewId} not found`);
  }
  return result;
};
export const createReviewRepository = async (
  customerId: number,
  reviewData: CreateReviewDTO
): Promise<ReviewRow> => {
  const sql = `
        INSERT INTO review (customer_id, order_id, product_id, review_text, rating)
        VALUES (?, ?, ?, ?, ?)
      `;

  const result = await query<ResultSetHeader>(sql, [
    customerId,
    reviewData.order_id,
    reviewData.product_id,
    reviewData.review_text,
    reviewData.rating,
  ]);
  const newReviewId = result.insertId;
  const sql2 = `
             SELECT * FROM review WHERE id =?
           `;
  const [newReview] = await query<ReviewRow[]>(sql2, [newReviewId]);
  return newReview;
};
export const updateReviewRepository = async (
  customerId: number,
  reviewId: number,
  updatedFields: UpdateReviewCustomerDTO
) => {
  const fields = Object.keys(updatedFields)
    .map((field) => `${field} =?`)
    .join(", ");
  const values = Object.values(updatedFields);
  const sql = `UPDATE review SET ${fields} WHERE id =? AND customer_id =? AND is_validate_by_admin = ?`;
  const result = await query<ResultSetHeader>(sql, [
    ...values,
    reviewId,
    customerId,
    false,
  ]);
  if (result.affectedRows === 0) {
    throw new NotFoundError(
      `Review with ID ${reviewId} not found for customer ID ${customerId} or review already approved by admin`
    );
  }
};
export const approveReviewRepository = async (
  reviewId: number,
  toggle_validate: boolean
) => {
  // Vérifier si le commentaire existe
  const sqlCheck = `
    SELECT * FROM review
    WHERE id = ?
  `;
  const results = await query<RowDataPacket[]>(sqlCheck, [reviewId]);

  if (results.length === 0) {
    throw new NotFoundError(`Review with ID ${reviewId} not found`);
  }
  if (toggle_validate) {
    const sql = `UPDATE review SET is_validate_by_admin = NOT is_validate_by_admin WHERE id = ?`;
    await query(sql, [reviewId]);
  }
};
export const deleteReviewRepository = async (
  customerId: number,
  reviewId: number
) => {
  const sql = `
        DELETE FROM review
        WHERE id = ? AND customer_id =? AND is_validate_by_admin = ?
      `;
  const result = await query<ResultSetHeader>(sql, [
    reviewId,
    customerId,
    false,
  ]);

  if (result.affectedRows === 0) {
    throw new NotFoundError(
      `Review with ID ${reviewId} not found for customer ID ${customerId} or review already approved by admin`
    );
  }
};
