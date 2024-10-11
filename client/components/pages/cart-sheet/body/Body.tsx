import React from "react";

import SheetRowItem from "./SheetRowItem";
import { productsInCart } from "@/app/mocks/products";
import SheetRowGiftcard from "./SheetRowGiftcard";

const Body = () => {
  return (
    <>
      <SheetRowItem productsInCart={productsInCart} />
      <SheetRowGiftcard productsInCart={productsInCart} />
    </>
  );
};

export default Body;
