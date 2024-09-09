import { RowDataPacket } from "mysql2";

export interface CartRow extends RowDataPacket {
  id: number;
  customer_id: number;
  created_at: string;
  updated_at: string;
}

export interface CartItemRow extends RowDataPacket {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  adding_date: string;
}

export interface CartGiftCardRow extends RowDataPacket {
  id: number;
  cart_id: number;
  quantity: number;
  amount: number;
  adding_date: string;
}

export interface CartInput {
  items: CartItemInput[];
  gift_cards: CartGiftCardInput[];
}

export interface CartItemInput {
  product_id: number;
  quantity: number;
  adding_date: string;
}

export interface CartGiftCardInput {
  amount: number;
  quantity: number;
  adding_date: string;
}
