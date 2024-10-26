import { MasterProductsType } from "@/app/types/ProductTypes";
import { formatPrice } from "@/app/utils/pricesFormat";
import {
  priceProductAfterDiscount,
  canContinueSelling,
} from "@/app/utils/productUtils";
import AddToCartButton from "@/components/shared/AddToCartButton";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import React from "react";

interface ProductPriceProps {
  product: MasterProductsType;
  selectedVariant: string;
  quantity: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  product,
  selectedVariant,
  quantity,
}) => {
  return (
    <article className="mt-4">
      <h2 className="text-xl font-semibold">Prix :</h2>
      {product.discount_percentage ? (
        <>
          <div className="flex items-center gap-2 m-5">
            {/* Prix original barré avec un style en gris */}
            <del className="text-gray-500">{formatPrice(product.price)}</del>
            &nbsp;
            {/* Prix après réduction avec un style en rouge et gras */}
            <span className="text-red-600 font-bold">
              {formatPrice(priceProductAfterDiscount(product))}
            </span>
            <PromotionBadge
              discountPercentage={product.discount_percentage}
              discount_end_date={product.discount_end_date}
            />
          </div>
          <hr className="my-4" />
        </>
      ) : (
        // Si pas de réduction, afficher simplement le prix normal
        <>
          <span>{formatPrice(product.price)}</span>
          <hr className="my-4" />
        </>
      )}
      {/* Vérification si le produit est disponible à la vente */}
      {canContinueSelling(product) ? (
        <AddToCartButton
          product={product}
          selectedVariant={selectedVariant}
          quantity={quantity}
        />
      ) : (
        <div className="mx-auto block w-1/2 text-red-600 font-bold text-center">
          Epuisé...
        </div>
      )}
    </article>
  );
};

export default ProductPrice;
