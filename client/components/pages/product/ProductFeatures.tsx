import { MasterProductType } from "@/app/types/ProductTypes";
import { formatWeight } from "@/app/utils/weightFormat";
import React from "react";


interface ProductFeaturesProps {
  product: MasterProductType;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ product }) => {
  return (
    <article className="mt-4">
      <h2 className="text-xl font-semibold">Caractéristiques :</h2>
      <ul className="list-disc ml-5 mt-2 space-y-1">
        <li className="text-gray-700">Référence : {product?.SKU}</li>
        <li className="text-gray-700">Poids : {formatWeight(product.weight)}</li>
      </ul>
    </article>
  );
};

export default ProductFeatures;
