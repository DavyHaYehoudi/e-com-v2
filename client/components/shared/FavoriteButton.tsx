import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { MasterProductsType, Product } from "@/app/types/ProductTypes";
import { useWishlistManager } from "../modules/wishlist/hooks/useWishlistManager";

interface FavoriteButtonProps {
  product: Product | MasterProductsType;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { toggleProductInWishlist, getWishlist, productsWishlist } =
  useWishlistManager();
  
  useEffect(() => {
    // Vérifie si le produit est dans la wishlist
    const isProductInWishlist = productsWishlist?.items.some(
      (p) => p.id === product.id
    );

    setIsLiked(!!isProductInWishlist);
  }, [productsWishlist, product.id]);

  const onToggleFavorite = async () => {
    await toggleProductInWishlist(product);
    setIsLiked(!isLiked);
    await getWishlist();
  };

  return (
    <button
      className="absolute right-2 top-1/3 transform -translate-y-1/2"
      onClick={onToggleFavorite}
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
