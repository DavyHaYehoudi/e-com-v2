import { RowDataPacket, ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import { PaymentStatusDTO } from "../../controllers/payment/entities/dto/paymentStatus.dto.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import { RowPaymentsStatus } from "./dao/paymentsStatus.dao.js";

export async function paymentStatusPaidRepository(
  customerId: number,
  body: PaymentStatusDTO
) {
  const sqlOrder = `
      SELECT * FROM \`order\` WHERE customer_id = ? AND confirmation_number = ?`;
  const resultsOrder = await query<RowDataPacket[]>(sqlOrder, [
    customerId,
    body.confirmationNumber,
  ]);

  if (resultsOrder.length === 0) {
    throw new NotFoundError("Order not found");
  }

  const orderId = resultsOrder[0].id;

  const updateSql = `
      UPDATE \`order\` 
      SET payment_status_id = ? 
      WHERE id = ?`;

  const result = await query<ResultSetHeader>(updateSql, [1, orderId]);

  if (result.affectedRows === 0) {
    throw new Error("Failed to update the confirmation number");
  }

  return result;
}
export async function paymentStatusFailedRepository(
  customerId: number,
  body: PaymentStatusDTO
) {
  const sqlOrder = `
      SELECT * FROM \`order\` WHERE customer_id = ? AND confirmation_number = ?`;
  const resultsOrder = await query<RowDataPacket[]>(sqlOrder, [
    customerId,
    body.confirmationNumber,
  ]);

  if (resultsOrder.length === 0) {
    throw new NotFoundError("Order not found");
  }

  const orderId = resultsOrder[0].id;

  const updateSql = `
      UPDATE \`order\` 
      SET confirmation_number = ? 
      WHERE id = ?`;

  const result = await query<ResultSetHeader>(updateSql, [3, orderId]);

  if (result.affectedRows === 0) {
    throw new Error("Failed to update the confirmation number");
  }

  return result;
}
export async function getPaymentsStatusRepository() {
  const sql = `
      SELECT *
      FROM payment_status`;
  const result = await query<RowPaymentsStatus[]>(sql);

  return result;
}
