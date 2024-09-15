import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import {
  firstHolderIdRow,
  GiftCardRow,
  GiftCardUsageRow,
} from "../../types/gift-card/gift-card.js";
import { generateGiftCardCode } from "./utils/generateCode.js";
import { CreateGiftCardDTO } from "../../dto/gift-card/gift-card.dto.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";

// Récupérer pour un customer toutes ses cartes cadeaux
export const getCustomerGiftCardsRepository = async (customerId: number) => {
  // Requête pour récupérer toutes les cartes cadeaux détenues ou utilisées par le client
  const sql1 = `
      SELECT * 
      FROM gift_card 
      WHERE first_holder_id = ? 
      OR id IN (
        SELECT gift_card_id 
        FROM gift_card_usage 
        WHERE used_by_customer_id = ?
      )`;

  // Exécution de la première requête pour récupérer les cartes cadeaux
  const giftCards = await query<GiftCardRow[]>(sql1, [customerId, customerId]);

  // Si aucune carte cadeau n'est trouvée, renvoie un tableau vide
  if (giftCards.length === 0) {
    return [];
  }

  // Récupérer l'historique d'utilisation pour chaque carte cadeau trouvée
  const giftCardIds = giftCards.map((giftCard) => giftCard.id); // Extraire les IDs des cartes cadeaux
  const placeholders = giftCardIds.map(() => "?").join(", "); // Génère des ?, ?, ?, ...
  const sql2 = `
          SELECT * 
          FROM gift_card_usage 
          WHERE gift_card_id IN (${placeholders})
        `;

  const giftCardUsages = await query<GiftCardUsageRow[]>(sql2, giftCardIds);

  // Mapper les historiques d'utilisation aux cartes cadeaux
  const results = giftCards.map((giftCard) => {
    const usageHistory = giftCardUsages.filter(
      (usage) => usage.gift_card_id === giftCard.id
    );

    return {
      first_holder_id: giftCard.first_holder_id,
      code: giftCard.code,
      initial_value: giftCard.initial_value,
      balance: giftCard.balance,
      is_issued_by_admin: giftCard.is_issued_by_admin,
      expiration_date: giftCard.expiration_date,
      orderId: giftCard.order_id,
      usage_history: usageHistory.map((usage) => ({
        gift_card_id: usage.gift_card_id,
        used_by_customer_id: usage.used_by_customer_id,
        amount_used: usage.amount_used,
        used_at: usage.used_at,
      })),
      createdAt: giftCard.created_at,
      updatedAt: giftCard.updated_at,
    };
  });

  return results;
};
// ADMIN - Récupérer toutes les cartes cadeaux
export const getAllGiftCardsAdminRepository = async () => {
  const sql1 = `
      SELECT * 
      FROM gift_card
    `;

  const giftCards = await query<GiftCardRow[]>(sql1);

  if (giftCards.length === 0) {
    return [];
  }

  // Récupérer l'historique d'utilisation pour toutes les cartes cadeaux
  const giftCardIds = giftCards.map((giftCard) => giftCard.id);

  const placeholders = giftCardIds.map(() => "?").join(", "); // Génère des ?, ?, ?, ...
  const sql2 = `
          SELECT * 
          FROM gift_card_usage 
          WHERE gift_card_id IN (${placeholders})
        `;

  const giftCardUsages = await query<GiftCardUsageRow[]>(sql2, giftCardIds);
  const results = giftCards.map((giftCard) => {
    const usageHistory = giftCardUsages.filter(
      (usage) => usage.gift_card_id === giftCard.id
    );

    return {
      giftCardId: giftCard.id,
      first_holder_id: giftCard.first_holder_id,
      code: giftCard.code,
      initial_value: giftCard.initial_value,
      balance: giftCard.balance,
      is_issued_by_admin: giftCard.is_issued_by_admin,
      expiration_date: giftCard.expiration_date,
      orderId: giftCard.order_id,
      usage_history: usageHistory.map((usage) => ({
        gift_card_id: usage.gift_card_id,
        used_by_customer_id: usage.used_by_customer_id,
        amount_used: usage.amount_used,
        used_at: usage.used_at,
      })),
      createdAt: giftCard.created_at,
      updatedAt: giftCard.updated_at,
    };
  });

  return results;
};
// ADMIN - Création d'une carte cadeau
export const createGiftCardAdminRepository = async (
  giftCardData: CreateGiftCardDTO
) => {
  const { first_holder_id, initial_value, expiration_date } = giftCardData;
  // Vérification de l'existence du client
  const sqlCheckCustomer = `
   SELECT id FROM customer WHERE id = ?
 `;
  const customerExists = await query<firstHolderIdRow[]>(sqlCheckCustomer, [
    first_holder_id,
  ]);

  if (customerExists.length === 0) {
    throw new NotFoundError(`Customer with ID ${first_holder_id} not found`);
  }

  const generatedCode = generateGiftCardCode();
  const balance = initial_value;
  const sql = `
      INSERT INTO gift_card (first_holder_id, code, initial_value, balance, is_issued_by_admin, expiration_date, order_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  // Exécution de la requête avec les paramètres
  const result = await query<ResultSetHeader>(sql, [
    first_holder_id, // ID du détenteur initial
    generatedCode, // Code généré
    initial_value, // Valeur initiale
    balance, // Solde restant (égal à la valeur initiale)
    true, // is_issued_by_admin (toujours true)
    expiration_date, // Date d'expiration
    null, // order_id (toujours null pour les cadeaux)
  ]);

  const newGiftCardId = result.insertId;
  const sql2 = `
               SELECT * FROM gift_card WHERE id =?
             `;
  const [newGiftCard] = await query<GiftCardRow[]>(sql2, [newGiftCardId]);
  return newGiftCard;
};
// ADMIN - Suppression d'une carte cadeau
export const deleteGiftCardRepository = async (giftCardId: number) => {
  const sql = `DELETE FROM gift_card WHERE id = ?`;
  const result = await query<ResultSetHeader>(sql, [giftCardId]);
  if (result.affectedRows === 0) {
    throw new NotFoundError(`Giftcard with ID ${giftCardId} not found.`);
  }
};
