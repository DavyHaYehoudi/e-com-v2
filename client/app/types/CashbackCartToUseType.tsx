interface CashBackTransaction {
  transaction_id: number;
  customer_id: number;
  order_id: number;
  review_id: number | null;
  cash_back_earned_for_this_transaction: string; 
  cash_back_spent_for_this_transaction: string; 
  createdAt: string; 
  reason: string;
}

export interface CashBackCartToUseType {
  cashBacks: CashBackTransaction[];
  total_earned: number;
  total_spent: number;
}
