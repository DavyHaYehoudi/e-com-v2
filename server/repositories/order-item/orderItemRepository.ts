import { RowDataPacket } from "mysql2";
import { query } from "../../config/req.js";
import { UpdateOrderItemInputDTO } from "../../controllers/order-item/entities/dto/orderItem.dto.js";
import { orderItem } from "../../controllers/payment/entities/dto/paymentAmount.dto.js";
import { orderItemRow } from "./dao/orderItem.dao.js";
import { BadRequestError } from "../../exceptions/CustomErrors.js";

// ADMIN - Récupérer tous les orders items d'une commande
export const getAllOrderItemsRepository = async (orderId: number) => {
  const sql = `SELECT * FROM order_item
  WHERE order_id =?`;
  const results = await query<orderItemRow[]>(sql, [orderId]);
  return results;
};

export const createOrderItemRepository = async (
  customerId: number,
  orderId: number,
  productPromotionDetails: orderItem[]
) => {
  const sql = `
      INSERT INTO order_item (
        customer_id, order_id, product_id, article_number, price_before_discount, discount_percentage
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

  for (const item of productPromotionDetails) {
    const {
      productId,
      discount_percentage,
      price_before_discount,
      article_number,
    } = item;
    await query(sql, [
      customerId,
      orderId,
      productId,
      article_number,
      price_before_discount,
      discount_percentage,
    ]);
  }
};
// ADMIN - Modifier un order item
export const updateOrderItemRepository = async (
  orderItemId: number,
  updates: UpdateOrderItemInputDTO
) => {
  // Vérification si l'orderItemId existe dans la base de données
  const checkSql = `SELECT id FROM order_item WHERE id = ? LIMIT 1`;
  const checkResult = await query<RowDataPacket[]>(checkSql, [orderItemId]);

  if (checkResult.length === 0) {
    throw new BadRequestError(
      `Order item with ID ${orderItemId} does not exist.`
    );
  }
  // Construction de la requête SQL dynamique
  let sql = `UPDATE order_item SET `;
  const params: any[] = [];

  // Construction des parties dynamiques de la requête
  if (updates.exchange_number !== undefined) {
    sql += `exchange_number = ?, exchange_at = CURRENT_TIMESTAMP, `;
    params.push(updates.exchange_number);
  }

  if (updates.refund_number !== undefined) {
    sql += `refund_number = ?, refund_at = CURRENT_TIMESTAMP, `;
    params.push(updates.refund_number);
  }

  if (updates.refund_amount !== undefined) {
    sql += `refund_amount = ?, refund_at = CURRENT_TIMESTAMP, `;
    params.push(updates.refund_amount);
  }

  if (updates.return_number !== undefined) {
    sql += `return_number = ?, return_at = CURRENT_TIMESTAMP, `;
    params.push(updates.return_number);
  }

  // Retirer la dernière virgule et espace
  sql = sql.slice(0, -2);

  // Ajout de la condition WHERE
  sql += ` WHERE id = ?`;
  params.push(orderItemId);

  // Exécution de la requête
  await query(sql, params);
};
