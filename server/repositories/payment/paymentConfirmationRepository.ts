import { query } from "../../config/req.js";
import { RowDataPacket } from "mysql2";
import {
  BadRequestError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";

// Créer une commande dans la table `order`
export const createOrderRepository = async (orderData) => {
    const sql = `
        INSERT INTO \`order\` (customer_id, order_status_id, payment_status_id, confirmation_number, code_promo_amount, total_promo_products, total_price, shipping_price, cashback_earned, cashback_spent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await query(sql, [
        orderData.customerId, 
        orderData.orderStatusId, 
        orderData.paymentStatusId, 
        orderData.confirmationNumber, 
        orderData.codePromoAmount,
        orderData.totalPromoProducts, 
        orderData.totalPrice, 
        orderData.shippingPrice, 
        orderData.cashbackEarned, 
        orderData.cashbackSpent
    ]);
    return result.insertId;
};

// Créer les adresses dans la table `order_address`
export const createOrderAddressRepository = async (orderId, addressData, type) => {
    const sql = `
        INSERT INTO order_address (type, company, email, phone, street_number, address1, address2, city, postal_code, country, order_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await query(sql, [
        type, 
        addressData.company, 
        addressData.email, 
        addressData.phone, 
        addressData.street_number, 
        addressData.address1, 
        addressData.address2, 
        addressData.city, 
        addressData.postal_code, 
        addressData.country || 'France', 
        orderId
    ]);
};

// Récupérer un `shipping_method` par son ID
export const getShippingMethodByIdRepository = async (shippingMethodId) => {
    const sql = `SELECT * FROM shipping_method WHERE id = ?`;
    const shippingMethod = await query(sql, [shippingMethodId]);
    return shippingMethod[0]; // Retourne la méthode de livraison avec ses tarifs associés
};

// Appliquer des cartes cadeaux à une commande
export const applyGiftCardsRepository = async (orderId, giftCardIds) => {
    const sql = `
        UPDATE gift_card
        SET order_id = ?
        WHERE id IN (?)
    `;
    await query(sql, [orderId, giftCardIds]);
};


