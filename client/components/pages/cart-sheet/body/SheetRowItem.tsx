import { ProductCart } from "@/app/types/ProductTypes";
import { isProductNew } from "@/app/utils/productUtils";
import NewBadge from "@/components/shared/badge/NewBadge";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import React from "react";
import CartRowPromotionPrice from "../../cart/CartRowPromotionPrice";
import CashbackBadge from "@/components/shared/badge/CashbackBadge";
import TrashIcon from "@/components/shared/TrashIcon";
import VariantBadge from "@/components/shared/badge/VariantBadge";
import WeightBadge from "@/components/shared/badge/WeightBadge";
import { sumPriceArticle } from "@/app/utils/pricesFormat";

interface SheetRowItemProps {
  productsInCart: ProductCart;
}
const SheetRowItem: React.FC<SheetRowItemProps> = ({ productsInCart }) => {
  const handleDelete = (productId: number) => {
    console.log("Product deleted:", productId);
    // Logique pour supprimer le produit
  };
  return (
    productsInCart &&
    productsInCart.items.length > 0 &&
    productsInCart.items.map((product) => (
      <article
        key={product.id}
        className="hover:bg-gray-100 relative border-b border-gray-500 "
      >
        <div className="flex items-center justify-between gap-2 p-2 my-2">
          {/* Première cellule : image et nom */}
          <p className="font-medium relative">
            <ProductImageItem
              productId={product.id}
              name={product.name}
              path={product.main_image}
            />
            {isProductNew(product.new_until) && (
              <NewBadge additionalClasses="absolute top-1 left-0" />
            )}{" "}
          </p>

          <p>
            {product.name} <br />
            {product.variant && (
              <VariantBadge productVariant={product.variant} />
            )}{" "}
            <br />
            {product.weight && <WeightBadge weight={product.weight} />}
          </p>
        </div>
        <div className="flex items-center justify-between p-2 my-2">
          <p>{sumPriceArticle(product.quantityInCart, product.price)}</p>
          {/* Cellule affichant le prix de la réduction */}
          <p className="text-right">
            <CartRowPromotionPrice
              quantity={product.quantityInCart}
              price={product.price}
              discount={product.discount_percentage}
            />
          </p>
          {/* Cellule pour Cashback */}
          <p>
            {product.cash_back && (
              <CashbackBadge
                cashbackAmount={product.quantityInCart * product.cash_back}
                //   additionalClasses="absolute top-1 right-0"
              />
            )}
          </p>
          {/* Cellule pour le bouton de suppression */}
        </div>
        <p className="flex justify-center my-2">
          <TrashIcon onClick={() => handleDelete(product.id)} />
        </p>
      </article>
    ))
  );
};

export default SheetRowItem;
