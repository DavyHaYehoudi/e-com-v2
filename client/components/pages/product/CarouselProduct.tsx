'use client'
import { mockMasterProducts } from '@/app/mocks/products';
import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// Transformer les images du produit pour être compatibles avec ImageGallery
const formatImagesForGallery = (images: { url: string }[]) => {
  return images.map((image) => ({
    original: `/images/${image.url}`, // ici tu mets ton chemin d'images
    thumbnail: `/images/${image.url}`, // si tu as une version miniature, tu peux remplacer cette ligne
  }));
};

const CarouselProduct = () => {
  // Supposons que tu veuilles utiliser le premier produit de mockMasterProducts
  const product = mockMasterProducts[2];

  const images = formatImagesForGallery(product.images);

  return (<ImageGallery items={images} />);
};

export default CarouselProduct;
