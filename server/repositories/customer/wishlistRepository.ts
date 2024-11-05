import { query } from "../../config/req.js";
import { ResultSetHeader } from "mysql2";
import {
  WishlistItemRow,
  WishlistRow,
} from "./dao/wishlist.dao.js";
import {
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} from "../../utils/transaction.js";
import { WishlistInputDTO } from "../../controllers/customer/entities/dto/wishlist.dto.js";

// Récupérer la wishlist du customer
export const getCustomerWishlistRepository = async (customerId: number) => {
  const wishlistSql = `SELECT * FROM wishlist WHERE customer_id = ?`;
  const wishlist = await query<WishlistRow[]>(wishlistSql, [customerId]);

  if (wishlist.length === 0) return null;

  const wishlistItemsSql = `SELECT * FROM wishlist_item WHERE wishlist_id = ?`;

  const wishlistItems = await query<WishlistItemRow[]>(wishlistItemsSql, [
    wishlist[0].id,
  ]);

  return {
    wishlist: wishlist[0],
    items: wishlistItems,
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
    // Vérifier si une wishlist existe déjà pour le client
    const existingWishlist = await query<WishlistRow[]>(
      `SELECT * FROM wishlist WHERE customer_id = ?`,
      [customerId]
    );

    if (existingWishlist.length) {
      wishlistId = existingWishlist[0].id;

      // Mettre à jour la table wishlist (optionnel pour mise à jour date)
      await query(
        `UPDATE wishlist SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [wishlistId]
      );
    } else {
      // Créer une nouvelle wishlist si elle n'existe pas encore
      const result = await query<ResultSetHeader>(
        `INSERT INTO wishlist (customer_id) VALUES (?)`,
        [customerId]
      );
      wishlistId = result.insertId;
    }

    // Gestion du toggle pour chaque produit dans items
    for (const item of wishlistData.items) {
      const existingItem = await query<WishlistRow[]>(
        `SELECT * FROM wishlist_item WHERE wishlist_id = ? AND product_id = ?`,
        [wishlistId, item.product_id]
      );

      if (existingItem.length) {
        // Retirer si le produit est déjà présent dans la wishlist
        await query(
          `DELETE FROM wishlist_item WHERE wishlist_id = ? AND product_id = ?`,
          [wishlistId, item.product_id]
        );
      } else {
        // Ajouter si le produit est absent de la wishlist
        await query(
          `INSERT INTO wishlist_item (wishlist_id, product_id) VALUES (?, ?)`,
          [wishlistId, item.product_id]
        );
      }
    }

    await commitTransaction();

    // Retourne la liste actualisée des favoris (ou la structure souhaitée)
    const updatedItems = await query<WishlistItemRow[]>(
      `SELECT product_id FROM wishlist_item WHERE wishlist_id = ?`,
      [wishlistId]
    );

    return {
      wishlistId,
      items: updatedItems.map((item) => ({ product_id: item.product_id })),
    };
  } catch (error) {
    await rollbackTransaction();
    throw error;
  }
};

