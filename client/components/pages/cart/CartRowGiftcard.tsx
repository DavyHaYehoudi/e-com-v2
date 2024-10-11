"use client";
import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import TrashIcon from "@/components/shared/TrashIcon";
import QuantityCalculator from "@/components/shared/QuantityCalculator";
import ProductImageGiftcard from "@/components/shared/productImage/ProductImageGiftcard";
import { productsInCart } from "@/app/mocks/products";
import { ProductCart } from "@/app/types/ProductTypes";

const CartRowGiftcard = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleDelete = (giftcardId: number) => {
    console.log("Giftcard deleted:", giftcardId);
    // Logique pour supprimer la carte cadeau
  };
  const productsInCartMock: ProductCart = productsInCart;
  return (
    productsInCartMock &&
    productsInCartMock.gift_cards.length > 0 &&
    productsInCartMock.gift_cards.map((giftcard, index) => (
      <TableRow
        key={index}
        className="hover:bg-gray-100 border-b border-gray-500"
      >
        {/* Première cellule : image et nom */}
        <TableCell className="font-medium relative">
          <ProductImageGiftcard amount={giftcard.amount} />
        </TableCell>

        <TableCell>Carte cadeau pour soi ou à offrir.</TableCell>

        {/* Cellule de gestion de la quantité et du prix */}
        <TableCell>
          <QuantityCalculator
            quantity={quantity}
            onValueChange={handleQuantityChange}
            maxQuantity={null}
            price={giftcard.amount}
          />
        </TableCell>

        {/* Cellule vide pour le prix de la réduction */}
        <TableCell></TableCell>

        {/* Cellule vide pour Cashback */}
        <TableCell></TableCell>

        {/* Cellule pour le bouton de suppression */}
        <TableCell align="right">
          <TrashIcon onClick={() => handleDelete(index)} />
        </TableCell>
      </TableRow>
    ))
  );
};

export default CartRowGiftcard;
