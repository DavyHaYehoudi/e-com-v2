import React, { useState } from "react";
import { Button } from "../ui/button";
import { ProductCardProps } from "@/app/types/ProductTypes";

const AddToCartButton: React.FC<ProductCardProps> = ({ product }) => {
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const onToggleCart = (productId: number) => {
    console.log(`ajout du produit ${productId} au panier`);
    setIsAddedToCart(!isAddedToCart);
  };

  return (
    <>
      {isAddedToCart ? (
        <Button
          className={`mx-auto block w-1/2 uppercase bg-[var(--whiteSmoke)] text-gray-400
             hover:text-gray-500 hover:bg-gray-200 ${
               isAddedToCart && "animate-pulse"
             }`}
          onClick={() => onToggleCart(product._id)}
        >
          Retirer du panier
        </Button>
      ) : (
        <Button
          className={`mx-auto block w-1/2 uppercase bg-[var(--golden-2)] hover:bg-[var(--golden-2-hover)] ${
            isAddedToCart ? "animate-pulse" : ""
          }`}
          onClick={() => onToggleCart(product._id)}
        >
          Ajouter au panier
        </Button>
      )}
    </>
  );
};

export default AddToCartButton;
