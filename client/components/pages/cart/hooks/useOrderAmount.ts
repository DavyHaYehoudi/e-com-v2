"use client";
// hooks/useOrderAmount.ts
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { OrderAmountApi } from "@/app/(public)/types/OrderAmountApi";
import { setAmountBeforeDiscount } from "@/redux/slice/cartSlice";

export const useOrderAmount = () => {
  const [orderAmount, setOrderAmount] = useState(0);

  // const cart = useSelector((state: RootState) => state.cart);
  const giftCardIds = useSelector(
    (state: RootState) => state.priceAdjustments.giftCards
  );
  const codePromo = useSelector(
    (state: RootState) => state.priceAdjustments.promoCode
  );
  const shippingMethodId =
    useSelector((state: RootState) => state.priceAdjustments.shippingMethod) ||
    "";
  const cashBackToSpend = useSelector(
    (state: RootState) => state.priceAdjustments.cashBackToSpend
  );
  const dispatch = useDispatch();
  // Construction de la query string
  const query = `?${giftCardIds
    .map((id) => `giftCardIds=${id}`)
    .join(
      "&"
    )}&codePromo=${codePromo}&shippingMethodId=${shippingMethodId}&cashBackToSpend=${cashBackToSpend}`;

  // Utilisation de useFetch pour obtenir le montant de la commande
  const { triggerFetch } = useFetch<OrderAmountApi>(`/payment/amount${query}`, {
    requiredCredentials: true,
  });

  const getAmountBeforeDiscount = async () => {
    try {
      const order = await triggerFetch();
      if (order) {
        dispatch(
          setAmountBeforeDiscount({ amount: order.totalAmountBeforeDiscount })
        );
      }
    } catch (error) {
      console.log(
        "Erreur dans useOrderAmount pour getAmountBeforeDiscount :",
        error
      );
    }
  };

  const getOrderAmount = useCallback(async () => {
    try {
      const order = await triggerFetch();
      if (order) {
        setOrderAmount(order.orderAmount);
      }
    } catch (error) {
      console.log("Erreur dans useOrderAmount pour getOrderAmount :", error);
    }
  }, [triggerFetch]);

  return { getOrderAmount, orderAmount, getAmountBeforeDiscount };
};
