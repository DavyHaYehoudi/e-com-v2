export interface Product {
  id: number;
  name: string;
  SKU: string | null;
  description: string;
  main_image: string;
  discount_percentage: number | null;
  discount_end_date: string | null;
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

export interface MasterProductsType {
  id: number;
  name: string;
  SKU: string;
  description: string;
  weight: number;
  discount_percentage: number | null;
  discount_end_date: string | null;
  continue_selling: boolean;
  quantity_in_stock: number;
  price: number;
  new_until: string; // Date sous format ISO (YYYY-MM-DD)
  is_published: boolean;
  cash_back: number;
  is_star: boolean;
  is_archived: boolean;
  images: ProductImage[];
  categories: number[]; // Liste des IDs des catégories
  tags: number[]; // Liste des IDs des tags
  variants: string[]; // Liste des variantes sous forme de string
  createdAt: string; // Date sous format ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
  updatedAt: string; // Date sous format ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
}

export interface ProductImage {
  url: string;
  is_main: boolean;
}
export interface ProductCartGiftcards {
  amount: number;
  quantity: number;
}
