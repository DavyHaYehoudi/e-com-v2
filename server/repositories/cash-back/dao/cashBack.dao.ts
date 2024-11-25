import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface createCashBackTransactionRow extends ResultSetHeader{
    id: number;
    customer_id: number;
    cash_back_earned_for_this_transaction: number;
    cash_back_spent_for_this_transaction: number;
    cash_back_reason_id: number;
    order_id: number | null;
    review_id: number | null;
    created_at: Date;
    updated_at: Date;
  }
export interface getCashBackTransactionRow extends RowDataPacket{
    id: number;
    customer_id: number;
    cash_back_earned_for_this_transaction: number;
    cash_back_spent_for_this_transaction: number;
    cash_back_reason_id: number;
    order_id: number | null;
    confirmation_number: string | null;
    review_id: number | null;
    created_at: Date;
    updated_at: Date;
  }
  

  