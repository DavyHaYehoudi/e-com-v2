"use client";
import useCustomerInfo, {
  CashBackHistoryResponse,
} from "@/components/pages/dashboard/customer/hooks/useCustomerInfo";
import CashbackBanner from "@/components/pages/dashboard/customer/advantages/cashback/CashbackBanner";
import CashbackHistory from "@/components/pages/dashboard/customer/advantages/cashback/CashbackHistory";
import CashbackSummary from "@/components/pages/dashboard/customer/advantages/cashback/CashbackSummary";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CashbackHistoryPage = () => {
  const [history, setHistory] = useState<CashBackHistoryResponse | null>(null);
  const { cashbackHistoryFetch } = useCustomerInfo();
  // Charger les données de l'historique du cashback
  useEffect(() => {
    const fetchCashbackHistory = async () => {
      try {
        const data = await cashbackHistoryFetch();
        if (data) setHistory(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de votre historique :",
          error
        );
        toast.error("Impossible de charger vos informations.");
      }
    };

    fetchCashbackHistory();
  }, [cashbackHistoryFetch]);
  return (
    <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
      <CashbackSummary history={history} />
      <CashbackBanner />
      <CashbackHistory history={history} />
    </div>
  );
};

export default CashbackHistoryPage;
