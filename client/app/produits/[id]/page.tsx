"use client";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import NewBadge from "@/components/shared/badge/NewBadge";
import FavoriteButton from "@/components/shared/FavoriteButton";
import CarouselProduct from "@/components/pages/product/CarouselProduct";
import ProductFeatures from "@/components/pages/product/ProductFeatures";
import ProductPrice from "@/components/pages/product/ProductPrice";
import ProductInformation from "@/components/pages/product/ProductInformation";
import ProductsSuggested from "@/components/pages/product/ProductsSuggested";
import NumberInput from "@/components/shared/NumberInput";
import { useFetch } from "@/service/hooks/useFetch";
import { MasterProductsType } from "@/app/types/ProductTypes";
import LoaderWrapper from "@/components/shared/LoaderWrapper";
import useCart from "@/app/panier/hooks/useCart";
import ProductVariants from "@/components/pages/product/ProductVariants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface MasterProductProps {
  params: {
    id: string;
  };
}

const MasterProduct = ({ params }: MasterProductProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const cartCustomer = useSelector((state: RootState) => state.cart);
  const { cart, items, giftCards } = cartCustomer;
  const productsInCart = { cart, items, giftCards };
  const [selectedVariant, setSelectedVariant] = useState<string>("");

  const { id } = params;
  if (!id) {
    notFound(); // Gère le cas où l'ID est manquant
  }
  const {
    data: product,
    error,
    loading,
    triggerFetch,
  } = useFetch<MasterProductsType>(`/products/${id}`);
  useEffect(() => {
    triggerFetch();
  }, []);

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };
  const handleVariantChange = (value: string) => {
    setSelectedVariant(value);
    if (productsInCart && productsInCart.items) {
      const productInCart = productsInCart.items.find(
        (p) => p.id === parseInt(id) && p.selectedVariant === value
      );
      if (productInCart) {
        setQuantity(productInCart.quantityInCart);
      }
    }
  };

  useEffect(() => {
    if (
      productsInCart &&
      productsInCart.items &&
      productsInCart.items.length > 0
    ) {
      // Le produit est-il déjà dans le panier
      const productInCart = productsInCart.items.find(
        (p) => p.id === parseInt(id)
      );
      // Si c'est un produit déjà ajouté au panier
      if (productInCart) {
        setQuantity(productInCart.quantityInCart);
        setSelectedVariant(
          productInCart.selectedVariant || productInCart.variants[0]
        );
      } else if (!productInCart && product) {
        setQuantity(1);
        setSelectedVariant(product.variants[0]);
      }
    } else if (productsInCart && !productsInCart.items && product) {
      setSelectedVariant(product.variants[0]);
    }
  }, [productsInCart, id, product]);

  return (
    <LoaderWrapper error={error} loading={loading}>
      {product && (
        <main>
          <section className="contenair w-1/2 mx-auto ">
            <h1 className="text-2xl font-bold relative text-center mt-5">
              {" "}
              {product?.name}{" "}
              <NewBadge additionalClasses="absolute top:0 right:0" />{" "}
              <FavoriteButton product={product} />{" "}
            </h1>
            <CarouselProduct product={product} />
            <article className="bg-purple-50 p-4 rounded-md text-gray-700 text-base leading-relaxed mt-4">
              {product?.description}
            </article>
            <ProductFeatures product={product} />
            <hr className="my-4" />
            {product.variants.length > 0 && (
              <>
                <ProductVariants
                  product={product}
                  selectedVariant={selectedVariant}
                  onVariantChange={handleVariantChange}
                />
                <hr className="my-4" />
              </>
            )}
            <h2 className="text-xl font-semibold">Quantité :</h2>
            <NumberInput
              onValueChange={handleQuantityChange}
              quantity={quantity}
              product={product}
            />
            <hr className="my-4" />
            <ProductPrice
              product={product}
              selectedVariant={selectedVariant}
              quantity={quantity}
            />
          </section>
          <ProductInformation />
          <ProductsSuggested product={product} />
        </main>
      )}
    </LoaderWrapper>
  );
};

export default MasterProduct;
