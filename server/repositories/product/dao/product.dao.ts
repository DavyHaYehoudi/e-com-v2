import { RowDataPacket } from "mysql2";

export interface ProductRow extends RowDataPacket {
  id: number;
  name: string;
  SKU: string | null;
  description: string;
  weight: number | null;
  continue_selling: boolean;
  quantity_in_stock: number;
  price: number;
  new_until: Date | null;
  cash_back: number | null;
  is_published: boolean;
  is_star: boolean;
  is_archived: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface ProductImageRow extends RowDataPacket {
  id: number;
  url: string;
  is_main: boolean;
  product_id: number;
  created_at: Date;
  updated_at: Date;
}
export interface ProductVariantRow extends RowDataPacket {
  id: number;
  combination: string;
  product_id: number;
  created_at: Date;
  updated_at: Date;
}
export interface CategoryIdRow extends RowDataPacket {
  id: number;
}
export interface TagIdRow extends RowDataPacket {
  id: number;
}
export interface ProductBestDiscount extends RowDataPacket {
  id: number;
  category_id: number;
  collection_id: number;
}

