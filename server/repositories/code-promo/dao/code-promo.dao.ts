import { RowDataPacket } from "mysql2";

export interface CodePromoRow extends RowDataPacket {
  id: number;
  code: string;
  discount_percentage: number;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
}
