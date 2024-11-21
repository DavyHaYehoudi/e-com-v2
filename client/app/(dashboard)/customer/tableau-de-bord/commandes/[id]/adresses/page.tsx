'use client'
import useOrdersCustomer, { OneOrderCustomer } from '@/components/pages/dashboard/customer/hooks/useOrdersCustomer';
import OrderAddresses from '@/components/shared/OrderAddresses';
import React, { useEffect, useState } from 'react';
import { notFound } from "next/navigation";

interface AddressPageProps {
    params: {
      id: string;
    };
  }
const AddressPage:React.FC<AddressPageProps> = ({params}) => {
    const [orderData, setOrderData] = useState<OneOrderCustomer | null>(null);
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
            {orderData && <OrderAddresses addresses={orderData?.addresses} />}
        </div>
    );
};

export default AddressPage;