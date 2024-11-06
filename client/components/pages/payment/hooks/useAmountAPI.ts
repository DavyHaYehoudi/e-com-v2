"use client";
import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface AmountType {
  amount: number;
}
const useAmountApi = () => {
  const [amountApi, setAmountApi] = useState(0);
  const giftCardIds = useSelector((state: RootState) => state.priceAdjustments.giftCards);
  const codePromo = useSelector(
    (state: RootState) => state.priceAdjustments.promoCode
  );
  const shippingMethodId = useSelector(
    (state: RootState) => state.priceAdjustments.shippingMethod
  );
  const cashBackToSpend = useSelector(
    (state: RootState) => state.priceAdjustments.cashBackToSpend
  );
  const queries = {
    codePromo,
    giftCardIds,
    shippingMethodId,
    cashBackToSpend,
  };
  
  const queryParams = new URLSearchParams();
  
  // Ajouter chaque paramètre en vérifiant s'il est défini
  if (queries.codePromo) queryParams.append("codePromo", String(queries.codePromo));
  if (queries.shippingMethodId) queryParams.append("shippingMethodId", String(queries.shippingMethodId));
  if (queries.cashBackToSpend) queryParams.append("cashBackToSpend", String(queries.cashBackToSpend));
  
  // Pour giftCardIds, ajouter chaque élément du tableau individuellement
  if (queries.giftCardIds && Array.isArray(queries.giftCardIds)) {
    queries.giftCardIds.forEach((id) => queryParams.append("giftCardIds", String(id)));
  }
  
  const { data, triggerFetch } = useFetch<AmountType>(`/payment/amount?${queryParams.toString()}`, {
    requiredCredentials: true,
  });
  
  useEffect(() => {
    triggerFetch();
  }, []);
  useEffect(() => {
    if (data) {
      setAmountApi(data.amount);
    }
  }, [data]);
  return {amountApi};
};
export default useAmountApi;
