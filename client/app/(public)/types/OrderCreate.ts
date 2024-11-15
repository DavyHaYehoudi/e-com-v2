// Typage pour la réponse de l'API
export interface OrderResponse {
    order: Order;
    giftCards: GiftCard[];
    products: Product[];
    firstName: string;
  }
  
  // Typage pour l'objet `order`
  export interface Order {
    customer_id: number;
    payment_status: string;
    order_status: string;
    confirmation_number: string;
    notes_admin: string | null;
    total_price: number;
    code_promo_amount: number;
    total_promo_products: number;
    shipping_price: number;
    cash_back_earned: number;
    cash_back_spent: number;
    createdAt: string; // ISO string (Date format)
    updatedAt: string; // ISO string (Date format)
  }
  
  // Typage pour les objets `giftCards`
  export interface GiftCard {
    code: string;
    amount: number;
    balance: number;
    expirationDate: string; // ISO string (Date format)
  }
  
  // Typage pour les objets `products`
  export interface Product {
    name: string;
    article_number: number;
    discount_percentage: number;
    price_before_discount: number;
  }
  