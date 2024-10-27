import React from "react";
import TrashIcon from "@/components/shared/TrashIcon";
import { sumPriceArticle } from "@/app/utils/pricesFormat";
import ProductImageGiftcard from "@/components/shared/productImage/ProductImageGiftcard";
import { useCartManager } from "@/app/panier/hooks/useCartManager";

const SheetRowGiftcard = () => {
  const { removeProduct, productsInCart } = useCartManager();
  return (
    productsInCart &&
    productsInCart.giftCards &&
    productsInCart.giftCards.length > 0 &&
    productsInCart.giftCards.map((product, index) => (
      <article
        key={index}
        className="hover:bg-gray-100 relative border-b border-gray-500 "
      >
        <div className="flex items-center justify-between gap-2 p-2 my-2">
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
          <TrashIcon
            onClick={() => removeProduct(product.id, null, "giftCard")}
          />
        </p>
      </article>
    ))
  );
};

export default SheetRowGiftcard;
