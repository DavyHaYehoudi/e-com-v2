import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { MasterProductsType } from "@/app/types/ProductTypes";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import { isProductNew, isProductOnSale } from "@/app/utils/productUtils";
import { formatPrice } from "@/app/utils/pricesFormat";
import { Badge } from "@/components/ui/badge";
import NewBadge from "@/components/shared/badge/NewBadge";
import PromotionBadge from "@/components/shared/badge/PromotionBadge";
import CashbackBadge from "@/components/shared/badge/CashbackBadge";
import FavoriteButton from "@/components/shared/FavoriteButton";

interface WislistRowItemProps {
  productsWishlistItems: MasterProductsType[];
}
const WishlistRowItem: React.FC<WislistRowItemProps> = ({
  productsWishlistItems,
}) => {
  return (
    productsWishlistItems &&
    productsWishlistItems.length > 0 &&
    productsWishlistItems.map((product, index) => (
      <TableRow key={index} className="border-b border-gray-500 relative">
        <TableCell className="font-medium relative">
          <ProductImageItem
            productId={product.id}
            name={product.name}
            path={
              product?.main_image ||
              product.images.find((image) => image.is_main)?.url ||
              ""
            }
          />{" "}
          {isProductNew(product.new_until) && (
            <NewBadge additionalClasses="absolute top-1 left-0" />
          )}
        </TableCell>
        <TableCell>
          {product.name} <br />
          {product.variants && (
            <Badge variant="outline">{product.variants[0]}</Badge>
          )}{" "}
        </TableCell>
        <TableCell>
          {formatPrice(product.price)} {/* Badge de promotion */}
          {isProductOnSale(product.discount_percentage) && (
            <PromotionBadge discountPercentage={product.discount_percentage} />
          )}
          <br />
          {/* Badge de cashback */}
          {product.cash_back && (
            <CashbackBadge cashbackAmount={product.cash_back} />
          )}
        </TableCell>
        <TableCell>
          <FavoriteButton product={product}  />
        </TableCell>
      </TableRow>
    ))
  );
};

export default WishlistRowItem;
