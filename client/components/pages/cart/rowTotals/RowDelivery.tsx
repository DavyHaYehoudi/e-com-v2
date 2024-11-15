import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import CartDelivery from "../CartDelivery";
import { formatPrice } from "@/app/utils/pricesFormat";
import { DeliveryType } from "@/app/(public)/types/DeliveryTypes";

interface RowDeliveryProps {
  handleDeliveryChange: (deliveryId: number) => void;
  selectedDelivery: DeliveryType | null;
  weightTotal: number | null;
  deliveryPrice: number | null;
  deliveries: Array<DeliveryType>;
}
const RowDelivery: React.FC<RowDeliveryProps> = ({
  handleDeliveryChange,
  selectedDelivery,
  weightTotal,
  deliveryPrice,
  deliveries,
}) => {
  return (
    <TableRow>
      <CartDelivery
        handleDeliveryChange={handleDeliveryChange}
        selectedDelivery={selectedDelivery}
        weightTotal={weightTotal}
        deliveries={deliveries}
      />
      <TableCell className="text-right border-b border-gray-500 whitespace-nowrap">
        {deliveryPrice && formatPrice(deliveryPrice)}
      </TableCell>
    </TableRow>
  );
};

export default RowDelivery;
