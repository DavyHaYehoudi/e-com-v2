import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { calculateTotalDiscountCart } from "../utils/calculUtils";
import { formatPrice } from "@/app/utils/pricesFormat";
import { CartResponse } from "@/app/types/CartTypes";

interface RowPromotionProps {
  productsInCart: CartResponse | null;
}
const RowPromotion: React.FC<RowPromotionProps> = ({ productsInCart }) => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="border-b border-gray-500">
        Total des promotions
      </TableCell>
      <TableCell className="text-right border-b border-gray-500">
        {productsInCart &&
          (calculateTotalDiscountCart(productsInCart.items) > 0
            ? `- ${formatPrice(
                calculateTotalDiscountCart(productsInCart.items)
              )}`
            : 0)}
      </TableCell>
    </TableRow>
  );
};

export default RowPromotion;
