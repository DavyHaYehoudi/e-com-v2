import { MasterProductsType, Product } from "@/app/types/ProductTypes";
import LoaderWrapper from "@/components/shared/LoaderWrapper";
import ProductCard from "@/components/shared/productCard/ProductCard";
import { useFetch } from "@/service/hooks/useFetch";
import React from "react";

interface ProductsSuggestedProps {
  product: MasterProductsType;
}
const ProductsSuggested: React.FC<ProductsSuggestedProps> = ({ product }) => {
  const formatUrlFromTags = (tags: number[]): string => {
    if (tags.length > 0) {
      const queryParams = new URLSearchParams();
      tags.forEach((tag) => {
        queryParams.append("tag_ids", tag.toString());
      });
      return `/products?${queryParams.toString()}`;
    }
    return ""; // Si pas de tags, retourne une chaîne vide
  };
  const queryUrl = formatUrlFromTags(product.tags);

  const {
    data: productsSuggested,
    loading,
    error,
  } = useFetch<Product[]>(queryUrl);

  return (
    <LoaderWrapper loading={loading} error={error}>
      <section className="py-8">
        <h3 className="uppercase text-center text-2xl mb-6">
          Produits suggérés{" "}
          {productsSuggested &&
          productsSuggested.filter((psugg) => psugg.id !== product.id).length >
            0 ? (
            <span className="lowercase">{`: ${
              productsSuggested.filter((psugg) => psugg.id !== product.id)
                .length
            } proposé(s)`}</span>
          ) : (
            <span className="lowercase">: aucune proposition</span>
          )}{" "}
        </h3>

        <div className="w-3/4 mx-auto  overflow-x-auto custom-scrollbar">
          <div className="flex gap-4 min-w-max">
            {productsSuggested &&
              productsSuggested.length > 0 &&
              productsSuggested
                .filter((psugg) => psugg.id !== product.id)
                .map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
          </div>
        </div>
      </section>
    </LoaderWrapper>
  );
};

export default ProductsSuggested;
