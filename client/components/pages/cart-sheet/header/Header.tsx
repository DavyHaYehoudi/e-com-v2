import { CartResponse } from "@/app/types/CartTypes";
import React from "react";

interface HeaderProps {
  productsInCart?: CartResponse | null;
}

const Header: React.FC<HeaderProps> = ({ productsInCart }) => {
  const isProductsInCart =
    productsInCart &&
    productsInCart.items &&
    (productsInCart.items.length > 0 || productsInCart.giftCards.length > 0);

  return isProductsInCart ? (
    <p className="uppercase">votre panier</p>
  ) : (
    <p className="uppercase">Votre panier est vide</p>
  );
};

export default Header;
