// app/produits/[category]/page.tsx
interface CategoryPageProps {
  params: {
    category: string;
  };
}

const ProductByCategory = ({ params }: CategoryPageProps) => {
  const { category } = params;

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Produits dans la catégorie : {category}
      </h1>
      {/* Logique pour afficher les produits dans cette catégorie */}
    </div>
  );
};
export default ProductByCategory;
