import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { formatPrice } from "@/app/utils/pricesFormat";
import TrashIcon from "@/components/shared/TrashIcon";
import { WishlistGiftCard } from "@/app/types/WishlistTypes";
import ProductImageGiftcard from "@/components/shared/productImage/ProductImageGiftcard";

interface WislistRowGiftcardProps {
  productsWishlistGiftcard: WishlistGiftCard[];
}
const WishlistRowGiftcard: React.FC<WislistRowGiftcardProps> = ({
  productsWishlistGiftcard,
}) => {
  const handleDelete = (productId: string) => {
    console.log("Product deleted:", productId);
    // Logique pour supprimer le produit
  };
  return (
    productsWishlistGiftcard &&
    productsWishlistGiftcard.length > 0 &&
    productsWishlistGiftcard.map((product) => (
      <TableRow key={product.id} className="border-b border-gray-500 ">
        <TableCell className="font-medium relative">
          <ProductImageGiftcard amount={product.amount} />{" "}
        </TableCell>
        <TableCell>Carte cadeau pour soi ou à offrir</TableCell>
        <TableCell>{formatPrice(product.amount)}</TableCell>
        <TableCell>
          <TrashIcon onClick={() => handleDelete("product-id")} />
        </TableCell>
      </TableRow>
    ))
  );
};

export default WishlistRowGiftcard;
