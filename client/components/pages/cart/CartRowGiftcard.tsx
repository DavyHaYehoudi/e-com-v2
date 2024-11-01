"use client";
import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import TrashIcon from "@/components/shared/TrashIcon";
import ProductImageGiftcard from "@/components/shared/productImage/ProductImageGiftcard";
import { CartResponse } from "@/app/types/CartTypes";
import { sumPriceArticle } from "@/app/utils/pricesFormat";

interface CartRowGiftcardProps {
  productsInCart: CartResponse | null;
  removeProduct: (
    productId: number,
    variant: string | null,
    type: "item" | "giftCard"
  ) => void;
}
const CartRowGiftcard: React.FC<CartRowGiftcardProps> = ({
  productsInCart,
  removeProduct,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    productsInCart &&
    productsInCart.giftCards &&
    productsInCart.giftCards.length > 0 &&
    productsInCart.giftCards.map((giftcard, index) => (
      <TableRow
        key={index}
        className="hover:bg-gray-100 border-b border-gray-500 dark:hover:bg-black"
      >
        {/* Première cellule : image et nom */}
        <TableCell className="font-medium relative">
          <ProductImageGiftcard amount={giftcard.amount} />
        </TableCell>

        <TableCell>Carte cadeau pour soi ou à offrir.</TableCell>

        {/* Cellule de la quantité et du prix */}
        <TableCell>{sumPriceArticle(quantity, giftcard.amount)}</TableCell>

        {/* Cellule vide pour le prix de la réduction */}
        <TableCell></TableCell>

        {/* Cellule vide pour Cashback */}
        <TableCell></TableCell>

        {/* Cellule pour le bouton de suppression */}
        <TableCell align="right">
          <TrashIcon
            onClick={() => removeProduct(giftcard.id, null, "giftCard")}
          />
        </TableCell>
      </TableRow>
    ))
  );
};

export default CartRowGiftcard;
