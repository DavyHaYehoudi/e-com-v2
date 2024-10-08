import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import CartCodePromo from "./CartCodePromo";
import { formatPrice } from "@/app/utils/pricesFormat";
import { calculateCodePromoDiscountOnCartTotal } from "../../utils/calculUtils";
import { ProductCart } from "@/app/types/ProductTypes";
import { GiftcardToUseType } from "@/app/types/GiftcardToUseTypes";

interface RowCodePromoProps {
  onDiscount: (discount_percentage: number) => void;
  codePromoPercentage: number;
  productsInCart: ProductCart;
  deliveryPrice: number;
  giftCardsToUse: GiftcardToUseType[];
}
const RowCodePromo: React.FC<RowCodePromoProps> = ({
  onDiscount,
  codePromoPercentage,
  productsInCart,
  deliveryPrice,
  giftCardsToUse,
}) => {
  return (
    <TableRow>
      <CartCodePromo
        onDiscount={onDiscount}
        codePromoPercentage={codePromoPercentage}
      />
      <TableCell className="text-right bg-white" colSpan={5}>
        {codePromoPercentage
          ? `- ${formatPrice(
              calculateCodePromoDiscountOnCartTotal(
                productsInCart.items,
                deliveryPrice,
                productsInCart.gift_cards,
                giftCardsToUse,
                codePromoPercentage
              )
            )}`
          : 0}
      </TableCell>
    </TableRow>
  );
};

export default RowCodePromo;
