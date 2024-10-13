import { products } from "@/app/mocks/products";
import { Product } from "@/app/types/ProductTypes";
import ProductCard from "@/components/shared/productCard/ProductCard";

// app/produits/[category]/page.tsx
interface CategoryPageProps {
  params: {
    category: string;
  };
}

const ProductByCategory = ({ params }: CategoryPageProps) => {
  const { category } = params;

  const allProducts: Product[] = products;
  return (
    <main>
      <h1 className="uppercase text-center mt-[60px]">
        tous les produits de la catégorie {category}{" "}
      </h1>
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
export default ProductByCategory;
