import { useFetch } from "@/service/hooks/useFetch";

export interface OrderCustomer {
  id: number;
  customer_id: number;
  order_status_id: number;
  payment_status_id: number;
  confirmation_number: string;
  total_price: number;
  shipping_price: number;
  cashback_earned: number;
  cashback_spent: number;
  created_at: string; // ISO 8601 format date string
  updated_at: string; // ISO 8601 format date string
  code_promo_amount: number;
  total_promo_products: number;
  total_weight: number;
  order_status_label: string;
  order_status_color: string;
  payment_status_label: string;
  payment_status_color: string;
}

export interface OneOrderCustomer {
  order: OrderCustomer;
  addresses: Addresses;
}

export interface Addresses {
  billingAddress: Address;
  shippingAddress: Address;
}

export interface Address {
  id: number;
  type: "billing" | "shipping"; // Typage strict pour les types d'adresse
  company: string | null; // Permet `null` pour les valeurs vides
  email: string;
  phone: string;
  street_number: string;
  address1: string;
  address2: string | null; // Permet `null` pour les lignes d'adresse optionnelles
  city: string;
  postal_code: string;
  country: string;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  order_id: number;
  first_name: string;
  last_name: string;
}

// Typing for the full response (array of orders)
export type OrdersCustomerFetch = OrderCustomer[];
const useOrdersCustomer = (id?: string) => {
  const { triggerFetch: ordersCustomerFetch } = useFetch<OrdersCustomerFetch>(
    "/orders",
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: oneOrderCustomerFetch } = useFetch<OneOrderCustomer>(
    `/orders/${id}`,
    {
      requiredCredentials: true,
    }
  );

  return {
    ordersCustomerFetch,
    oneOrderCustomerFetch,
  };
};

export default useOrdersCustomer;
