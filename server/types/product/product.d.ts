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
