"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import WishlistRowItem from "./WishlistRowItem";
import { useFetch } from "@/service/hooks/useFetch";
import LoaderWrapper from "@/components/shared/LoaderWrapper";
import { WishlistResponse } from "@/app/types/WishlistTypes";
import WishlistRowGiftcard from "./WishlistRowGiftcard";

const WishlistTable = () => {
  const [productsWishlist, setProductsWishlist] = useState<WishlistResponse>();
  console.log("productsWishlist:", productsWishlist);
  const { data, loading, error } = useFetch<WishlistResponse>(
    "/customer/wishlist",
    {
      requiredCredentials: true,
    }
  );
  useEffect(() => {
    if (data) {
      setProductsWishlist(data);
    }
  }, [data]);

  return productsWishlist ? (
    <LoaderWrapper loading={loading} error={error}>
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
          <WishlistRowItem productsWishlistItems={productsWishlist.items} />
          <WishlistRowGiftcard
            productsWishlistGiftcard={productsWishlist.giftCards}
          />
        </TableBody>
      </Table>
    </LoaderWrapper>
  ) : (
    <p className="font-bold text-center">
      Aucun produit dans votre liste de favoris.
    </p>
  );
};

export default WishlistTable;
