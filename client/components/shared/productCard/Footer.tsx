'use client'

import React from 'react';
import AddToCartButton from '../AddToCartButton';
import FavoriteButton from '../FavoriteButton';
import { Product } from '@/app/types/ProductTypes';
import { canContinueSelling } from '@/app/utils/productUtils';


interface FooterProps {
  product: Product;
}

const Footer: React.FC<FooterProps> = ({ product }) => {
  return (
    <div className="mt-4 w-full pb-5 relative">
      {canContinueSelling(product) ? (
        <AddToCartButton product={product} />
      ) : (
        <div className="mx-auto block w-1/2 text-red-600 font-bold text-center">
          Epuisé...
        </div>
      )}

      <FavoriteButton product={product} />
    </div>
  );
};

export default Footer;
