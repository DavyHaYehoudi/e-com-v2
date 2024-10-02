export interface ProductCardProps {
  product: Product;
}

export interface Product {
  _id: number;
  name: string;
  SKU: string | null;
  description: string;
  main_image: string;
  discount_percentage: number | null;
  weight: number | null;
  continue_selling: boolean;
  quantity_in_stock: number;
  price: number;
  new_until: string | null;
  is_published: boolean;
  cash_back: number;
  is_star: boolean;
  isArchived: boolean;
  isActive: boolean;
}
