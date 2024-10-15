import { products} from '@/app/mocks/products';
import ProductCard from '@/components/shared/productCard/ProductCard';
import React from 'react';


const ProductsSuggested = () => {
    const productsSuggested = products
  return (
    <section className="py-8">
      <h3 className="uppercase text-center text-2xl mb-6">Produits suggérés</h3>

      <div className="w-3/4 mx-auto  overflow-x-auto custom-scrollbar">
        <div className="flex gap-4 min-w-max">
          {productsSuggested.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSuggested;
