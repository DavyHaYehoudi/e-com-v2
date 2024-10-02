'use client'

import { ProductCardProps } from '@/app/types/ProductTypes';
import React from 'react';
import AddToCartButton from '../AddToCartButton';
import FavoriteButton from '../FavoriteButton';

const Footer:React.FC<ProductCardProps> = ({product}) => {
    return (
        <div className="mt-4 w-full pb-5 relative">
        {product.continue_selling ? (
          <AddToCartButton product={product} />
        ) : (
          <div className="mx-auto block w-1/2">Epuisé...</div>
        )}

        <FavoriteButton product={product} />
      </div>
    );
};

export default Footer;