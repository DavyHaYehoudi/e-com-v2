import { DeliveryType } from "@/app/types/DeliveryTypes";

export const defaultDelivery = (
  deliveries: DeliveryType[]
): DeliveryType | null => {
  return deliveries.find((delivery) => delivery.is_default) || null;
};

interface DeliveryPrice {
  selectedDelivery: DeliveryType | null;
  totalWeight?: number;
}
export const calculateDeliveryPrice = ({
  selectedDelivery,
  totalWeight,
}: DeliveryPrice): number => {
  if (!selectedDelivery) return 0;

  const rate =
    totalWeight &&
    selectedDelivery.rates.find(
      (r) => totalWeight >= r.min_weight && totalWeight <= r.max_weight
    );
  return rate ?  rate.price : 0;
};
