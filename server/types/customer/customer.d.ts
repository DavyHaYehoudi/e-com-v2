import { RowDataPacket } from "mysql2";

export interface CustomerRow extends RowDataPacket {
  id: number;
  role: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar_url: string;
  email_marketing_consent: boolean;
  orders_count: number;
  birthday?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
