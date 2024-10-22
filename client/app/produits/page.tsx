"use client";
import React from "react";
import { ClipLoader } from "react-spinners";
import ProductCard from "@/components/shared/productCard/ProductCard";
import FilterByName from "@/components/shared/filter/FilterByName";
import DataCounter from "@/components/shared/DataCounter";
import FilterBlock from "@/components/shared/filter/FilterBlock";
import { useFetch } from "@/service/hooks/useFetch";
import { Product } from "../types/ProductTypes";

const AllProducts = () => {
  const {
    data: allProducts,
    loading,
    error,
  } = useFetch<Product[]>("/products");
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000" loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return <p>Une erreur s&apos;est produite : {error}</p>;
  }

  return (
    <main>
      <h1 className="uppercase text-center mt-5">tous les produits</h1>

      <section className="flex items-center justify-around">
        <DataCounter items={allProducts || []} itemName="produit" />
        <FilterByName />
        <FilterBlock />
      </section>

      <section className="w-3/4 mx-auto my-20 flex flex-wrap items-center justify-center gap-4">
        {allProducts && allProducts.length > 0
          ? allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : !loading && <p>Aucun produit trouvé.</p>}
      </section>
    </main>
  );
};

export default AllProducts;
