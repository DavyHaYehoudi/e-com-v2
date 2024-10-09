import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import WishlistRow from "./WishlistRow";
import { Product } from "@/app/types/ProductTypes";
import { products } from "@/app/mocks/products";

const productsMock: Product[] = products;
const WishlistTable = () => {
  return productsMock && productsMock.length > 0 ? (
    <Table className="min-w-full text-l">
      <TableCaption>
        <Button>Ajouter tous les favoris au panier</Button>{" "}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]"></TableHead>
          <TableHead className="w-[300px]"></TableHead>
          <TableHead className="w-[300px]"></TableHead>
          <TableHead className="w-[450px]"></TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <WishlistRow productsMock={productsMock} />
      </TableBody>
    </Table>
  ) : (
    <p className="font-bold text-center">
      Aucun produit dans votre liste de favoris.
    </p>
  );
};

export default WishlistTable;
