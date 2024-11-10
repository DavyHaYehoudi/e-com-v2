import { TableCell } from "@/components/ui/table";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DeliveryType } from "@/app/types/DeliveryTypes";
import { formatWeight } from "@/app/utils/weightFormat";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface CartDeliveryProps {
  handleDeliveryChange: (deliveryId: number) => void;
  selectedDelivery: DeliveryType | null;
  weightTotal: number | null;
  deliveries: Array<DeliveryType>;
}
const CartDelivery: React.FC<CartDeliveryProps> = ({
  handleDeliveryChange,
  selectedDelivery,
  weightTotal,
  deliveries,
}) => {
  const isItemsInCart = useSelector((state: RootState) => state.cart.items);
  const isOnlyGiftcardsInCart = isItemsInCart.length === 0;
  
  return (
    <TableCell colSpan={5} className="border-b border-gray-500">
      Prix de la livraison ({weightTotal && formatWeight(weightTotal)}) :{" "}
      {selectedDelivery?.name}
      {!isOnlyGiftcardsInCart && (
        <RadioGroup
          value={selectedDelivery?.id.toString()}
          onValueChange={(value) => handleDeliveryChange(parseInt(value))}
          className="m-4"
        >
          {deliveries
            .sort((a) => (a.is_default ? -1 : 1)) // Par défaut, la livraison avec is_default=true est toujours en premier
            .filter((delivery) => !delivery.is_free)
            .map((delivery) => (
              <div key={delivery.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={delivery.id.toString()}
                  id={`delivery-${delivery.id}`}
                />
                <Label htmlFor={`delivery-${delivery.id}`}>
                  {delivery.name}
                </Label>
              </div>
            ))}
        </RadioGroup>
      )}
    </TableCell>
  );
};

export default CartDelivery;
