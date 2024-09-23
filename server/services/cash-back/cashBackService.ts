import { UpdateCashBackDto } from "../../controllers/cash-back/entities/dto/cashBack.dto.js";
import {
  createCashBackCustomerFromAdminRepository,
  createCashbackOrderRepository,
  getAllCashBackOneCustomerRepository,
  getCashBackBalanceRepository,
} from "../../repositories/cash-back/cashBackRepository.js";

// ADMIN - Ajout/Retrait de cashback au compte du customer
export const createCashBackCustomerFromAdminService = async (
  customerId: number,
  cashBackData: UpdateCashBackDto
) => {
  const balanceCashBackCustomer = await getCashBackBalanceRepository(
    customerId
  );
  const transaction = await createCashBackCustomerFromAdminRepository(
    customerId,
    cashBackData,
    balanceCashBackCustomer
  );
  return {
    transaction_id: transaction.transaction.id,
    customer_id: transaction.transaction.customer_id,
    order_id: transaction.transaction.order_id,
    review_id: transaction.transaction.review_id,
    cash_back_earned_for_this_transaction:
      transaction.transaction.cash_back_earned_for_this_transaction,
    cash_back_spent_for_this_transaction:
      transaction.transaction.cash_back_spent_for_this_transaction,
    createdAt: transaction.transaction.created_at,
    total_earned: transaction.total_earned,
    total_spent: transaction.total_spent,
    reason: transaction.reason,
  };
};
// ADMIN + CUSTOMER - Récupérer l'historique du cashback d'un customer
export const getAllCashBackOneCustomerService = async (customerId: number) => {
  const history = await getAllCashBackOneCustomerRepository(customerId);

  const cashBacks = history.transactions.map((transaction) => ({
    transaction_id: transaction.id,
    customer_id: transaction.customer_id,
    order_id: transaction.order_id,
    review_id: transaction.review_id,
    cash_back_earned_for_this_transaction:
      transaction.cash_back_earned_for_this_transaction,
    cash_back_spent_for_this_transaction:
      transaction.cash_back_spent_for_this_transaction,
    createdAt: transaction.created_at,
    reason: transaction.reason_label,
  }));

  return {
    cashBacks,
    total_earned: history.total_earned,
    total_spent: history.total_spent,
  };
};
// CUSTOMER - Ajout/Retrait de cashback suite à une création d'une commande
export const createCashbackOrderService = async (
  orderId: number,
  customerId: number,
  cashBackEarned: number | null,
  cashBackSpent: number | null
) => {
  await createCashbackOrderRepository(
    orderId,
    customerId,
    cashBackEarned,
    cashBackSpent
  );
};
