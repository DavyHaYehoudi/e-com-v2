import { RowDataPacket } from "mysql2";

export interface OrderRow extends RowDataPacket{
    id: number;
    customer_id: number;
    order_status_id: number;
    payment_status_id: number;
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

