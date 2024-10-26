"use client";
import React, { useEffect, useState } from "react";
import SheetRowItem from "./SheetRowItem";
import SheetRowGiftcard from "./SheetRowGiftcard";
import { useFetch } from "@/service/hooks/useFetch";
import { CartResponse } from "@/app/types/CartTypes";

const Body = () => {
  const [productsInCart, setProductsInCart] = useState<CartResponse | null>(
    null
  );
  const { data } = useFetch<CartResponse>("/customer/cart", {
    requiredCredentials: true,
  });

  useEffect(() => {
    if (data) {
      setProductsInCart(data);
    }
  }, [data]);

  return (
    <>
      <SheetRowItem productsInCart={productsInCart} />
      <SheetRowGiftcard productsInCart={productsInCart} />
    </>
  );
};

export default Body;
