"use client";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import useOrdersCustomer, {
  OrderItemList,
} from "@/components/pages/dashboard/customer/hooks/useOrdersCustomer";
import OrderItemRow from "./OrderItemRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface ContentOrderPageProps {
  params: {
    id: string;
  };
}
const ContentOrderPage: React.FC<ContentOrderPageProps> = ({ params }) => {
  const [orderItems, setOrderItems] = useState<OrderItemList>([]);
  const { id } = params;
  if (!id) {
    notFound(); // Gère le cas où l'ID est manquant
  }
  const { orderItemsCustomerFetch } = useOrdersCustomer(id);
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const data = await orderItemsCustomerFetch();
        if (data) {
          setOrderItems(data);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des order items :",
          error
        );
      }
    };
    fetchOrderItems();
  }, [id, orderItemsCustomerFetch]);
  return (
    <div className="xs:w-full xl:w-3/4 xl:mx-auto w-[300px]">
      <div className="mb-20">
        <h1 className="text-center mb-10">Contenu de la commande</h1>
        <Link
          href="/customer/tableau-de-bord/commandes/liste"
          className="underline text-blue-300"
        >
          Retour à la liste
        </Link>
      </div>
      <Table>
        <TableCaption>Produits achetés.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Promotion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems &&
            orderItems.length > 0 &&
            orderItems.map((item, index) => (
              <OrderItemRow key={index} item={item} />
            ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
};

export default ContentOrderPage;
