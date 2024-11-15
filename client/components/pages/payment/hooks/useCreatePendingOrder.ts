"use client";

import { OrderResponse } from "@/app/(public)/types/OrderCreate";
import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { useSelector } from "react-redux";

const useCreatePendingOrder = () => {
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

  const { triggerFetch } = useFetch<OrderResponse>("/payment/confirm", {
    method: "POST",
    requiredCredentials: true,
  });
  const getConfirmationNumber = async () => {
    try {
      const data = await triggerFetch(formatData);
      if (data) {
        return data.order.confirmation_number;
      }
    } catch (error) {
      console.log("error dans useCreatePendingOrder :", error);
    }
  };
  return { getConfirmationNumber };
};

export default useCreatePendingOrder;
