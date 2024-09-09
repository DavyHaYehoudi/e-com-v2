export interface CartRow {
    id: number;
    customer_id: number;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface CartItemRow {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    adding_date: Date;
  }
  
  export interface CartGiftCardRow {
    id: number;
    cart_id: number;
    quantity: number;
    amount: number;
    adding_date: Date;
  }
  
  export interface CartInput {
    items: CartItemInput[];
    gift_cards: CartGiftCardInput[];
  }
  
  export interface CartItemInput {
    product_id: number;
    quantity: number;
    adding_date: string;
  }
  
  export interface CartGiftCardInput {
    amount: number;
    quantity: number;
    adding_date: string;
  }