import { TableCell } from "@/components/ui/table";
import React from "react";
import { deliveries } from "@/app/mocks/delivery";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DeliveryType } from "@/app/types/DeliveryTypes";
import { formatWeight } from "@/app/utils/weightFormat";

interface CartDeliveryProps {
  handleDeliveryChange: (deliveryId: number) => void;
  selectedDelivery: DeliveryType | undefined;
  weightTotal: number; 
}
const CartDelivery: React.FC<CartDeliveryProps> = ({
  handleDeliveryChange,
  selectedDelivery,
  weightTotal
}) => {
  return (
    <TableCell colSpan={5}>
      Prix de la livraison ({formatWeight(weightTotal)}) : {selectedDelivery?.name}
      <RadioGroup
        value={selectedDelivery?.id.toString()}
        onValueChange={(value) => handleDeliveryChange(parseInt(value))}
      >
       {deliveries
  .sort((a, b) => (a.is_default ? -1 : 1)) // Par défaut, la livraison avec is_default=true est toujours en premier
  .map((delivery) => (
    <div key={delivery.id} className="flex items-center space-x-2">
      <RadioGroupItem
        value={delivery.id.toString()}
        id={`delivery-${delivery.id}`}
      />
      <Label htmlFor={`delivery-${delivery.id}`}>{delivery.name}</Label>
    </div>
  ))}
      </RadioGroup>
    </TableCell>
  );
};

export default CartDelivery;
