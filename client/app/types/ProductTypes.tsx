export interface ProductCardProps {
  product: Product;
}

export interface Product {
  id: number;
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
  cash_back: number | null;
  variant: string | null;
  is_star: boolean;
  isArchived: boolean;
  isActive: boolean;
}

export interface ProductCartItems {
  id: number;
  name: string;
  main_image: string;
  discount_percentage: number | null;
  weight: number | null;
  price: number;
  new_until: string | null;
  cash_back: number | null;
  variant: string | null;
  quantityInCart: number;
  quantity_in_stock: number;
}
export interface ProductCartGiftcards {
  amount: number;
  quantity: number;
}
export interface ProductCart {
  items: ProductCartItems[];
  gift_cards: ProductCartGiftcards[];
}
