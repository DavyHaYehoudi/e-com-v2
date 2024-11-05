import { CashBackCartToUseType } from "../types/CashbackCartToUseType";

export const mockCashBackHistory: CashBackCartToUseType = {
    cashBacks: [
        {
            transaction_id: 43,
            customer_id: 12,
            order_id: 22,
            review_id: null,
            cash_back_earned_for_this_transaction: "30.00",
            cash_back_spent_for_this_transaction: "4.00",
            createdAt: "2024-09-26T09:49:53.000Z",
            reason: "Order"
        },
        {
            transaction_id: 42,
            customer_id: 12,
            order_id: 21,
            review_id: null,
            cash_back_earned_for_this_transaction: "30.00",
            cash_back_spent_for_this_transaction: "4.00",
            createdAt: "2024-09-26T09:48:17.000Z",
            reason: "Order"
        },
        {
            transaction_id: 41,
            customer_id: 12,
            order_id: 20,
            review_id: null,
            cash_back_earned_for_this_transaction: "30.00",
            cash_back_spent_for_this_transaction: "4.00",
            createdAt: "2024-09-26T09:46:18.000Z",
            reason: "Order"
        },
        {
            transaction_id: 40,
            customer_id: 12,
            order_id: 19,
            review_id: null,
            cash_back_earned_for_this_transaction: "0.00",
            cash_back_spent_for_this_transaction: "4.00",
            createdAt: "2024-09-26T09:40:53.000Z",
            reason: "Order"
        }
    ],
    total_earned: 998.00,
    total_spent: 166.00
};
