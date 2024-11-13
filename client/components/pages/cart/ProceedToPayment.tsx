"use client";
import { formatPrice } from "@/app/utils/pricesFormat";
import React from "react";
import { calculateTotalCashbackCartToEarn } from "./utils/calculUtils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CartResponse } from "@/app/types/CartTypes";
import { useOrderAmount } from "./hooks/useOrderAmount";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface ProceedToPaymentProps {
  productsInCart: CartResponse;
}

const ProceedToPayment: React.FC<ProceedToPaymentProps> = ({
  productsInCart,
}) => {
  const orderAmount = useOrderAmount();
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
