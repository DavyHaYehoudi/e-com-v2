import { useFetch } from "@/service/hooks/useFetch";

export interface OneMessageCustomer {
  id?: number;
  sender: "customer" | "admin";
  body: string;
  order_id: number;
  is_read: number;
  created_at: string; // ISO 8601 format date string
}

const useMessagesCustomer = (orderId?: string) => {
  const { triggerFetch: messagesCustomerGet } = useFetch<OneMessageCustomer[]>(
    `/orders/${orderId}/messages`,
    {
      requiredCredentials: true,
    }
  );
  const { triggerFetch: messageCustomerCreate } = useFetch(
    `/orders/${orderId}/messages`,
    { method: "POST", requiredCredentials: true }
  );
  return {
    messagesCustomerGet,
    messageCustomerCreate,
  };
};

export default useMessagesCustomer;
