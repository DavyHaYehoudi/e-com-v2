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
}

export interface CartGiftCardRow extends RowDataPacket {
  id: number;
  cart_id: number;
  quantity: number;
  amount: number;
}

export interface CartInput {
  items: CartItemInput[];
  gift_cards: CartGiftCardInput[];
}

export interface CartItemInput {
  product_id: number;
  quantity: number;
}

export interface CartGiftCardInput {
  amount: number;
  quantity: number;
}

// Pour le calcul du total de la commande
export interface CartItemToAmountRow extends RowDataPacket {
  id: number;
  quantity: number;
  name: string;
  price: number;
  weight: number | null;
  is_published: boolean;
  is_archived: boolean;
}
export interface CartItemGiftCardRow extends RowDataPacket {
  id: number;
  quantity: number;
  amount: number;
}
