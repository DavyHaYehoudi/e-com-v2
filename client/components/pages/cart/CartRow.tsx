"use client";
import React, { useState } from "react";
import { productsInCart } from "@/app/mocks/products";
import { ProductCart } from "@/app/types/ProductTypes";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import TrashIcon from "@/components/shared/TrashIcon";
import { isProductNew } from "@/app/utils/productUtils";
import QuantityCalculator from "@/components/shared/QuantityCalculator";
import NewBadge from "@/components/shared/badge/NewBadge";
import CashbackBadge from "@/components/shared/badge/CashbackBadge";
import CartRowPrice from "./CartRowPrice";
import VariantBadge from "@/components/shared/badge/VariantBadge";
import WeightBadge from "@/components/shared/badge/WeightBadge";

const CartRow = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const productsMock: ProductCart[] = productsInCart;
  const handleDelete = (productId: number) => {
    console.log("Product deleted:", productId);
    // Logique pour supprimer le produit
  };

  return (
    productsMock &&
    productsMock.length > 0 &&
    productsMock.map((product) => (
      <TableRow key={product.id} className="hover:bg-gray-100">
        {/* Première cellule : image et nom */}
        <TableCell className="font-medium relative">
          <ProductImageItem
            productId={product.id}
            name={product.name}
            path={product.main_image}
          />
             {isProductNew(product.new_until) && <NewBadge additionalClasses="absolute top-0 left-0" />}{" "}
        </TableCell>

        <TableCell>
          {product.name}{" "}<br/>
          {product.variant && (
            <VariantBadge productVariant={product.variant} />
          )}{" "}<br/>
          {product.weight&& <WeightBadge weight={product.weight}/>}
       
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

        {/* Cellule affichant le prix total avec réduction */}
        <TableCell className="text-right">
          <CartRowPrice
            quantity={quantity}
            price={product.price}
            discount={product.discount_percentage}
          />
        </TableCell>

        {/* Cellule pour Cashback */}
        <TableCell>
          {product.cash_back && (
            <CashbackBadge cashbackAmount={quantity * product.cash_back} />
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

export default CartRow;
