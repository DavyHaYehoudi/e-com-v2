import { formatPrice } from "@/app/utils/pricesFormat";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { calculateTotalCartAfterCashback } from "../utils/calculUtils";
import { GiftcardToUseType } from "@/app/types/GiftcardToUseTypes";
import { CartResponse } from "@/app/types/CartTypes";

interface RowTotalCartProps {
  productsInCart: CartResponse | null;
  deliveryPrice: number | null;
  giftCardsToUse: GiftcardToUseType[];
  codePromoPercentage: number;
  selectedCashback: number | null;
}
const RowTotalCart: React.FC<RowTotalCartProps> = ({
  productsInCart,
  deliveryPrice,
  giftCardsToUse,
  codePromoPercentage,
  selectedCashback,
}) => {
  return (
    <TableRow className="font-extrabold">
      <TableCell colSpan={5} className="border-b border-gray-500">
        Total du panier
      </TableCell>
      <TableCell className="text-right border-b border-gray-500 whitespace-nowrap">
        {productsInCart &&
          deliveryPrice !== null &&
          formatPrice(
            calculateTotalCartAfterCashback(
              productsInCart.items,
              deliveryPrice,
              productsInCart.giftCards,
              giftCardsToUse,
              codePromoPercentage,
              selectedCashback
            )
          )}
      </TableCell>
    </TableRow>
  );
};

export default RowTotalCart;
