import { RowDataPacket } from "mysql2";

export interface NotesAdminRow extends RowDataPacket {
  id: number;
  notes_admin: string;
  customer_id: number;
  created_at: Date;
  updated_at: Date;
}
 