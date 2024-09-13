import { RowDataPacket } from "mysql2";

export interface CategoryRow extends RowDataPacket {
  id: number;
  label: string;
  image_url: string;
  parent_collection_id: number;
  promotion_percentage: number;
  is_archived: boolean;
  created_at: Date;
  updated_at: Date;
}
