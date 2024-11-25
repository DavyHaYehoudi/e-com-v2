"use client";
import CartTable from "@/components/pages/cart/CartTable";
import React from "react";
import ProceedToPayment from "@/components/pages/cart/ProceedToPayment";
import { calculateTotalCashbackCartToEarn } from "@/components/pages/cart/utils/calculUtils";
import { useCartManager } from "./hooks/useCartManager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  applyPromoCode,
  setAmountDiscountPromoCode,
  setAmountTotalGiftcardsToUse,
  setCashBackToSpend,
  setGiftCard,
} from "@/redux/slice/priceAdjustmentsSlice";

const Cart = () => {
  const { removeProduct } = useCartManager();

  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { cart, items, giftCards } = cartCustomer;
  const productsInCart = { cart, items, giftCards };
  const dispatch = useDispatch();
  // Réinitiliasation du store en cas de retour sur la page
  dispatch(applyPromoCode(""));
  dispatch(setGiftCard({ type: "reset" }));
  dispatch(setCashBackToSpend(0));
  dispatch(setAmountDiscountPromoCode(0));
  dispatch(setAmountTotalGiftcardsToUse(0));
  return (
    <main>
      <h1 className="uppercase text-center m-10">mon panier</h1>
      <section className="w-full flex justify-center">
        {productsInCart &&
        productsInCart.items &&
        (productsInCart.items.length > 0 ||
          productsInCart.giftCards.length > 0) ? (
          <div className="w-full sm:w-full lg:w-3/4 2xl:w-1/2">
            <CartTable
              productsInCart={productsInCart}
              removeProduct={removeProduct}
            />
            {calculateTotalCashbackCartToEarn(productsInCart.items) >= 0 && (
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
