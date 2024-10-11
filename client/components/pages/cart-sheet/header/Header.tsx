import { ProductCart } from "@/app/types/ProductTypes";
import React from "react";

interface HeaderProps {
  productsInCart: ProductCart;
}
const Header: React.FC<HeaderProps> = ({ productsInCart }) => {
  const isProductsInCart =
    productsInCart.items.length > 0 || productsInCart.gift_cards.length > 0;

  return isProductsInCart ? (
    <p className="uppercase">votre panier</p>
  ) : (
    <p className="uppercase">Votre panier est vide</p>
  );
};

export default Header;
