import { query } from "../../config/req.js";
import { ResultSetHeader } from "mysql2";
import { CartGiftCardRow, CartItemRow, CartRow } from "./dao/cart.dao.js";
import {
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} from "../../utils/transaction.js";
import { CartInputDTO } from "../../controllers/customer/entities/dto/cart.dto.js";

// Récupérer le panier du customer
export const getCustomerCartRepository = async (customerId: number) => {
  const cartSql = `SELECT * FROM cart WHERE customer_id = ?`;
  const cart = await query<CartRow[]>(cartSql, [customerId]);

  if (cart.length === 0) return null;

  const cartItemsSql = `SELECT * FROM cart_item WHERE cart_id = ?`;
  const giftCardsSql = `SELECT * FROM cart_gift_card WHERE cart_id = ?`;

  const cartItems = await query<CartItemRow[]>(cartItemsSql, [cart[0].id]);
  const giftCards = await query<CartGiftCardRow[]>(giftCardsSql, [cart[0].id]);

  return {
    cart: cart[0],
    items: cartItems,
    giftCards: giftCards,
  };
};
// Créer ou mettre à jour le panier du customer
export const updateCustomerCartRepository = async (
  customerId: number,
  cartData: CartInputDTO
) => {
  let cartId: number;

  await beginTransaction();
  try {
    // Vérifier si un panier existe déjà pour le customer
    const existingCart = await query<CartRow[]>(
      `SELECT * FROM cart WHERE customer_id = ?`,
      [customerId]
    );

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
      const result = await query<ResultSetHeader>(
        `INSERT INTO cart (customer_id) VALUES (?)`,
        [customerId]
      );
      cartId = result.insertId;
    }

    // Insérer ou mettre à jour les items dans cart_item
    for (const item of cartData.items) {
      // Vérifier si un item avec le même product_id et variant existe déjà
      const existingItem = await query<CartItemRow[]>(
        `SELECT * FROM cart_item WHERE cart_id = ? AND product_id = ? AND variant <=> ?`,
        [cartId, item.product_id, item.variant]
      );

      if (existingItem.length > 0) {
        // Si l'item existe, mettre à jour la quantité
        await query(
          `UPDATE cart_item SET quantity = quantity + ? WHERE id = ?`,
          [item.quantity, existingItem[0].id]
        );
      } else {
        // Si l'item n'existe pas, l'insérer
        await query(
          `INSERT INTO cart_item (cart_id, product_id, quantity, variant) VALUES (?, ?, ?, ?)`,
          [cartId, item.product_id, item.quantity, item.variant]
        );
      }
    }

    // Insérer les gift cards dans cart_gift_cards
    for (const giftCard of cartData.gift_cards) {
      await query(
        `INSERT INTO cart_gift_card (cart_id, quantity, amount) VALUES (?, ?, ?)`,
        [cartId, giftCard.quantity, giftCard.amount]
      );
    }

    await commitTransaction();
    return { cartId, ...cartData };
  } catch (error) {
    await rollbackTransaction();
    throw error;
  }
};
