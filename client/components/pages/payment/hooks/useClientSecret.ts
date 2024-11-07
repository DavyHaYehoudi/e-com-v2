"use client";
import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface ClientSecretType {
  clientSecret: string;
  amount: number;
}

const useClientSecret = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);
  const giftCardIds = useSelector(
    (state: RootState) => state.priceAdjustments.giftCards
  );
  const codePromo = useSelector(
    (state: RootState) => state.priceAdjustments.promoCode
  );
  const shippingMethodId = useSelector(
    (state: RootState) => state.priceAdjustments.shippingMethod
  );
  const cashBackToSpend = useSelector(
    (state: RootState) => state.priceAdjustments.cashBackToSpend
  );
  const emailCustomer = useSelector(
    (state: RootState) => state.auth.user?.email
  );
  const bodyData = {
    codePromo,
    giftCardIds,
    shippingMethodId,
    cashBackToSpend,
    emailCustomer,
  };
  const { data, triggerFetch } = useFetch<ClientSecretType>("/payment/intent", {
    method: "POST",
    requiredCredentials: true,
  });
  useEffect(() => {
    triggerFetch({ bodyData });
  }, []);
  useEffect(() => {
    if (data) {
      setClientSecret(data.clientSecret);
      setAmount(data.amount);
    }
  }, [data]);
  return { clientSecret, amount };
};
export default useClientSecret;
