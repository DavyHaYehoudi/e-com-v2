export interface Address {
  id?: number;
  company?: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string;
  street_number: string;
  address1: string;
  address2?: string;
  city: string;
  postal_code: string;
  country: string;
  type?: "shipping" | "billing";
  customer_id?: number;
  created_at?: string;
  updated_at?: string;
}
