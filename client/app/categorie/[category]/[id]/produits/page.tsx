"use client";
import { Product } from "@/app/types/ProductTypes";
import LoaderWrapper from "@/components/shared/LoaderWrapper";
import ProductCard from "@/components/shared/productCard/ProductCard";
import { useFetch } from "@/service/hooks/useFetch";

interface CategoryPageProps {
  params: {
    category: string;
    id: number;
  };
}

const ProductByCategory = ({ params }: CategoryPageProps) => {
  const { category, id } = params;
  const {
    data: allProductsByCategory,
    loading,
    error,
  } = useFetch<Product[]>(`/products?category_ids=${id}`);

  return (
    <LoaderWrapper loading={loading} error={error}>
      <div>
        <h1 className="text-center mt-5">
          {allProductsByCategory && allProductsByCategory.length > 0 ? (
            <span className="lowercase">
              {allProductsByCategory.length} produit(s) dans la catégorie{" "}
              {category}
            </span>
          ) : (
            <>
              <span className="capitalize">Aucun</span>{" "}
              <span className="lowercase">
                produit dans la catégorie {category}
              </span>
            </>
          )}
        </h1>
        <section className="w-3/4 mx-auto my-20 flex flex-wrap items-center justify-center gap-4">
          {allProductsByCategory &&
            allProductsByCategory.length > 0 &&
            allProductsByCategory.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </section>
      </div>
    </LoaderWrapper>
  );
};
export default ProductByCategory;
