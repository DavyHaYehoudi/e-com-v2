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
        <WishlistRow />
      </TableBody>
    </Table>
  );
};

export default WishlistTable;
