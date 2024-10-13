import { MasterProductType } from "@/app/types/ProductTypes";
import { formatPrice } from "@/app/utils/pricesFormat";
import { priceProductAfterDiscount } from "@/app/utils/productUtils";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import React from "react";

interface ProductPriceProps {
  product: MasterProductType;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ product }) => {
  return (
    <article className="mt-4">
      {product.discount_percentage ? (
        <div className="flex items-center gap-2">
          {/* Prix original barré avec un style en gris */}
          <del className="text-gray-500">{formatPrice(product.price)}</del>
          &nbsp;
          {/* Prix après réduction avec un style en rouge et gras */}
          <span className="text-red-600 font-bold">
            {formatPrice(priceProductAfterDiscount(product))}
          </span>
          <PromotionBadge discountPercentage={product.discount_percentage} discount_end_date={product.discount_end_date} />
        </div>
      ) : (
        // Si pas de réduction, afficher simplement le prix normal
        <span>{formatPrice(product.price)}</span>
      )}
    </article>
  );
};

export default ProductPrice;
