import { formatPrice } from "@/app/utils/pricesFormat";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { calculateTotalCartAfterCodePromo } from "../utils/calculUtils";
import { ProductCart } from "@/app/types/ProductTypes";
import { GiftcardToUseType } from "@/app/types/GiftcardToUseTypes";

interface RowTotalCartProps {
  productsInCart: ProductCart;
  deliveryPrice: number;
  giftCardsToUse: GiftcardToUseType[];
  codePromoPercentage: number;
}
const RowTotalCart: React.FC<RowTotalCartProps> = ({
  productsInCart,
  deliveryPrice,
  giftCardsToUse,
  codePromoPercentage,
}) => {
  return (
    <TableRow className="font-extrabold">
      <TableCell colSpan={5} className="border-b border-gray-500">
        Total du panier
      </TableCell>
      <TableCell className="text-right  border-b border-gray-500">
        {formatPrice(
          calculateTotalCartAfterCodePromo(
            productsInCart.items,
            deliveryPrice,
            productsInCart.gift_cards,
            giftCardsToUse,
            codePromoPercentage
          )
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowTotalCart;
