"use client";
import { ClipLoader } from "react-spinners";
import ProductCard from "@/components/shared/productCard/ProductCard";
import DataCounter from "@/components/shared/DataCounter";
import FilterBlock from "@/components/shared/filter/FilterBlock";
import { useState, useEffect } from "react";
import { useFetch } from "@/service/hooks/useFetch";
import { Product } from "../types/ProductTypes";

interface Filter {
  name: string;
  collections: number[];
  categories: number[];
  tags: number[];
  priceRange: { min?: number; max?: number };
  isOnSale: boolean;
  isNew: boolean;
  isBestSeller: boolean;
}

const AllProducts = () => {
  const [filters, setFilters] = useState<Filter>({
    name: "",
    collections: [] as number[],
    categories: [] as number[], 
    tags: [] as number[],
    priceRange: { min: undefined, max: undefined },
    isOnSale: false,
    isNew: false,
    isBestSeller: false,
  });
  

  const [queryUrl, setQueryUrl] = useState("/products");

  const { data: allProducts, loading, error } = useFetch<Product[]>(queryUrl);

  // Fonction pour mettre à jour les filtres et régénérer l'URL des query params
  const handleFilterSubmit = (newFilters: Filter) => {
    setFilters(newFilters);

    const queryParams = new URLSearchParams();

    if (newFilters.name) {
      queryParams.append("name", newFilters.name);
    }
  // Ajout des query params pour les collections
  if (newFilters.collections.length > 0) {
    newFilters.collections.forEach((collectionId) => {
      queryParams.append("collection_ids", collectionId.toString());
    });
  }

  // Ajout des query params pour les catégories
  if (newFilters.categories.length > 0) {
    newFilters.categories.forEach((categoryId) => {
      queryParams.append("category_ids", categoryId.toString());
    });
  }

  // Ajout des query params pour les tags
  if (newFilters.tags.length > 0) {
    newFilters.tags.forEach((tagId) => {
      queryParams.append("tag_ids", tagId.toString());
    });
  }
 // Ajout des query params pour le prix seulement si des valeurs ont été spécifiées
 if (newFilters.priceRange.min !== undefined) {
  queryParams.append("min_price", newFilters.priceRange.min.toString());
}
if (newFilters.priceRange.max !== undefined) {
  queryParams.append("max_price", newFilters.priceRange.max.toString());
}
    
    if (newFilters.isOnSale) {
      queryParams.append("on_promotion", "true");
    }
    if (newFilters.isNew) {
      queryParams.append("is_new", "true");
    }
    if (newFilters.isBestSeller) {
      queryParams.append("sort_by_sales", "true");
    }

    setQueryUrl(`/products?${queryParams.toString()}`);
  };

  useEffect(() => {
    handleFilterSubmit(filters); // Pour initialiser les filtres dès le montage du composant
  }, []);

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
      <h1 className="uppercase text-center mt-5">Tous les produits</h1>

      <section className="flex items-center justify-around">
        <DataCounter items={allProducts || []} itemName="produit" />
        <FilterBlock onFilter={handleFilterSubmit} />
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
