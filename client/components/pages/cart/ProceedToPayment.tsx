"use client";
import { formatPrice } from "@/app/utils/pricesFormat";
import React from "react";
import { calculateTotalCashbackCartToEarn } from "./utils/calculUtils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CartResponse } from "@/app/types/CartTypes";
import { useOrderAmount } from "./hooks/useOrderAmount";

interface ProceedToPaymentProps {
  productsInCart: CartResponse;
}

const ProceedToPayment: React.FC<ProceedToPaymentProps> = ({
  productsInCart,
}) => {
  const orderAmount = useOrderAmount();
  const isPaymentDisabled = orderAmount < 1;

  return (
    <div className="wrapper flex flex-wrap items-center justify-center xl:justify-between my-5 gap-5">
      <div className="bg-blue-500 text-[var(--whiteSmoke)] p-1 rounded m-1 text-center">
        Total du cashback capitalisé pour vos prochains achats :{" "}
        <span className="font-extrabold whitespace-nowrap">
          {formatPrice(calculateTotalCashbackCartToEarn(productsInCart.items))}
        </span>
      </div>

      {isPaymentDisabled ? (
        // Bouton désactivé sans Link pour empêcher la redirection
        <div className="text-center">
          <Button
            className="bg-gray-400 cursor-not-allowed dark:text-[var(--whiteSmoke)]"
            disabled
          >
            Procéder au payment {formatPrice(orderAmount)}
          </Button>
          <p className="text-red-500 text-sm mt-2">
            Le montant de la commande doit être d'au moins 1 euro pour procéder
            au paiement.
          </p>
        </div>
      ) : (
        // Link actif uniquement si orderAmount > 0
        <Link href="/payment/checkout" passHref>
          <Button className="bg-green-500 hover:bg-green-600 dark:text-[var(--whiteSmoke)]">
            Procéder au payment {formatPrice(orderAmount)}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProceedToPayment;
