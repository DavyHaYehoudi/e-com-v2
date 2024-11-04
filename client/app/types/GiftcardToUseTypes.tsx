export interface GiftcardToUseType {
  id?: number;
  first_holder_id?: number;
  code: string;
  initial_value?: number;
  balance?: number;
  is_issued_by_admin?: number;
  expiration_date?: string;
  order_id?: number | null;
  created_at?: string;
  updated_at?: string;
}
