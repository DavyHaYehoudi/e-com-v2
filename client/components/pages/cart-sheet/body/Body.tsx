"use client";
import React from "react";
import SheetRowItem from "./SheetRowItem";
import SheetRowGiftcard from "./SheetRowGiftcard";
import useCart from "@/app/panier/hooks/useCart";

const Body = () => {
  const { productsInCart } = useCart();

  return (
    <>
      <SheetRowItem productsInCart={productsInCart} />
      <SheetRowGiftcard productsInCart={productsInCart} />
    </>
  );
};

export default Body;
