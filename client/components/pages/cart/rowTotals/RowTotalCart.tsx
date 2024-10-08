import { formatPrice } from "@/app/utils/pricesFormat";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { calculateTotalCartAfterCashback } from "../utils/calculUtils";
import { ProductCart } from "@/app/types/ProductTypes";
import { GiftcardToUseType } from "@/app/types/GiftcardToUseTypes";

interface RowTotalCartProps {
  productsInCart: ProductCart;
  deliveryPrice: number;
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
      <TableCell className="text-right  border-b border-gray-500">
        {formatPrice(
          calculateTotalCartAfterCashback(
            productsInCart.items,
            deliveryPrice,
            productsInCart.gift_cards,
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
