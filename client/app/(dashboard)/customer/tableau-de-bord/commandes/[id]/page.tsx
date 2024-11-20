"use client";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import MasterOrderTable from "./MasterOrderTable";
import useOrdersCustomer, {
  OneOrderCustomer,
} from "@/components/pages/dashboard/customer/hooks/useOrdersCustomer";
interface OneOrderProps {
  params: {
    id: string;
  };
}
const MasterOrderPage = ({ params }: OneOrderProps) => {
  const [orderData, setOrderData] = useState<OneOrderCustomer | null>(null);
  console.log("orderData:", orderData);
  const { id } = params;
  if (!id) {
    notFound(); // Gère le cas où l'ID est manquant
  }
  const { oneOrderCustomerFetch } = useOrdersCustomer(id);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await oneOrderCustomerFetch(id);
        if (data) {
          setOrderData(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la commande :", error);
      }
    };
    fetchOrder();
  }, [id, oneOrderCustomerFetch]);
  return (
    <div>
      une commande en particulier : {id}
      <div className="sm:w-3/4 xl:mx-auto w-[300px]"><MasterOrderTable data={orderData} /></div>
      
    </div>
  );
};

export default MasterOrderPage;
