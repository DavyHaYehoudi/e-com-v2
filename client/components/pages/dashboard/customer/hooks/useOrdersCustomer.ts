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
  payment_status_label: string;
}

// Typing for the full response (array of orders)
export type OrdersCustomerFetch = OrderCustomer[];
const useOrdersCustomer = () => {
  const { triggerFetch: ordersCustomerFetch } = useFetch<OrdersCustomerFetch>(
    "/orders",
    {
      requiredCredentials: true,
    }
  );

  return {
    ordersCustomerFetch,
  };
};

export default useOrdersCustomer;
