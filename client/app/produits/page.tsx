import React from "react";
import { products } from "../mocks/products";
import { Product } from "../types/ProductTypes";
import ProductCard from "@/components/shared/productCard/ProductCard";
import FilterByName from "@/components/shared/filter/FilterByName";
import DataCounter from "@/components/shared/DataCounter";
import FilterBlock from "@/components/shared/filter/FilterBlock";

const AllProducts = () => {
  const allProducts: Product[] = products;
  return (
    <main>
      <h1 className="uppercase text-center mt-[60px]">tous les produits</h1>
      <section className="flex items-center justify-around">
        <DataCounter items={allProducts} itemName="produit" />
        <FilterByName /> <FilterBlock />
      </section>
      <section className="w-3/4 mx-auto my-20 flex flex-wrap items-center justify-center gap-4">
        {allProducts &&
          allProducts.length > 0 &&
          allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </section>
    </main>
  );
};

export default AllProducts;
