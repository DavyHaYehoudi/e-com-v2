import { RowDataPacket } from "mysql2";

export interface TagRow extends RowDataPacket {
  id: number;
  label: string;
  created_at: Date;
  updated_at: Date;
}
