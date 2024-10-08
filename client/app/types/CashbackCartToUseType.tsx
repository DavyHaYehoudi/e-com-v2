interface CashBackTransaction {
  transaction_id: number;
  customer_id: number;
  order_id: number;
  review_id: number | null;
  cash_back_earned_for_this_transaction: string; // Assuming it's a string representing a decimal value
  cash_back_spent_for_this_transaction: string; // Same assumption as above
  createdAt: string; // ISO date string
  reason: string;
}

export interface CashBackCartToUseType {
  cashBacks: CashBackTransaction[];
  total_earned: string; // Assuming it's a string representing a decimal value
  total_spent: string; // Same assumption as above
}
