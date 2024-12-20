"use client";
import React, { useState, useEffect } from "react";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import { TableCell, TableRow } from "@/components/ui/table";
import TrashIcon from "@/components/shared/TrashIcon";
import NewBadge from "@/components/shared/badge/NewBadge";
import CashbackBadge from "@/components/shared/badge/CashbackBadge";
import CartRowPromotionPrice from "./CartRowPromotionPrice";
import VariantBadge from "@/components/shared/badge/VariantBadge";
import WeightBadge from "@/components/shared/badge/WeightBadge";
import { CartResponse } from "@/app/(public)/types/CartTypes";
import { isProductNew } from "@/app/(public)/utils/productUtils";
import { sumPriceArticle } from "@/app/(public)/utils/pricesFormat";

interface CartRowItemProps {
  productsInCart: CartResponse | null;
  removeProduct: (
    productId: number,
    variant: string | null,
    type: "item" | "giftCard"
  ) => void;
}
const CartRowItem: React.FC<CartRowItemProps> = ({
  productsInCart,
  removeProduct,
}) => {
  // Initialiser l'état des quantités avec l'ID et le variant du produit comme clé
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Initialiser les quantités depuis productsInCart une seule fois lors du chargement du composant
    if (productsInCart) {
      const initialQuantities = productsInCart.items.reduce((acc, product) => {
        const key = `${product.id}-${product.selectedVariant || "default"}`;
        acc[key] = product.quantityInCart || 1;
        return acc;
      }, {} as { [key: string]: number });
      setQuantities(initialQuantities);
    }
  }, [productsInCart]);

  return (
    productsInCart &&
    productsInCart.items.length > 0 &&
    productsInCart.items.map((product) => {
      const key = `${product.id}-${product.selectedVariant || "default"}`;
      return (
        <TableRow
          key={key}
          className="hover:bg-gray-100 relative border-b border-gray-500 dark:hover:bg-[#1c2028]"
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
            )}
          </TableCell>

          <TableCell>
            {product.name} <br />
            {product.selectedVariant && (
              <VariantBadge productVariant={product.selectedVariant} />
            )}
            <br />
            {product.weight ? <WeightBadge weight={product.weight} /> : ""}
          </TableCell>

          {/* Cellule de la quantité et du prix */}
          <TableCell>
            <span className="whitespace-nowrap">
              {sumPriceArticle(quantities[key], product.price)}
            </span>
          </TableCell>

          {/* Cellule affichant le prix de la réduction */}
          <TableCell className="text-right">
            <CartRowPromotionPrice
              quantity={quantities[key] || 1}
              price={product.price}
              discount={product.discount_percentage}
              discount_end_date={product.discount_end_date}
            />
          </TableCell>

          {/* Cellule pour Cashback */}
          <TableCell>
            {product.cash_back ? (
              <CashbackBadge
                cashbackAmount={(quantities[key] || 1) * product.cash_back}
                additionalClasses="absolute top-1 right-0"
              />
            ) : (
              ""
            )}
          </TableCell>

          {/* Cellule pour le bouton de suppression */}
          <TableCell align="right">
            <TrashIcon
              onClick={() =>
                removeProduct(product.id, product.selectedVariant, "item")
              }
            />
          </TableCell>
        </TableRow>
      );
    })
  );
};

export default CartRowItem;
