import React, { useState } from "react";
import { Heart } from "lucide-react";
import { ProductCardProps } from "@/app/types/ProductTypes";

const FavoriteButton: React.FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const onToggleFavorite = (productId: number) => {
    console.log(`ajout du produit ${productId} aux favoris`);
    setIsLiked(!isLiked);
  };

  return (
    <button
      className="absolute right-2 top-1/3 transform -translate-y-1/2"
      onClick={() => onToggleFavorite(product._id)}
    >
      {isLiked ? (
        <Heart
          className="h-7 w-7 animate-pulse"
          fill="currentColor"
          style={{ color: "var(--golden-2)" }}
        />
      ) : (
        <Heart className="h-7 w-7 text-gray-500" />
      )}
    </button>
  );
};

export default FavoriteButton;
