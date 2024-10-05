import { TableCell } from "@/components/ui/table";
import React from "react";
import { defaultDeliveryName } from "./utils/deliveryUtils";
import { deliveries } from "@/app/mocks/delivery";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CartDelivery = () => {
  return (
    <TableCell colSpan={5}>
      Prix de la livraison {defaultDeliveryName(deliveries)}{" "}
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    </TableCell>
  );
};

export default CartDelivery;
