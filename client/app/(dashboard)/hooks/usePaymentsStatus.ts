import { useState, useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";

// Typage pour un seul statut de payment
export interface PaymentStatus {
  id: number;
  label: string;
  color: string; // Code couleur en format hexadécimal
}

// Typage pour la réponse complète
interface PaymentsStatusResponse {
  paymentsStatus: PaymentStatus[];
}

export const usePaymentsStatus = () => {
  const [paymentsStatus, setPaymentsStatus] = useState<PaymentStatus[]>([]);
  const { triggerFetch: paymentsStatusFetch } =
    useFetch<PaymentsStatusResponse>("/payment/status", {
      requiredCredentials: true,
    });

  useEffect(() => {
    const fetchData = async () => {
      const data = await paymentsStatusFetch();
      if (data) setPaymentsStatus(data.paymentsStatus);
    };

    fetchData();
  }, [paymentsStatusFetch]);

  return { paymentsStatus };
};

export default usePaymentsStatus;
