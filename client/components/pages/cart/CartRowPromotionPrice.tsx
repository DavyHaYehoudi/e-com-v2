import React from "react";
import { calculateTotalDiscountByRow } from "./utils/calculUtils";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import { isProductOnSale } from "@/app/(public)/utils/productUtils";
import { formatPrice } from "@/app/(public)/utils/pricesFormat";

interface CartRowPromotionPriceProps {
  quantity: number;
  price: number;
  discount: number | null;
  discount_end_date?: string | null;
}
const CartRowPromotionPrice: React.FC<CartRowPromotionPriceProps> = ({
  quantity,
  price,
  discount,
  discount_end_date,
}) => {
  return (
    <>
      {isProductOnSale(discount) && (
        <>
          <PromotionBadge
            discountPercentage={discount}
            discount_end_date={discount_end_date}
          />{" "}
          <br />{" "}
          <span className="whitespace-nowrap text-green-500">
            -{" "}
            {formatPrice(
              calculateTotalDiscountByRow(quantity, price, discount)
            )}
          </span>
        </>
      )}
    </>
  );
};

export default CartRowPromotionPrice;
