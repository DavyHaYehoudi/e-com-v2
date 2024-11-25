'use client'
import useOrdersCustomer, { OneOrderCustomer } from '@/components/pages/dashboard/customer/hooks/useOrdersCustomer';
import OrderAddresses from '@/components/shared/OrderAddresses';
import React, { useEffect, useState } from 'react';
import { notFound } from "next/navigation";
import Link from 'next/link';
import TrackingPage from './TrackingPage';
import useTrackingCustomer from '@/components/pages/dashboard/customer/hooks/useTrackingCustomer';

interface ShippingPageProps {
    params: {
      id: string;
    };
  }
const ShippingPage:React.FC<ShippingPageProps> = ({params}) => {
    const [orderData, setOrderData] = useState<OneOrderCustomer | null>(null);
    const [trackingNumberAdmin, setTrackingNumberAdmin] = useState("");
    const { id } = params;
    if (!id) {
      notFound(); // Gère le cas où l'ID est manquant
    }
    const { oneOrderCustomerFetch } = useOrdersCustomer(id);
    const{trackingCustomerFetch}=useTrackingCustomer(id)
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
    useEffect(() => {
      const fetchTrackingCustomer = async () => {
        try {
          const data = await trackingCustomerFetch(id);
          if (data) {
            const trackingNumber = data.find(track=>track.sender==="admin")?.tracking_number
            setTrackingNumberAdmin(trackingNumber||"");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du numéro de suivi :", error);
        }
      };
      fetchTrackingCustomer();
    }, [id, trackingCustomerFetch]);
    return (
        <div>
          <Link href="/customer/tableau-de-bord/commandes/liste" className='underline text-blue-300'>Retour à la liste</Link>
          <div>

            {orderData && <OrderAddresses addresses={orderData?.addresses} />}
            <TrackingPage trackingNumber={trackingNumberAdmin} />
          </div>
        </div>
    );
};

export default ShippingPage;