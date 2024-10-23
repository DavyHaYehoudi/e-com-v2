"use client";
import { Product } from "@/app/types/ProductTypes";
import LoaderWrapper from "@/components/shared/LoaderWrapper";
import ProductsCarousel from "@/components/shared/ProductsCarousel";
import { useFetch } from "@/service/hooks/useFetch";
import React from "react";

const Products = () => {
  const {
    data: productsStar,
    loading,
    error,
  } = useFetch<Product[]>("/products?is_star=true");
  return (
    <LoaderWrapper loading={loading} error={error}>
      <section className="mb-10">
        <h2 className="text-center mb-6">Decouvrez nos produits</h2>
        <ProductsCarousel products={productsStar} />
      </section>
    </LoaderWrapper>
  );
};

export default Products;
