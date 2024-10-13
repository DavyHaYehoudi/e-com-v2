import { RowDataPacket } from "mysql2";

export interface CollectionRow extends RowDataPacket {
  collection_id: number;
  collection_label: string;
  collection_is_archived: boolean;
  collection_created_at: Date;
  collection_updated_at: Date;
  category_id: number | null;  // Peut être null si pas de catégorie
  category_label: string | null;
  category_is_archived: boolean | null;
  category_created_at: Date | null;
  category_updated_at: Date | null;
}
