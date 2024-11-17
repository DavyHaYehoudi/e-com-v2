import { RowDataPacket } from "mysql2";
import { query } from "../../config/req.js";
import {
  BadRequestError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import {
  createCashBackTransactionRow,
  getCashBackTransactionRow,
} from "./dao/cashBack.dao.js";
import { UpdateCashBackDto } from "../../controllers/cash-back/entities/dto/cashBack.dto.js";

// Calcul de la balance du cashback du customer
export async function getCashBackBalanceRepository(
  customerId: number
): Promise<number> {
  const sql = `
      SELECT SUM(cash_back_earned_for_this_transaction) - SUM(cash_back_spent_for_this_transaction) as balance
      FROM cash_back_transaction
      WHERE customer_id =?
    `;
  const result = await query<RowDataPacket[]>(sql, [customerId]);

  return result[0].balance || 0;
}
// ADMIN - Ajout/Retrait de cashback au compte du customer
export async function createCashBackCustomerFromAdminRepository(
  customerId: number,
  cashBackData: UpdateCashBackDto,
  currentBalance: number
): Promise<{
  transaction: getCashBackTransactionRow;
  total_earned: number;
  total_spent: number;
  reason: string;
  increase: boolean;
  amountCashBack: number;
}> {
  const { amountCashBack, reason, increase, reviewId } = cashBackData;

  // Vérifier si le client existe
  const sqlCheck = `
    SELECT * FROM customer
    WHERE id = ?
  `;
  const result = await query<RowDataPacket[]>(sqlCheck, [customerId]);

  if (result.length === 0) {
    throw new NotFoundError(`Customer with ID ${customerId} not found`);
  }

  // Récupérer l'ID de la raison
  const sqlReason = `
    SELECT id FROM cash_back_reason
    WHERE label = ?
  `;
  const reasonResult = await query<RowDataPacket[]>(sqlReason, [reason]);

  if (reasonResult.length === 0) {
    throw new Error(`Cashback reason "${reason}" not found`);
  }
  const reasonId = reasonResult[0].id;

  // Vérifier si le montant à retirer dépasse la balance disponible
  if (!increase && amountCashBack > currentBalance) {
    throw new BadRequestError(
      `Insufficient cashback balance. Current balance: ${currentBalance}`
    );
  }

  // Préparer l'insertion de la transaction
  const sqlInsertTransaction = `
    INSERT INTO cash_back_transaction (
      customer_id, 
      cash_back_earned_for_this_transaction, 
      cash_back_spent_for_this_transaction, 
      cash_back_reason_id,
      review_id
    ) VALUES (?, ?, ?, ?, ?)
  `;
  const transaction = await query<createCashBackTransactionRow>(
    sqlInsertTransaction,
    [
      customerId,
      increase ? amountCashBack : 0,
      increase ? 0 : amountCashBack,
      reasonId,
      reason === "Review" ? reviewId : null, // Utilise reviewId si raison = 'Review'
    ]
  );

  const newTransactionId = transaction.insertId;

  // Sélectionner la nouvelle transaction
  const sqlSelect = `
    SELECT * FROM cash_back_transaction WHERE id = ?
  `;
  const [newTransaction] = await query<getCashBackTransactionRow[]>(sqlSelect, [
    newTransactionId,
  ]);

  // Recalculer le total des cashbacks gagnés et dépensés après la transaction
  const sqlNewTotals = `
    SELECT 
      SUM(cash_back_earned_for_this_transaction) as total_earned, 
      SUM(cash_back_spent_for_this_transaction) as total_spent
    FROM cash_back_transaction
    WHERE customer_id = ?
  `;
  const [newTotals] = await query<RowDataPacket[]>(sqlNewTotals, [customerId]);

  const updatedTotalEarned = newTotals.total_earned || 0;
  const updatedTotalSpent = newTotals.total_spent || 0;

  return {
    transaction: newTransaction,
    total_earned: updatedTotalEarned, // Total cumulé de cashback gagné après la transaction
    total_spent: updatedTotalSpent, // Total cumulé de cashback dépensé après la transaction
    reason,
    increase,
    amountCashBack,
  };
}
// ADMIN + CUSTOMER - Récupérer l'historique du cashback d'un customer
export async function getAllCashBackOneCustomerRepository(customerId: number) {
  // Vérifier si le client existe
  const sqlCheck = `
  SELECT * FROM customer
  WHERE id = ?
`;
  const results = await query<RowDataPacket[]>(sqlCheck, [customerId]);

  if (results.length === 0) {
    throw new NotFoundError(`Customer with ID ${customerId} not found`);
  }

  // const sqlTransactions = `
  //     SELECT 
  //       cbt.*, 
  //       cbr.label as reason_label
  //     FROM cash_back_transaction cbt
  //     LEFT JOIN cash_back_reason cbr 
  //       ON cbt.cash_back_reason_id = cbr.id
  //     WHERE cbt.customer_id = ?
  //     ORDER BY cbt.created_at DESC
  //   `;
  const sqlTransactions = `
  SELECT 
    cbt.*, 
    cbr.label AS reason_label, 
    o.confirmation_number
  FROM cash_back_transaction cbt
  LEFT JOIN cash_back_reason cbr 
    ON cbt.cash_back_reason_id = cbr.id
  LEFT JOIN \`order\` o 
    ON cbt.order_id = o.id
  WHERE cbt.customer_id = ?
  ORDER BY cbt.created_at DESC
`;

  const sqlTotals = `
      SELECT 
        SUM(cash_back_earned_for_this_transaction) as total_earned, 
        SUM(cash_back_spent_for_this_transaction) as total_spent
      FROM cash_back_transaction
      WHERE customer_id = ?
    `;

  // Exécuter les deux requêtes en parallèle
  const [result, [totals]] = await Promise.all([
    query<getCashBackTransactionRow[]>(sqlTransactions, [customerId]),
    query<RowDataPacket[]>(sqlTotals, [customerId]),
  ]);

  const totalEarned = totals.total_earned || 0;
  const totalSpent = totals.total_spent || 0;

  return {
    transactions: result,
    total_earned: totalEarned,
    total_spent: totalSpent,
  };
}
// CUSTOMER - Ajout/Retrait de cashback suite à une création d'une commande
export async function createCashbackOrderRepository(
  orderId: number,
  customerId: number,
  cashBackEarned: number | null,
  cashBackSpent: number | null
) {
  const sql = `
  INSERT INTO cash_back_transaction
  (customer_id,order_id,cash_back_earned_for_this_transaction,cash_back_spent_for_this_transaction,cash_back_reason_id)
  VALUES(?, ?, ?, ?, ?)
  `;
  await query(sql, [customerId, orderId, cashBackEarned, cashBackSpent, 5]);
}
