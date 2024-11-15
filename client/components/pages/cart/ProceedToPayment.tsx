"use client";
import React, { useEffect } from "react";
import { calculateTotalCashbackCartToEarn } from "./utils/calculUtils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CartResponse } from "@/app/(public)/types/CartTypes";
import { useOrderAmount } from "./hooks/useOrderAmount";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { formatPrice } from "@/app/(public)/utils/pricesFormat";

interface ProceedToPaymentProps {
  productsInCart: CartResponse;
}

const ProceedToPayment: React.FC<ProceedToPaymentProps> = ({
  productsInCart,
}) => {
  const giftCardIds = useSelector(
    (state: RootState) => state.priceAdjustments.giftCards
  );
  const codePromo = useSelector(
    (state: RootState) => state.priceAdjustments.promoCode
  );
  const shippingMethodId =
    useSelector((state: RootState) => state.priceAdjustments.shippingMethod) ||
    "";
  const cashBackToSpend = useSelector(
    (state: RootState) => state.priceAdjustments.cashBackToSpend
  );
  const { getOrderAmount, orderAmount, getAmountBeforeDiscount } =
    useOrderAmount();
    
  useEffect(() => {
    getOrderAmount();
  }, [
    giftCardIds,
    codePromo,
    shippingMethodId,
    cashBackToSpend,
    getOrderAmount,
  ]);

  useEffect(() => {
    getAmountBeforeDiscount();
  }, []);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className="wrapper flex flex-wrap items-center justify-center xl:justify-between my-5 gap-5">
      <div className="bg-blue-500 text-[var(--whiteSmoke)] p-1 rounded m-1 text-center">
        Total du cashback capitalisé pour vos prochains achats :{" "}
        <span className="font-extrabold whitespace-nowrap">
          {formatPrice(calculateTotalCashbackCartToEarn(productsInCart.items))}
        </span>
      </div>
      <Link href="/payment/checkout" passHref>
        <Button className="bg-green-500 hover:bg-green-600 dark:text-[var(--whiteSmoke)]">
          Procéder au payment {isAuthenticated && formatPrice(orderAmount)}
        </Button>
      </Link>
    </div>
  );
};

export default ProceedToPayment;
