import { RowDataPacket } from "mysql2";

export interface CollectionRow extends RowDataPacket {
  id: number;
  label: string;
  image_url: string;
  is_star: boolean;
  is_archived: boolean;
  created_at: Date;
  updated_at: Date;
}
