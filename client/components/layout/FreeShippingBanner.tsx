import { Truck } from "lucide-react";
import React from "react";
import { useDelivery } from "../pages/cart/hooks/useDelivery";
import { formatPrice } from "@/app/utils/pricesFormat";

const FreeShippingBanner = () => {
  const { amountForFree } = useDelivery();
  return (
    amountForFree && (
      <div id="freeShippingBanner" className="show animate-banner text-[var(--dark)]">
        <span aria-hidden="true">
          <Truck />
        </span>
        <p className="tracking-widest font-bold ">
          {" "}
          Livraison offerte à partir de {formatPrice(amountForFree)} 🎁 !
        </p>
      </div>
    )
  );
};

export default FreeShippingBanner;
