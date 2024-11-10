import { ResultSetHeader, RowDataPacket } from "mysql2";

// Représentation des colonnes de la table `order`
export interface OrderDAO extends ResultSetHeader{
    id: number;
    customer_id: number;
    order_status_id: number;
    payment_status_id: number;
    confirmation_number: string;
    notes_admin: string;
    code_promo_amount: number;
    total_promo_products: number;
    total_price: number;
    shipping_price: number;
    cashback_earned: number;
    cashback_spent: number;
    created_at: Date;
    updated_at: Date;
}
export interface OrderDAORow extends RowDataPacket{
    id: number;
    customer_id: number;
    order_status_id: number; 
    payment_status_id: number;
    confirmation_number: string;
    notes_admin: string;
    code_promo_amount: number;
    total_promo_products: number;
    total_price: number;
    shipping_price: number;
    cashback_earned: number;
    cashback_spent: number;
    created_at: Date;
    updated_at: Date;
}

// Représentation des colonnes de la table `order_address`
export interface OrderAddressDAO extends ResultSetHeader{
    id: number;
    type: string; // "shipping" ou "billing"
    company?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    street_number: string;
    address1: string;
    address2?: string;
    city: string;
    postal_code: string;
    country: string;
    order_id: number;
    created_at: Date;
    updated_at: Date;
}

// Représentation des colonnes de la table `gift_card`
export interface GiftCardDAO {
    id: number;
    order_id?: number;
    amount: number;
    quantity: number;
}
