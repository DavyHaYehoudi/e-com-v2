import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import {
  firstHolderIdRow,
  giftCardBalanceRow,
  GiftCardRow,
  GiftCardUsageRow,
} from "./dao/gift-card.dao.js";
import { generateGiftCardCode } from "./utils/generateCode.js";
import {
  CreateGiftCardDTO,
} from "../../controllers/gift-card/entities/dto/gift-card.dto.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";
import { CartGiftCardRow } from "../customer/dao/cart.dao.js";

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
export const getAllGiftCardsAdminRepository = async (customerId?: string) => {
  let sql1 = `
      SELECT * 
      FROM gift_card
    `;
  const params: any[] = [];

  // Si un customerId est fourni, ajouter une clause WHERE
  if (customerId) {
    sql1 += ` WHERE first_holder_id = ?`;
    params.push(customerId);
  }
  const giftCards = await query<GiftCardRow[]>(sql1, params);

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
// CUSTOMER - Achat d'une carte cadeau
export const createGiftCardRepository = async (
  customerId: number,
  orderId: number,
  giftCards: CartGiftCardRow[]
) => {
  for (const giftCard of giftCards) {
    const { quantity, amount } = giftCard;

    for (let i = 0; i < quantity; i++) {
      const generatedCode = generateGiftCardCode(); // Générer un code unique pour chaque carte
      const balance = amount; // Chaque carte a le même montant
      
      const sql = `
        INSERT INTO gift_card (
          first_holder_id, code, initial_value, balance, is_issued_by_admin, expiration_date, order_id
        ) VALUES (?, ?, ?, ?, ?, DATE_ADD(CURRENT_DATE, INTERVAL 1 YEAR), ?);
      `;

      await query(sql, [
        customerId,
        generatedCode,
        amount,
        balance,
        false, // Valeur pour is_issued_by_admin
        orderId,
      ]);
    }
  }
};
// CUSTOMER - Mise à jour des cartes cadeaux au niveau de leur balance et de leur historique après une commande
export const updateGiftCardsRepository = async (
  orderId: number,
  giftCardIds: number[],
  amountGiftCardUsed: number,
  customerId: number
) => {
  // Générer une chaîne de "?" pour chaque giftCardId
  const placeholders = giftCardIds.map(() => '?').join(', ');

  const sqlSelectGiftCards = `
    SELECT id, balance 
    FROM gift_card 
    WHERE id IN (${placeholders})
  `;

  // Récupérer les cartes cadeaux en utilisant le tableau giftCardIds décomposé
  const giftCards = await query<{ id: number; balance: number }[]>(sqlSelectGiftCards, giftCardIds);

  let remainingAmount = amountGiftCardUsed;

  for (const giftCard of giftCards) {
    if (remainingAmount <= 0) break; // Si le montant restant à couvrir est 0 ou négatif, on sort de la boucle

    let amountToDeduct = 0;

    if (giftCard.balance >= remainingAmount) {
      // Si la carte cadeau peut couvrir tout le montant restant
      amountToDeduct = remainingAmount;
      remainingAmount = 0; // On a utilisé tout le montant nécessaire
    } else {
      // Si la carte cadeau ne couvre qu'une partie du montant restant
      amountToDeduct = giftCard.balance;
      remainingAmount -= giftCard.balance; // On déduit ce qui reste à couvrir
    }

    // Mise à jour du solde de la carte cadeau
    const sqlUpdateGiftCard = `
      UPDATE gift_card 
      SET balance = balance - ? 
      WHERE id = ?
    `;
    await query(sqlUpdateGiftCard, [amountToDeduct, giftCard.id]);

    // Insertion dans l'historique d'utilisation de la carte cadeau
    const sqlInsertGiftCardUsage = `
      INSERT INTO gift_card_usage (gift_card_id, used_by_customer_id, amount_used, order_id) 
      VALUES (?, ?, ?, ?)
    `;
    await query(sqlInsertGiftCardUsage, [giftCard.id, customerId, amountToDeduct, orderId]);
  }

  // Si le remainingAmount est supérieur à 0 à ce stade, cela signifie qu'il n'y avait pas assez de solde sur les cartes cadeaux pour couvrir toute la commande
  if (remainingAmount > 0) {
    throw new Error("Insufficient gift card balance to cover the total amount.");
  }
};


