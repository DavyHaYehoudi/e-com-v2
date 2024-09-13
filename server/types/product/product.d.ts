import { RowDataPacket } from "mysql2";

export interface ProductRow extends RowDataPacket {
  id: number;
  created_at: Date;
  updated_at: Date;
}
