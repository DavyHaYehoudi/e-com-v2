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
import ProductVariants from "@/components/pages/product/ProductVariants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useCartManager } from "@/app/panier/hooks/useCartManager";
import ProductReview from "@/components/pages/product/ProductReview";

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
  const { addOrUpdateProduct } = useCartManager();

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
    if (product) {
      addOrUpdateProduct({
        product,
        selectedVariant,
        quantity: value,
        type: "item",
      });
    }
  };
  const handleVariantChange = (value: string) => {
    setSelectedVariant(value);
  };

  useEffect(() => {
    // Il existe des produits dans le panier
    if (
      productsInCart &&
      productsInCart.items &&
      productsInCart.items.length > 0
    ) {
      // Le produit est-il dans le panier
      const productInCart = productsInCart.items.find(
        (p) =>
          p.id === parseInt(id) &&
          (selectedVariant ? p.selectedVariant === selectedVariant : true)
      );
      // Le produit est dans le panier
      if (productInCart) {
        setQuantity(productInCart.quantityInCart);
        setSelectedVariant(productInCart?.selectedVariant || selectedVariant);
        // Le produit n'est pas dans le panier
      } else {
        setQuantity(1);
        if (product && !selectedVariant) {
          setSelectedVariant(product.variants[0]);
        }
      }
      // Le panier est vide
    } else if (product) {
      setSelectedVariant(
        selectedVariant ? selectedVariant : product.variants[0]
      );
    }
  }, [productsInCart, product, id, selectedVariant]);
  useEffect(() => {
    // Force le défilement vers le haut à chaque rendu
    window.scrollTo(0, 0);
  }, []); 

  return (
    <LoaderWrapper error={error} loading={loading}>
      {product && (
        <main>
          <section className="contenair m-2 lg:w-1/2 lg:mx-auto ">
            <h1 className="text-2xl font-bold text-center mt-5">
              {" "}
              {product?.name}{" "}
            </h1>
            <div className="flex justify-center items-center gap-2 mt-5 relative">
              {" "}
              <NewBadge /> <FavoriteButton product={product} />{" "}
            </div>
            <CarouselProduct product={product} />
            <article className="bg-purple-50 p-4 rounded-md text-gray-700 text-base leading-relaxed mt-4">
              {product?.description}
            </article>
            <ProductReview productId={product.id} />
            <hr className="my-4" />
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
            <h2 className="text-xl font-semibold mt-8">🔢 Quantité :</h2>
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
