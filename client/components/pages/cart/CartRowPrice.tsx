import { formatPrice } from "@/app/utils/pricesFormat";
import React from "react";
import {
  calculateTotalDiscountByRow,
  calculateTotalPriceByRow,
} from "./utils/calculUtils";
import { isProductOnSale } from "@/app/utils/productUtils";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";

interface CartRowPriceProps {
  quantity: number;
  price: number;
  discount: number | null;
}
const CartRowPrice: React.FC<CartRowPriceProps> = ({
  quantity,
  price,
  discount,
}) => {
  return (
    <>
      {isProductOnSale(discount) ? (
        <>
          <PromotionBadge discountPercentage={discount} /> soit -
          {formatPrice(calculateTotalDiscountByRow(quantity, price, discount))}
          <br /> <br />
          Prix appliqué après réduction :{" "}
          {formatPrice(
            calculateTotalPriceByRow(quantity, price, discount)
          )}{" "}
        </>
      ) : (
        <>
          Prix :{" "}
          {formatPrice(calculateTotalPriceByRow(quantity, price, discount))}{" "}
        </>
      )}
    </>
  );
};

export default CartRowPrice;
