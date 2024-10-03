import { products } from "@/app/mocks/products";
import ProductsCarousel from "@/components/shared/ProductsCarousel";
import React from "react";

const productsStar = products;
const Products = () => {
  return (
    <section className="mb-10">
      <h2 className="text-center mb-6">
        Decouvrez nos produits
      </h2>
      <ProductsCarousel products={productsStar} />
    </section>
  );
};

export default Products;
