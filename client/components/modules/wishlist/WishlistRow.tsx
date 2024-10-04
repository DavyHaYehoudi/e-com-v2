import { TableCell, TableRow } from "@/components/ui/table";
import { Trash } from "lucide-react";
import React from "react";
import { products } from "@/app/mocks/products";
import { Product } from "@/app/types/ProductTypes";
import ProductImageItem from "@/components/shared/productImage/ProductImageItem";
import AddToCartButton from "@/components/shared/AddToCartButton";
import { priceProduct } from "@/app/utils/productUtils";
import { formatPrice } from "@/app/utils/pricesFormat";

const WishlistRow = () => {
  const productsMock: Product[] = products;
  return (
    productsMock &&
    productsMock.length > 0 &&
    productsMock.map((product) => (
      <TableRow key={product.id}>
        <TableCell className="font-medium">
          <ProductImageItem
            productId={product.id}
            name={product.name}
            path={product.main_image}
          />{" "}
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{formatPrice(priceProduct(product))}</TableCell>
        <TableCell>
          <AddToCartButton product={product} />{" "}
        </TableCell>
        <TableCell>
          <Trash className="icon-class cursor-pointer" />
        </TableCell>
      </TableRow>
    ))
  );
};

export default WishlistRow;
