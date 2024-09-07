export interface CustomerRow {
  id: number;
  role: string;
  email: string;
  first_name?: string;
  last_name?: string;
  customer_address_shipping_id?: number;
  customer_address_billing_id?: number;
  phone?: string;
  avatar_url?: string;
  notes_admin?: string;
  email_marketing_consent?: boolean;
  orders_count?: number;
  birthday?: string;
  cart_id?: number;
  wishlist_id?: number;
  is_active?: boolean;
}
