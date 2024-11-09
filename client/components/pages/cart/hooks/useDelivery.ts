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
  const productsInCart = useSelector((state: RootState) => state.cart);
  const isItemsInCart = useSelector((state: RootState) => state.cart.items);
  const selectedDeliveryId = useSelector(
    (state: RootState) => state.priceAdjustments.shippingMethod
  );
  const defaultDelivery = () => {
    // S'il n'y a ni items dans le panier ni cartes cadeaux alors le panier est affiché vide.
    // Si le panier s'affiche et que les items sont vides alors c'est qu'il ne contient que des cartes cadeaux.
    const isOnlyGiftcardsInCart = isItemsInCart.length === 0;
    return (
      deliveries?.find((delivery) =>
        isOnlyGiftcardsInCart ? delivery.is_free : delivery.is_default
      ) || null
    );
  };
  useEffect(() => {
    const defaultDeliveryInit = defaultDelivery();
    if (defaultDeliveryInit) {
      dispatch(setShippingMethod(defaultDeliveryInit.id));
    }
  }, [deliveries, isItemsInCart]);
  const { data, triggerFetch } = useFetch<DeliveryType[]>("/deliveries");

  useEffect(() => {
    triggerFetch();
  }, []);

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

  const deliveryPrice =
    productsInCart &&
    calculateDeliveryPrice({
      selectedDelivery,
      totalWeight: calculateTotalWeightCart(productsInCart.items),
    });

  return { deliveries, selectedDelivery, handleDeliveryChange, deliveryPrice };
};
