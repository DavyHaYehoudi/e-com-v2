import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import CartCodePromo from "./CartCodePromo";
import { formatPrice } from "@/app/utils/pricesFormat";
import { calculateCodePromoDiscountOnCartTotal } from "../../utils/calculUtils";
import { CartResponse } from "@/app/types/CartTypes";

interface RowCodePromoProps {
  onDiscount: (discount_percentage: number) => void;
  codePromoPercentage: number;
  productsInCart: CartResponse | null;
}
const RowCodePromo: React.FC<RowCodePromoProps> = ({
  onDiscount,
  codePromoPercentage,
  productsInCart,
}) => {  
  return (
    <TableRow>
      <CartCodePromo
        onDiscount={onDiscount}
        codePromoPercentage={codePromoPercentage}
      />
      <TableCell className="text-right bg-white dark bg-dark whitespace-nowrap">
        {codePromoPercentage && productsInCart ? (
          <span className="whitespace-nowrap text-green-500">
            -{" "}
            {formatPrice(
              calculateCodePromoDiscountOnCartTotal(
                productsInCart.items,
                productsInCart.giftCards,
                codePromoPercentage
              )
            )}
          </span>
        ) : (
          0
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowCodePromo;
