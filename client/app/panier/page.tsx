import CartTable from "@/components/pages/cart/CartTable";
import React from "react";
import { productsInCart } from "../mocks/products";
import { ProductCart } from "../types/ProductTypes";
import ProceedToPayment from "@/components/pages/cart/ProceedToPayment";
import { calculateTotalCashbackCartToEarn } from "@/components/pages/cart/utils/calculUtils";

const page = () => {
  const productsInCartMock: ProductCart = productsInCart;
  return (
    <main>
      <h1 className="uppercase text-center m-10">mon panier</h1>
      <section className="w-full flex justify-center">
        {productsInCartMock &&
        (productsInCartMock.items.length > 0 ||
          productsInCart.gift_cards.length > 0) ? (
          <div className="w-full sm:w-full md:w-3/4 lg:w-1/2">
            <CartTable />
            {calculateTotalCashbackCartToEarn(productsInCart.items) > 0 && (
              <ProceedToPayment productsInCart={productsInCartMock} />
            )}
          </div>
        ) : (
          <p className="uppercase">le panier est vide</p>
        )}
      </section>
    </main>
  );
};

export default page;
