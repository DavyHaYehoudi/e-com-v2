import { formatPrice } from "@/app/utils/pricesFormat";
import React from "react";
import { calculateTotalDiscountByRow } from "./utils/calculUtils";
import { isProductOnSale } from "@/app/utils/productUtils";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";

interface CartRowPromotionPriceProps {
  quantity: number;
  price: number;
  discount: number | null;
}
const CartRowPromotionPrice: React.FC<CartRowPromotionPriceProps> = ({
  quantity,
  price,
  discount,
}) => {
  return (
    <>
      {isProductOnSale(discount) && (
        <>
          <PromotionBadge discountPercentage={discount} /> <br /> -
          {formatPrice(calculateTotalDiscountByRow(quantity, price, discount))}
        </>
      )}
    </>
  );
};

export default CartRowPromotionPrice;
