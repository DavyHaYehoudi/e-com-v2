import { UpdateCashBackDto } from "../../controllers/cash-back/entities/dto/cashBack.dto.js";
import {
  sendBirthdayToCustomer,
  sendCashbackCorrectionToCustomer,
  sendCashbackEarnedToCustomer,
} from "../../email/subject/marketing.js";

import {
  createCashBackCustomerFromAdminRepository,
  createCashbackOrderRepository,
  getAllCashBackOneCustomerRepository,
  getCashBackBalanceRepository,
} from "../../repositories/cash-back/cashBackRepository.js";
import { formatAmount } from "../../utils/format_amount.js";
import { getCustomerProfileService } from "../customer/profileService.js";

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
  const customer = await getCustomerProfileService(customerId);
  if (transaction.increase) {
    if (transaction.reason === "Birthday") {
      sendBirthdayToCustomer(
        customer.email,
        customer.first_name,
        transaction.amountCashBack
      );
      return;
    }
    sendCashbackEarnedToCustomer(
      customer.email,
      customer.first_name,
      transaction.amountCashBack,
      transaction.reason
    );
  } else if (!transaction.increase) {
    sendCashbackCorrectionToCustomer(
      customer.email,
      transaction.amountCashBack
    );
  }
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
    cash_back_earned_for_this_transaction: formatAmount(
      transaction.cash_back_earned_for_this_transaction
    ),
    cash_back_spent_for_this_transaction: formatAmount(
      Math.max(0, transaction.cash_back_spent_for_this_transaction)
    ),
    createdAt: transaction.created_at,
    reason: transaction.reason_label,
  }));

  return {
    cashBacks,
    total_earned: formatAmount(history.total_earned),
    total_spent: formatAmount(history.total_spent),
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
