"use client";
import { OrderResponse } from "@/app/types/OrderCreate";
import { setCreatePendingOrder } from "@/redux/slice/paymentSlice";
import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCreatePendingOrder = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const dispatch = useDispatch();

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
  // const triggerOrderCreation = async () => {
  //   setIsTriggered(true);
  //   await triggerFetch(formatData);
  // };

  // Lorsque les données sont récupérées, on met à jour l'état `createOrder`
  // useEffect(() => {
  //   if (pendingOrder && isTriggered) {
  //     dispatch(setCreatePendingOrder(pendingOrder));
  //   }
  // }, [pendingOrder, isTriggered, dispatch]);

  return { triggerOrderCreation };
};

export default useCreatePendingOrder;
