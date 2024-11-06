import { useEffect, useState } from "react";
import { DeliveryType } from "@/app/types/DeliveryTypes";
import { useFetch } from "@/service/hooks/useFetch";
import {
  calculateDeliveryPrice,
  defaultDelivery,
} from "../utils/deliveryUtils";
import { CartResponse } from "@/app/types/CartTypes";
import { calculateTotalWeightCart } from "../utils/calculUtils";

export const useDelivery = (productsInCart: CartResponse | null) => {
  const [deliveries, setDeliveries] = useState<DeliveryType[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryType | null>(
    null
  );

  const { data, triggerFetch } = useFetch<DeliveryType[]>("/deliveries");

  useEffect(() => {
    triggerFetch();
  }, []);

  useEffect(() => {
    if (data) {
      setDeliveries(data);
      if (!selectedDelivery) {
        setSelectedDelivery(defaultDelivery(data));
      }
    }
  }, [data]);

  const handleDeliveryChange = (deliveryId: number) => {
    const selected = deliveries.find((delivery) => delivery.id === deliveryId);
    if (selected) {
      setSelectedDelivery(selected);
    }
  };

  const deliveryPrice =
    productsInCart &&
     calculateDeliveryPrice({
      selectedDelivery,
      totalWeight: calculateTotalWeightCart(productsInCart.items),
    });

  return { deliveries, selectedDelivery, handleDeliveryChange, deliveryPrice };
};
