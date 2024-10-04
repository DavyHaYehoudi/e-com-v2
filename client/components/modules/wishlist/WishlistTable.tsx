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

const WishlistTable = () => {
  return (
    <Table className="min-w-full">
      <TableCaption>
        <Button>Ajouter tous les favoris au panier</Button>{" "}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]"></TableHead>
          <TableHead className="w-[150px]"></TableHead>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead className="w-[450px]"></TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <WishlistRow />
      </TableBody>
    </Table>
  );
};

export default WishlistTable;
