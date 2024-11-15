import { formatPrice } from "@/app/utils/pricesFormat";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { calculateTotalCartBeforeDiscount } from "../utils/calculUtils";
import { CartResponse } from "@/app/(public)/types/CartTypes";

interface ProductsBeforePromotionProps {
  productsInCart: CartResponse | null;
}

const ProductsBeforePromotion: React.FC<ProductsBeforePromotionProps> = ({
  productsInCart,
}) => {
  return (
    <TableRow>
      <TableCell className="border-b border-gray-500" colSpan={5}>
        Total des produits
      </TableCell>
      <TableCell className="text-right border-b border-gray-500">
        <span className="whitespace-nowrap">
          {" "}
          {productsInCart &&
            formatPrice(
              calculateTotalCartBeforeDiscount(
                productsInCart.items,
                productsInCart.giftCards
              )
            )}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default ProductsBeforePromotion;
