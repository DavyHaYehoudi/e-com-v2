import { products } from "@/app/mocks/products";
import ProductsCarousel from "@/components/shared/ProductsCarousel";
import React from "react";

const productsStar = products;
const Products = () => {
  return (
    <section className="mb-10">
      <h3 className="text-2xl font-semibold text-center mb-6">
        Découvrez nos produits
      </h3>
      <ProductsCarousel products={productsStar} />
    </section>
  );
};

export default Products;
