import { MasterProductsType, Product } from "./ProductTypes";

// Type pour la wishlist
export type Wishlist = {
  id: number;
  created_at: string;
  updated_at: string;
  customer_id: number;
};

// Type pour la réponse globale
export type WishlistResponse = {
  wishlist?: Wishlist;
  items: MasterProductsType[] ;
};
