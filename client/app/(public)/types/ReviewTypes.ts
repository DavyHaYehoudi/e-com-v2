export interface ReviewItemType {
  id: number;
  customer_id?: number;
  order_id: number | null;
  product_id: number;
  review_text: string;
  rating: number;
  created_at: string;
  updated_at: string;
  is_validate_by_admin: number;
}
