import { MasterProductsType } from "./ProductTypes";


// Type pour une carte cadeau
export type WishlistGiftCard = {
    id: number;
    quantity: number;
    wishlist_id: number;
    created_at: string;
    updated_at: string;
    amount: number;
};

// Type pour la wishlist
export type Wishlist = {
    id: number;
    created_at: string;
    updated_at: string;
    customer_id: number;
};

// Type pour la réponse globale
export type WishlistResponse = {
    wishlist: Wishlist;
    items: MasterProductsType[];
    giftCards: WishlistGiftCard[];
};
