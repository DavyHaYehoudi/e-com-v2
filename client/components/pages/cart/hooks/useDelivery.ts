import { useEffect, useState } from "react";
import { DeliveryType } from "@/app/(public)/types/DeliveryTypes";
import { useFetch } from "@/service/hooks/useFetch";
import { calculateDeliveryPrice } from "../utils/deliveryUtils";
import { calculateTotalWeightCart } from "../utils/calculUtils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setShippingMethod } from "@/redux/slice/priceAdjustmentsSlice";

export const useDelivery = () => {
  const [deliveries, setDeliveries] = useState<DeliveryType[]>([]);
  const dispatch = useDispatch();

  const { items, giftCards } = useSelector((state: RootState) => state.cart);
  const totalOrderAmountBeforeDiscount = useSelector(
    (state: RootState) => state.cart.amountBeforeDiscount
  );
  const isOnlyGiftcardsInCart = items.length === 0 && giftCards.length > 0;
  const selectedDeliveryId = useSelector(
    (state: RootState) => state.priceAdjustments.shippingMethod
  );
  const amountForFree =
    deliveries?.find((delivery) => delivery.free_from && delivery.is_active)
      ?.free_from || null;

  const isAmountSufficientForFree = amountForFree
    ? totalOrderAmountBeforeDiscount >= amountForFree
    : false;

  const defaultDelivery = () => {
    if (isAmountSufficientForFree) {
      return deliveries.find((delivery) => delivery.free_from);
    }
    return deliveries?.find((delivery) =>
      isOnlyGiftcardsInCart ? null : delivery.is_default
    );
  };

  useEffect(() => {
    if (deliveries.length > 0) {
      const defaultDeliveryInit = defaultDelivery();
      if (defaultDeliveryInit) {
        dispatch(setShippingMethod(defaultDeliveryInit.id));
      } else {
        // Si le panier ne contient que des cartes cadeaux
        dispatch(setShippingMethod(null));
      }
    }
  }, [deliveries, isOnlyGiftcardsInCart, dispatch, isAmountSufficientForFree]);

  const { data, triggerFetch } = useFetch<DeliveryType[]>("/deliveries");

  useEffect(() => {
    triggerFetch();
  }, [triggerFetch]);

  useEffect(() => {
    if (data) {
      setDeliveries(data);
    }
  }, [data]);

  const handleDeliveryChange = (deliveryId: number) => {
    const selected = deliveries.find((delivery) => delivery.id === deliveryId);
    if (selected) {
      dispatch(setShippingMethod(selected.id));
    }
  };

  const selectedDelivery =
    deliveries.find((delivery) => delivery.id === selectedDeliveryId) || null;

  const deliveryPrice = selectedDelivery
    ? calculateDeliveryPrice({
        selectedDelivery,
        totalWeight: calculateTotalWeightCart(items),
      })
    : 0;

  return {
    deliveries,
    selectedDelivery,
    handleDeliveryChange,
    deliveryPrice,
    amountForFree,
    isAmountSufficientForFree,
  };
};
