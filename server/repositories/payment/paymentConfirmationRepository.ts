import { query } from "../../config/req.js";
import { OrderDAO, OrderDAORow } from "./dao/paymentConfirmation.dao.js";
import {
  AddressConfirmationDTO,
  orderSchema,
} from "../../controllers/payment/entities/dto/paymentConfirmation.dto.js";

// Créer une commande dans la table `order`
export const createOrderRepository = async (orderData: orderSchema) => {
  const sql = `
        INSERT INTO \`order\` (customer_id, order_status_id, payment_status_id, confirmation_number, code_promo_amount, total_promo_products, total_price, shipping_price, cashback_earned, cashback_spent,total_weight)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const result = await query<OrderDAO>(sql, [
    orderData.customerId,
    orderData.orderStatusId,
    orderData.paymentStatusId,
    orderData.confirmationNumber,
    orderData.codePromoAmount,
    orderData.totalPromoProducts,
    orderData.totalPrice,
    orderData.shippingPrice,
    orderData.cashBackEarned,
    orderData.cashBackSpent,
    orderData.totalWeight,
  ]);
  const newOrderId = result.insertId;
  const sqlSelect = `
         SELECT * FROM \`order\` WHERE id =?
       `;
  const [newOrder] = await query<OrderDAORow[]>(sqlSelect, [newOrderId]);
  return newOrder;
};
// Créer les adresses dans la table `order_address`
export const createOrderAddressRepository = async (
  orderId: number,
  addressData: AddressConfirmationDTO,
  type: string
) => {
  const sql = `
        INSERT INTO order_address (type, company, first_name, last_name, email, phone, street_number, address1, address2, city, postal_code, country, order_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  await query(sql, [
    type,
    addressData.company || "",
    addressData.first_name,
    addressData.last_name,
    addressData.email,
    addressData.phone,
    addressData.street_number,
    addressData.address1,
    addressData.address2,
    addressData.city,
    addressData.postal_code,
    addressData.country || "France",
    orderId,
  ]);
};
