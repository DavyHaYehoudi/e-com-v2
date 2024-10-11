import { ProductCart } from "@/app/types/ProductTypes";
import React from "react";
import TrashIcon from "@/components/shared/TrashIcon";
import { sumPriceArticle } from "@/app/utils/pricesFormat";
import ProductImageGiftcard from "@/components/shared/productImage/ProductImageGiftcard";

interface SheetRowGiftcardProps {
  productsInCart: ProductCart;
}
const SheetRowGiftcard: React.FC<SheetRowGiftcardProps> = ({
  productsInCart,
}) => {
  const handleDelete = (productId: number) => {
    console.log("Product deleted:", productId);
    // Logique pour supprimer le produit
  };
  return (
    productsInCart &&
    productsInCart.gift_cards.length > 0 &&
    productsInCart.gift_cards.map((product, index) => (
      <article
        key={index}
        className="hover:bg-gray-100 relative border-b border-gray-500 "
      >
        <div className="flex items-center justify-between p-2 my-2">
          {/* Première cellule : image et nom */}
          <p className="font-medium relative">
            <ProductImageGiftcard amount={product.amount} />
          </p>

          <p>Carte cadeau pour soi ou à offrir.</p>
        </div>
        <div className="flex items-center justify-between p-2 my-2">
          <p>{sumPriceArticle(product.quantity, product.amount)}</p>

          {/* Cellule pour le bouton de suppression */}
        </div>
        <p className="flex justify-center my-2">
          <TrashIcon onClick={() => handleDelete(index)} />
        </p>
      </article>
    ))
  );
};

export default SheetRowGiftcard;
