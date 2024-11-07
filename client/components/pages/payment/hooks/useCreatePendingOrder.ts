"use client";
import { OrderResponse } from "@/app/types/OrderCreate";
import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCreatePendingOrder = () => {
  const [createOrder, setCreateOrder] = useState<OrderResponse | null>(null);
  const [isTriggered, setIsTriggered] = useState(false); // état pour savoir si l'appel a été déclenché

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
  const order_address_shipping = useSelector(
    (state: RootState) => state.addresses.shipping
  );
  const order_address_billing = useSelector(
    (state: RootState) => state.addresses.billing
  );

  const formatData = {
    giftCardIds,
    shippingMethodId,
    cashBackToSpend,
    codePromo,
    order_address_billing,
    order_address_shipping,
  };

  const { data: pendingOrder, triggerFetch } = useFetch<OrderResponse>(
    "/payment/confirm",
    {
      method: "POST",
      requiredCredentials: true,
    }
  );

  // Cette fonction va être appelée pour lancer le fetch
  const triggerOrderCreation = () => {
    setIsTriggered(true);
    triggerFetch(formatData);
  };

  // Lorsque les données sont récupérées, on met à jour l'état `createOrder`
  useEffect(() => {
    if (pendingOrder && isTriggered) {
      setCreateOrder(pendingOrder);
    }
  }, [pendingOrder, isTriggered]);

  return { createOrder, triggerOrderCreation }; // On expose la fonction trigger
};

export default useCreatePendingOrder;
