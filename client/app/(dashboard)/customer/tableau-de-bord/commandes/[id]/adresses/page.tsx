'use client'
import useOrdersCustomer, { OneOrderCustomer } from '@/components/pages/dashboard/customer/hooks/useOrdersCustomer';
import OrderAddresses from '@/components/shared/OrderAddresses';
import React, { useEffect, useState } from 'react';
import { notFound } from "next/navigation";
import Link from 'next/link';

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
          <Link href="/customer/tableau-de-bord/commandes/liste" className='underline text-blue-300'>Retour à la liste</Link>
            {orderData && <OrderAddresses addresses={orderData?.addresses} />}
        </div>
    );
};

export default AddressPage;