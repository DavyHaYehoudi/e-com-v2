"use client";
// hooks/useOrderAmount.ts
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useFetch } from "@/service/hooks/useFetch";
import { OrderAmountApi } from "@/app/types/OrderAmountApi";
import { setAmountBeforeDiscount } from "@/redux/slice/cartSlice";

export const useOrderAmount = () => {
  const [orderAmount, setOrderAmount] = useState(0);

  const cart = useSelector((state: RootState) => state.cart);
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
  const dispatch = useDispatch();
  // Construction de la query string
  const query = `?${giftCardIds
    .map((id) => `giftCardIds=${id}`)
    .join(
      "&"
    )}&codePromo=${codePromo}&shippingMethodId=${shippingMethodId}&cashBackToSpend=${cashBackToSpend}`;

  // Utilisation de useFetch pour obtenir le montant de la commande
  const { data: order, triggerFetch } = useFetch<OrderAmountApi>(
    `/payment/amount${query}`,
    { requiredCredentials: true }
  );

  useEffect(() => {
    if (shippingMethodId) {
      triggerFetch();
    }
  }, [
    giftCardIds,
    codePromo,
    shippingMethodId,
    cashBackToSpend,
    cart.totalItemsCount,
  ]);

  useEffect(() => {
    if (order) {
      setOrderAmount(order.orderAmount);
      dispatch(
        setAmountBeforeDiscount({ amount: order.totalAmountBeforeDiscount })
      );
    }
  }, [order]);

  return orderAmount;
};
