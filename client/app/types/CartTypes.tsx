import { ProductImage } from "./ProductTypes";

// Type pour une carte cadeau
export type CartGiftCard = {
  id: number;
  quantity: number;
  cart_id?: number;
  created_at?: string;
  updated_at?: string;
  amount: number;
};

// Type pour la cart
export type Cart = {
  id: number;
  created_at: string;
  updated_at: string;
  customer_id: number;
};

// Type pour les éléments d'une carte
export type CartItemsType = {
  id: number;
  name: string;
  SKU: string | null;
  description: string;
  weight: number | null;
  continue_selling: boolean;
  quantity_in_stock: number;
  discount_percentage: number | null;
  discount_end_date: string | null;
  price: number;
  new_until: string | null;
  cash_back: number | null;
  is_published: boolean;
  is_star: boolean;
  is_archived?: boolean;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  categories: number[];
  tags: number[];
  variants: string[];
  quantityInCart: number;
  selectedVariant: string | null;
  isArchived?:boolean ;
};

// Type pour la réponse globale
export type CartResponse = {
  cart?: Cart;
  items: CartItemsType[];
  giftCards: CartGiftCard[];
};
