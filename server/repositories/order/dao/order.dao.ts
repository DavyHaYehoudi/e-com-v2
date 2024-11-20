import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface OrderRow extends RowDataPacket {
  id: number;
  customer_id: number;
  order_status_id: number;
  order_status_label: string;
  order_status_code: string;
  payment_status_id: number;
  payment_status_label: string;
  payment_status_color: string;
  confirmation_number: string;
  notes_admin: string;
  code_promo_amount: number;
  total_promo_products: number;
  total_price: number;
  total_weight: number;
  cashback_earned: number;
  cashback_spent: number;
  created_at: Date;
  updated_at: Date;
}
export interface OrderTrackingRow extends RowDataPacket {
  id: number;
  customer_id: number;
  order_id: number;
  tracking_number: string;
  sender: string;
  sending_date: Date;
}

export interface OrderMessageRow extends RowDataPacket {
  id: number;
  sender: string;
  body: string;
  timestamp: Date;
  order_id: number;
  is_read: boolean;
}
