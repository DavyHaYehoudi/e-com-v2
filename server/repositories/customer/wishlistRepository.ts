import { query } from "../../config/req.js";
import { ResultSetHeader } from "mysql2";
import {
  WishlistGiftCardRow,
  WishlistItemRow,
  WishlistRow,
} from "../../types/customer/wishlist.js";
import {
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} from "../../utils/transaction.js";
import { WishlistInputDTO } from "../../dto/customer/wishlist.dto.js";

// Récupérer la wishlist du customer
export const getCustomerWishlistRepository = async (customerId: number) => {
  const wishlistSql = `SELECT * FROM wishlist WHERE customer_id = ?`;
  const wishlist = await query<WishlistRow[]>(wishlistSql, [customerId]);

  if (wishlist.length === 0) return null;

  const wishlistItemsSql = `SELECT * FROM wishlist_item WHERE wishlist_id = ?`;
  const giftCardsSql = `SELECT * FROM wishlist_gift_card WHERE wishlist_id = ?`;

  const wishlistItems = await query<WishlistItemRow[]>(wishlistItemsSql, [
    wishlist[0].id,
  ]);
  const giftCards = await query<WishlistGiftCardRow[]>(giftCardsSql, [
    wishlist[0].id,
  ]);

  return {
    wishlist: wishlist[0],
    items: wishlistItems,
    giftCards: giftCards,
  };
};
// Créer ou mettre à jour la wishlist du customer
export const updateCustomerWishlistRepository = async (
  customerId: number,
  wishlistData: WishlistInputDTO
) => {
  let wishlistId: number;
  await beginTransaction();
  try {
    // Vérifier si une wishlist existe déjà pour le customer
    const existingWishlist = await query<WishlistRow[]>(
      `SELECT * FROM wishlist WHERE customer_id = ?`,
      [customerId]
    );

    if (existingWishlist.length) {
      wishlistId = existingWishlist[0].id;

      // Mettre à jour la table wishlist
      await query(
        `UPDATE wishlist SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [wishlistId]
      );

      // Supprimer les anciennes données des items et gift cards avant la mise à jour
      await query(`DELETE FROM wishlist_item WHERE wishlist_id = ?`, [wishlistId]);
      await query(`DELETE FROM wishlist_gift_card WHERE wishlist_id = ?`, [
        wishlistId,
      ]);
    } else {
      // Créer une nouvelle wishlist
      const result = await query<ResultSetHeader>(
        `INSERT INTO wishlist (customer_id) VALUES (?)`,
        [customerId]
      );
      wishlistId = result.insertId; // 'insertId' existe dans 'ResultSetHeader'
    }

    // Insérer les items dans wishlist_item
    for (const item of wishlistData.items) {
      await query(
        `INSERT INTO wishlist_item (wishlist_id, product_id, quantity, adding_date) VALUES (?, ?, ?, ?)`,
        [wishlistId, item.product_id, item.quantity, item.adding_date]
      );
    }

    // Insérer les gift cards dans cart_gift_cards
    for (const giftCard of wishlistData.gift_cards) {
      await query(
        `INSERT INTO wishlist_gift_card (wishlist_id, quantity, amount, adding_date) VALUES (?, ?, ?, ?)`,
        [wishlistId, giftCard.quantity, giftCard.amount, giftCard.adding_date]
      );
    }

    await commitTransaction();
    return { wishlistId, ...wishlistData };
  } catch (error) {
    await rollbackTransaction();
    throw error;
  }
};
