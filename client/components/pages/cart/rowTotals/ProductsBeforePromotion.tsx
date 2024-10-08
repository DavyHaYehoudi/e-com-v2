import { formatPrice } from "@/app/utils/pricesFormat";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { calculateTotalCartBeforeDiscount } from "../utils/calculUtils";
import { ProductCart } from "@/app/types/ProductTypes";

interface ProductsBeforePromotionProps {
  productsInCart: ProductCart;
}

const ProductsBeforePromotion: React.FC<ProductsBeforePromotionProps> = ({
  productsInCart,
}) => {
  return (
    <TableRow>
      <TableCell className="border-b border-gray-500" colSpan={5}>
        Total des produits hors promotion
      </TableCell>
      <TableCell className="text-right border-b border-gray-500">
        {formatPrice(
          calculateTotalCartBeforeDiscount(
            productsInCart.items,
            productsInCart.gift_cards
          )
        )}
      </TableCell>
    </TableRow>
  );
};

export default ProductsBeforePromotion;
