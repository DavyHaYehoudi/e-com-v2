import { useEffect, useState } from "react";
import { DeliveryType } from "@/app/types/DeliveryTypes";
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
  const isOnlyGiftcardsInCart = items.length === 0 && giftCards.length > 0;
  const selectedDeliveryId = useSelector(
    (state: RootState) => state.priceAdjustments.shippingMethod
  );

  const defaultDelivery = () =>
    deliveries?.find((delivery) =>
      isOnlyGiftcardsInCart ? delivery.is_free : delivery.is_default
    ) || null;

  useEffect(() => {
    if (deliveries.length > 0) {
      const defaultDeliveryInit = defaultDelivery();
      if (defaultDeliveryInit) {
        dispatch(setShippingMethod(defaultDeliveryInit.id));
      }
    }
  }, [deliveries, isOnlyGiftcardsInCart, dispatch]);

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

  return { deliveries, selectedDelivery, handleDeliveryChange, deliveryPrice };
};
