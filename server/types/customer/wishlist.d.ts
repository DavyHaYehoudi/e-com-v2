import { RowDataPacket } from "mysql2";

export interface WishlistRow extends RowDataPacket {
  id: number;
  customer_id: number;
  created_at: string;
  updated_at: string;
}

export interface WishlistItemRow extends RowDataPacket {
  id: number;
  wishlist_id: number;
  product_id: number;
  quantity: number;
}

export interface WishlistGiftCardRow extends RowDataPacket {
  id: number;
  wishlist_id: number;
  quantity: number;
  amount: number;
}

export interface WishlistInput {
  items: WishlistItemInput[];
  gift_cards: WishlistGiftCardInput[];
}

export interface WishlistItemInput {
  product_id: number;
  quantity: number;
}

export interface WishlistGiftCardInput {
  amount: number;
  quantity: number;
}
