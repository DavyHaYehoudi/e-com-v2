"use client";
import CartTable from "@/components/pages/cart/CartTable";
import React from "react";
import ProceedToPayment from "@/components/pages/cart/ProceedToPayment";
import { calculateTotalCashbackCartToEarn } from "@/components/pages/cart/utils/calculUtils";
import useCart from "./hooks/useCart";

const Cart = () => {
  const { productsInCart } = useCart();
  
  return (
    <main>
      <h1 className="uppercase text-center m-10">mon panier</h1>
      <section className="w-full flex justify-center">
        {productsInCart &&
        (productsInCart.items.length > 0 ||
          productsInCart.giftCards.length > 0) ? (
          <div className="w-full sm:w-full md:w-3/4 lg:w-1/2">
            <CartTable productsInCart={productsInCart} />
            {calculateTotalCashbackCartToEarn(productsInCart.items) > 0 && (
              <ProceedToPayment productsInCart={productsInCart} />
            )}
          </div>
        ) : (
          <p className="uppercase">le panier est vide</p>
        )}
      </section>
    </main>
  );
};

export default Cart;
