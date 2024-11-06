"use client";
import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface ClientSecretType {
  clientSecret: string;
}

const useClientSecret = () => {
  const [clientSecret, setClientSecret] = useState("");
  const giftCardIds = useSelector((state: RootState) => state.cart.giftCards);
  const codePromo = useSelector(
    (state: RootState) => state.priceAdjustments.promoCode
  );
  const shippingMethodId = useSelector(
    (state: RootState) => state.priceAdjustments.shippingMethod
  );
  const bodyData = {
    codePromo,
    giftCardIds,
    shippingMethodId,
  };
  const { data, triggerFetch } = useFetch<ClientSecretType>("/payment/amount", {
    method: "POST",
    requiredCredentials: true,
  });
  useEffect(() => {
    triggerFetch({ bodyData });
  }, []);
  useEffect(() => {
    if (data) {
      setClientSecret(data.clientSecret);
    }
  }, [data]);
  return clientSecret;
};
export default useClientSecret;
