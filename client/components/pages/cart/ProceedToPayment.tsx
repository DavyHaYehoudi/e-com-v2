import { formatPrice } from "@/app/utils/pricesFormat";
import React from "react";
import { calculateTotalCashbackCartToEarn } from "./utils/calculUtils";
import { ProductCart } from "@/app/types/ProductTypes";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import du composant Link

interface ProceedToPaymentProps {
  productsInCart: ProductCart;
}

const ProceedToPayment: React.FC<ProceedToPaymentProps> = ({ productsInCart }) => {
  return (
    <div className="wrapper flex items-center justify-between my-5 gap-5">
      <div className="text-blue-500 p-2 rounded">
        Total du cashback capitalisé pour vos prochains achats :{" "}
        <span className="font-extrabold">
          {formatPrice(calculateTotalCashbackCartToEarn(productsInCart.items))}
        </span>
      </div>

      {/* Utilisation de Link pour la navigation */}
      <Link href="/payment/checkout" passHref>
        <Button className="bg-green-500 hover:bg-green-600">
          Procéder au payment
        </Button>
      </Link>
    </div>
  );
};

export default ProceedToPayment;
