import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import CartDelivery from "../CartDelivery";
import { formatPrice } from "@/app/utils/pricesFormat";
import { DeliveryType } from "@/app/types/DeliveryTypes";

interface RowDeliveryProps {
  handleDeliveryChange: (deliveryId: number) => void;
  selectedDelivery: DeliveryType | undefined;
  weightTotal: number | null;
  deliveryPrice: number | null;
}
const RowDelivery: React.FC<RowDeliveryProps> = ({
  handleDeliveryChange,
  selectedDelivery,
  weightTotal,
  deliveryPrice,
}) => {
  return (
    <TableRow>
      <CartDelivery
        handleDeliveryChange={handleDeliveryChange}
        selectedDelivery={selectedDelivery}
        weightTotal={weightTotal}
      />
      <TableCell className="text-right border-b border-gray-500 whitespace-nowrap">
        {deliveryPrice && formatPrice(deliveryPrice)}
      </TableCell>
    </TableRow>
  );
};

export default RowDelivery;
