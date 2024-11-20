"use client";
import useOrdersCustomer, {
  OrdersCustomerFetch,
} from "@/components/pages/dashboard/customer/hooks/useOrdersCustomer";
import OrdersList from "@/components/pages/dashboard/customer/orders/liste/OrdersList";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const OrdersListPage = () => {
  const [data, setData] = useState<OrdersCustomerFetch>([]);
  const { ordersCustomerFetch } = useOrdersCustomer();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await ordersCustomerFetch();
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchOrders();
  }, [ordersCustomerFetch]);
  return (
    <div>
      <h1 className="text-center mb-10">Liste des commandes</h1>
      <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
        <OrdersList data={data} />
      </div>
    </div>
  );
};

export default OrdersListPage;
