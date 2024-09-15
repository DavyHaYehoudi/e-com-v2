import { RowDataPacket } from "mysql2";

export interface ReviewRow extends RowDataPacket {
  id: number;
  customer_id: number | null;
  order_id: number | null;
  product_id: number | null;
  review_text: string;
  rating: number;
  is_validate_by_admin: boolean;
  created_at: Date;
  updated_at: Date;
}
