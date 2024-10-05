import { DeliveryType } from "@/app/types/DeliveryTypes";

export const defaultDeliveryName = (
  deliveries: DeliveryType[]
): string | undefined => {
  return deliveries.find((delivery) => delivery.is_default)?.name;
};
