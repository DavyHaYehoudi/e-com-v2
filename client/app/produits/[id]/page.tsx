"use client";
import React from "react";
import { notFound } from "next/navigation";
import { mockMasterProducts } from "@/app/mocks/products";
import NewBadge from "@/components/shared/badge/NewBadge";
import FavoriteButton from "@/components/shared/FavoriteButton";
import CarouselProduct from "@/components/pages/product/CarouselProduct";
import ProductFeatures from "@/components/pages/product/ProductFeatures";
import ProductPrice from "@/components/pages/product/ProductPrice";
import ProductInformation from "@/components/pages/product/ProductInformation";
import ProductsSuggested from "@/components/pages/product/ProductsSuggested";
import NumberInput from "@/components/shared/NumberInput";

interface MasterProductProps {
  params: {
    id: string;
  };
}

const product = mockMasterProducts[2];

const MasterProduct = ({ params }: MasterProductProps) => {
  const { id } = params;

  if (!id) {
    notFound(); // Gère le cas où l'ID est manquant
  }
  const handleQuantityChange = () => {};
  return (
    <main>
      <section className="contenair w-1/2 mx-auto ">
        <h1 className="text-2xl font-bold relative text-center mt-5">
          {" "}
          {product?.name}{" "}
          <NewBadge additionalClasses="absolute top:0 right:0" />{" "}
          <FavoriteButton product={product} />{" "}
        </h1>
        <CarouselProduct />
        <article className="bg-purple-50 p-4 rounded-md text-gray-700 text-base leading-relaxed mt-4">
          {product?.description}
        </article>
        <ProductFeatures product={product} />
        <hr className="my-4" />
        <NumberInput
          maxQuantity={product.quantity_in_stock}
          onValueChange={handleQuantityChange}
        />
        <ProductPrice product={product} />
      </section>
      <ProductInformation />
      <ProductsSuggested />
    </main>
  );
};

export default MasterProduct;
