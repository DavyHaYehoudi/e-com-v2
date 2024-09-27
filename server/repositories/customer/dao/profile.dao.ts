import { RowDataPacket } from "mysql2";

export interface ProfileRow extends RowDataPacket {
  id: number;
  role: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string;
  email_marketing_consent: boolean;
  orders_count: number;
  birthday: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
