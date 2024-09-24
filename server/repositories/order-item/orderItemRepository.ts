import { query } from "../../config/req.js";
import { orderItem } from "../../controllers/payment/entities/dto/paymentAmount.dto.js";
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
