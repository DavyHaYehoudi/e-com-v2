import { RowDataPacket } from "mysql2";

export interface orderItemRow extends RowDataPacket{
    id: number;
    customer_id: number;
    order_id: number;
    product_id: number;
    article_number: string;
    price_before_discount: number;
    discount_percentage: number;
    exchange_number:number;
    exchange_at:Date;
    refund_number:number;
    refund_at:Date;
    refund_amount:number;
    return_number:number;
    return_at:Date;
    created_at: Date;
    updated_at: Date;
}