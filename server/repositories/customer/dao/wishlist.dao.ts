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
}

export interface WishlistInput {
  items: WishlistItemInput[];
}

export interface WishlistItemInput {
  product_id: number;
}
