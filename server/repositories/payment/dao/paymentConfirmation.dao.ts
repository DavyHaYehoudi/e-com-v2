// Représentation des colonnes de la table `order`
export interface OrderDAO {
    id: number;
    customer_id: number;
    order_status_id: number;
    payment_status_id: number;
    confirmation_number: string;
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
export interface OrderAddressDAO {
    id: number;
    type: string; // "shipping" ou "billing"
    company?: string;
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

// Représentation des colonnes de la table `shipping_method`
export interface ShippingMethodDAO {
    id: number;
    name: string;
    icon_url: string;
    estimated_days: number;
    rates: ShippingRateDAO[];
}

// Représentation des colonnes de la table `shipping_method_tarifs`
export interface ShippingRateDAO {
    id: number;
    shipping_method_id: number;
    min_weight: number;
    max_weight: number;
    price: number;
}

// Représentation des colonnes de la table `gift_card`
export interface GiftCardDAO {
    id: number;
    order_id?: number;
    amount: number;
    quantity: number;
}
