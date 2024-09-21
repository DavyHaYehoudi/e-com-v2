import { RowDataPacket } from "mysql2";

export interface DiscountRow extends RowDataPacket {
  id: number;
  target_table: string;
  target_id: number;
  discount_percentage: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface DiscountPercentageRow extends RowDataPacket {
  discount_percentage: number;
}
