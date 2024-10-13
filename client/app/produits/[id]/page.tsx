import React from "react";
import { notFound } from "next/navigation";
import CarouselProduct from "@/components/pages/product/CarouselProduct";
import { mockMasterProducts } from "@/app/mocks/products";
import {
    canContinueSelling,
  isProductNew,
} from "@/app/utils/productUtils";
import NewBadge from "@/components/shared/badge/NewBadge";
import ProductFeatures from "@/components/pages/product/ProductFeatures";
import ProductPrice from "@/components/pages/product/ProductPrice";
import FavoriteButton from "@/components/shared/FavoriteButton";
import AddToCartButton from "@/components/shared/AddToCartButton";

interface MasterProductProps {
  params: {
    id: string;
  };
}
const product = mockMasterProducts[2];
const MasterProduct = ({ params }: MasterProductProps) => {
  const { id } = params;

  if (!id) {
    notFound(); // Gère le cas où l'ID est manquant
  }
  return (
    <main>
      <section className="contenair w-1/2 mx-auto">
        <h1 className="text-2xl font-bold text-center my-2 relative">
          {product?.name}{" "}
          {isProductNew(product.new_until) && (
            <NewBadge additionalClasses="absolute top:0 right:0" />
          )}
          <FavoriteButton product={product} />
        </h1>
        <article>
          <CarouselProduct />{" "}
        </article>
        <article className="bg-purple-50 p-4 rounded-md text-gray-700 text-base leading-relaxed mt-4">
          {product?.description}
        </article>
        <ProductFeatures product={product} />
        <ProductPrice product={product} />
        <p> 
            <span>Disponibilité : {product.quantity_in_stock}</span>  
            {canContinueSelling(product) ? <AddToCartButton product={product} />: <span className="text-red-600 font-bold ml-1" >- Epuisé</span> } 
            </p>
      </section>
    </main>
  );
};

export default MasterProduct;
