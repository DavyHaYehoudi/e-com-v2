"use client";
import React, { useEffect, useState } from "react";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import { TableCell, TableRow } from "@/components/ui/table";
import TrashIcon from "@/components/shared/TrashIcon";
import { isProductNew } from "@/app/utils/productUtils";
import QuantityCalculator from "@/components/shared/QuantityCalculator";
import NewBadge from "@/components/shared/badge/NewBadge";
import CashbackBadge from "@/components/shared/badge/CashbackBadge";
import CartRowPromotionPrice from "./CartRowPromotionPrice";
import VariantBadge from "@/components/shared/badge/VariantBadge";
import WeightBadge from "@/components/shared/badge/WeightBadge";
import { CartResponse } from "@/app/types/CartTypes";
import { useFetch } from "@/service/hooks/useFetch";

const CartRowItem = () => {
  const [quantity, setQuantity] = useState(1);

  const [productsInCart, setProductsInCart] = useState<CartResponse | null>(
    null
  );
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const { data } = useFetch<CartResponse>("/customer/cart", {
    requiredCredentials: true,
  });

  useEffect(() => {
    if (data) {
      setProductsInCart(data);
    }
  }, [data]);
  const handleDelete = (productId: number) => {
    console.log("Product deleted:", productId);
    // Logique pour supprimer le produit
  };

  return (
    productsInCart &&
    productsInCart.items.length > 0 &&
    productsInCart.items.map((product) => (
      <TableRow
        key={product.id}
        className="hover:bg-gray-100 relative border-b border-gray-500 "
      >
        {/* Première cellule : image et nom */}
        <TableCell className="font-medium relative">
          <ProductImageItem
            productId={product.id}
            name={product.name}
            path={product.images.find((image) => image.is_main)?.url || ""}
          />
          {isProductNew(product.new_until) && (
            <NewBadge additionalClasses="absolute top-1 left-0" />
          )}{" "}
        </TableCell>

        <TableCell>
          {product.name} <br />
          {product.selectedVariant && (
            <VariantBadge productVariant={product.selectedVariant} />
          )}{" "}
          <br />
          {product.weight && <WeightBadge weight={product.weight} />}
        </TableCell>

        {/* Cellule de gestion de la quantité et du prix */}
        <TableCell>
          <QuantityCalculator
            quantity={quantity}
            onValueChange={handleQuantityChange}
            maxQuantity={product.quantity_in_stock}
            price={product.price}
          />
        </TableCell>

        {/* Cellule affichant le prix de la réduction */}
        <TableCell className="text-right">
          <CartRowPromotionPrice
            quantity={quantity}
            price={product.price}
            discount={product.discount_percentage}
            discount_end_date={product.discount_end_date}
          />
        </TableCell>

        {/* Cellule pour Cashback */}
        <TableCell>
          {product.cash_back && (
            <CashbackBadge
              cashbackAmount={quantity * product.cash_back}
              additionalClasses="absolute top-1 right-0"
            />
          )}
        </TableCell>

        {/* Cellule pour le bouton de suppression */}
        <TableCell align="right">
          <TrashIcon onClick={() => handleDelete(product.id)} />
        </TableCell>
      </TableRow>
    ))
  );
};

export default CartRowItem;
