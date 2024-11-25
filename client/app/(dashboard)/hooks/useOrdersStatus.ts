import { useState, useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";

// Typage pour un seul statut de commande
export interface OrderStatus {
  id: number;
  label: string;
  color: string; // Code couleur en format hexadécimal
}

// Typage pour la réponse complète
interface OrdersStatusResponse {
  ordersStatus: OrderStatus[];
}


export const useOrdersStatus = () => {
  const [ordersStatus, setOrdersStatus] = useState<OrderStatus[]>([]);
  const { triggerFetch: ordersStatusFetch } = useFetch<OrdersStatusResponse>(
    "/orders-status",
    { requiredCredentials: true }
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await ordersStatusFetch();
      if (data) setOrdersStatus(data.ordersStatus);
    };

    fetchData();
  }, [ordersStatusFetch]);

  return { ordersStatus };
};

export default useOrdersStatus;
