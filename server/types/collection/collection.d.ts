import { RowDataPacket } from "mysql2";

export interface CollectionRow extends RowDataPacket {
  id: number;
  name: string;
  image_url: string;
  is_star: boolean;
  created_at: Date;
  updated_at: Date;
}
