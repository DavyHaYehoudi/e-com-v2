//customerRepository.ts
import { query } from "../config/req.js";
import { ResultSetHeader } from "mysql2";
import { CustomerRow } from "../types/customer/customer.js";
import { CartGiftCardRow, CartItemRow, CartRow } from "../types/customer/cart.js";
import {
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} from "../utils/transaction.js";
import { CartInput } from "../dto/customer/cart.dto.js";

// Récupérer les données du customer par email pour l'ouverture de session
export const getCustomerByEmail = async (email: string) => {
  const sql = `SELECT * FROM customer WHERE email = ?`;
  const rows = await query(sql, [email]);
  const customers = rows as CustomerRow[];
  return customers[0] || null;
};
// Créer un customer
export const addCustomer = async (email: string) => {
  const sql = `INSERT INTO customer (email) 
                 VALUES (?)`;
  const result = await query(sql, [email]);
  return result;
};
// Récupérer les données d'un customer
export const getCustomerById = async (customerId: number) => {
  const sql = `
      SELECT *
      FROM customer 
      WHERE id = ?`;

  const rows = await query(sql, [customerId]);
  const customers = rows as CustomerRow[];
  return customers[0] || null;
};
// Mettre à jour un customer
export const updateCustomer = async (
  customerId: number,
  updatedFields: Record<string, any>
) => {
  const fields = Object.keys(updatedFields)
    .map((field) => `${field} = ?`)
    .join(", ");
  const values = Object.values(updatedFields);

  const sql = `UPDATE customer SET ${fields} WHERE id = ?`;
  const result = (await query(sql, [...values, customerId])) as ResultSetHeader;

  return result;
};
// Récupérer le panier du customer
export const getCustomerCartFromDb = async (customerId: number) => {
  const cartSql = `SELECT * FROM cart WHERE customer_id = ?`;
  const cart = (await query(cartSql, [customerId])) as CartRow[];

  if (cart.length === 0) return null;

  const cartItemsSql = `SELECT * FROM cart_item WHERE cart_id = ?`;
  const giftCardsSql = `SELECT * FROM cart_gift_card WHERE cart_id = ?`;

  const cartItems = (await query(cartItemsSql, [cart[0].id])) as CartItemRow[];
  const giftCards = (await query(giftCardsSql, [
    cart[0].id,
  ])) as CartGiftCardRow[];

  return {
    cart: cart[0],
    items: cartItems,
    giftCards: giftCards,
  };
};
// Créer ou mettre à jour le panier du customer
export const createOrUpdateCartInDb = async (
  customerId: number,
  cartData: CartInput
) => {
  let cartId: number;

  await beginTransaction();
  try {
    // Vérifier si un panier existe déjà pour le customer
    const existingCart = (await query(
      `SELECT * FROM cart WHERE customer_id = ?`,
      [customerId]
    )) as CartRow[];

    if (existingCart.length) {
      cartId = existingCart[0].id;

      // Mettre à jour la table cart
      await query(
        `UPDATE cart SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [cartId]
      );

      // Supprimer les anciennes données des items et gift cards avant la mise à jour
      await query(`DELETE FROM cart_item WHERE cart_id = ?`, [cartId]);
      await query(`DELETE FROM cart_gift_card WHERE cart_id = ?`, [cartId]);
    } else {
      // Créer un nouveau panier
      const result = (await query(`INSERT INTO cart (customer_id) VALUES (?)`, [
        customerId,
      ])) as ResultSetHeader;
      cartId = result.insertId; // 'insertId' existe dans 'ResultSetHeader'
    }

    // Insérer les items dans cart_item
    for (const item of cartData.items) {
      await query(
        `INSERT INTO cart_item (cart_id, product_id, quantity, adding_date) VALUES (?, ?, ?, ?)`,
        [cartId, item.product_id, item.quantity, item.adding_date]
      );
    }

    // Insérer les gift cards dans cart_gift_cards
    for (const giftCard of cartData.gift_cards) {
      await query(
        `INSERT INTO cart_gift_card (cart_id, quantity, amount, adding_date) VALUES (?, ?, ?, ?)`,
        [cartId, giftCard.quantity, giftCard.amount, giftCard.adding_date]
      );
    }

    await commitTransaction();
    return { cartId, ...cartData };
  } catch (error) {
    await rollbackTransaction();
    throw error;
  }
};
