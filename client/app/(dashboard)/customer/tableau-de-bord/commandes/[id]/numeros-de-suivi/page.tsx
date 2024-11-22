"use client";
import useTrackingCustomer, {
  TrackingsList,
} from "@/components/pages/dashboard/customer/hooks/useTrackingCustomer";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import TrackingNumber from "@/components/shared/TrackingNumber";
import TrackingFormCustomer from "@/components/shared/TrackingFormCustomer";
import useOrdersCustomer, {
  OneOrderCustomer,
} from "@/components/pages/dashboard/customer/hooks/useOrdersCustomer";
import Link from "next/link";

interface TrackingsPageProps {
  params: {
    id: string;
  };
}
const TrackingsPage: React.FC<TrackingsPageProps> = ({ params }) => {
  const [orderData, setOrderData] = useState<OneOrderCustomer | null>(null);
  const [trackings, setTrackings] = useState<TrackingsList>([]);
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
  const { trackingCustomerFetch } = useTrackingCustomer(id);
  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const data = await trackingCustomerFetch(id);
        if (data) {
          setTrackings(data);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du numéro de suivi :",
          error
        );
      }
    };
    fetchTracking();
  }, [id, trackingCustomerFetch]);
  const trackingCustomer = trackings.find(
    (track) => track.sender === "customer"
  );
  const trackingAdmin = trackings.find((track) => track.sender === "admin");
  return (
    <div>
      <h1 className="text-center mb-20">
        Commande № {orderData?.order.confirmation_number}{" "}
      </h1>
      <Link
        href="/customer/tableau-de-bord/commandes/liste"
        className="underline text-blue-300"
      >
        Retour à la liste
      </Link>
      <section className="sm:w-full lg:w-3/4 sm:mx-auto my-20">
        <div className="mt-10 flex flex-wrap justify-center gap-5 items-center">
          {trackingCustomer && (
            <TrackingNumber
              tracking={trackingCustomer}
              confirmationNumber={orderData?.order.confirmation_number}
            />
          )}
          {trackingAdmin && (
            <TrackingNumber
              tracking={trackingAdmin}
              confirmationNumber={orderData?.order.confirmation_number}
            />
          )}
        </div>
        <div className="w-full xl:w-1/2 my-10 mx-auto">
          <TrackingFormCustomer orderId={id} />
        </div>
      </section>
    </div>
  );
};

export default TrackingsPage;
