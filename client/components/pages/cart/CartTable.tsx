'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import CartRow from "./CartRow";
import { formatPrice } from "@/app/utils/pricesFormat";
import {
  calculateTotalCartAfterDiscount,
  calculateTotalCartBeforeDiscount,
  calculateTotalCashbackCart,
  calculateTotalDiscountCart,
  calculateTotalWeightCart,
} from "./utils/calculUtils";
import { productsInCart } from "@/app/mocks/products";
import { formatWeight } from "@/app/utils/weightFormat";
import CartDelivery from "./CartDelivery";
import { useState } from "react";
import { calculateDeliveryPrice, defaultDelivery } from "./utils/deliveryUtils";
import { deliveries } from "@/app/mocks/delivery";

const CartTable = () => {
    const [selectedDelivery, setSelectedDelivery] = useState(defaultDelivery(deliveries));
    const handleDeliveryChange = (deliveryId: number) => {
        const selected = deliveries.find((delivery) => delivery.id === deliveryId);
        setSelectedDelivery(selected);
      };
      const deliveryPrice = calculateDeliveryPrice({selectedDelivery,totalWeight:calculateTotalWeightCart(productsInCart)})
      const weightTotal = calculateTotalWeightCart(productsInCart)
  return (
    <Table>
      <TableCaption className="uppercase">
        utiliser mes avantages ⬇️
      </TableCaption>
      <TableBody>
        <CartRow />
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total des produits hors promotion</TableCell>
          <TableCell className="text-right">
            {formatPrice(calculateTotalCartBeforeDiscount(productsInCart))}{" "}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5}>Total des promotions</TableCell>
          <TableCell className="text-right">
            {formatPrice(calculateTotalDiscountCart(productsInCart))}{" "}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5}>Total du cashback capitalisé pour vos prochains achats</TableCell>
          <TableCell className="text-right">
            {formatPrice(calculateTotalCashbackCart(productsInCart))}
          </TableCell>
        </TableRow>
        <TableRow>
          <CartDelivery handleDeliveryChange={handleDeliveryChange} selectedDelivery={selectedDelivery} weightTotal={weightTotal} />
          <TableCell className="text-right">
            {formatPrice(deliveryPrice)}
          </TableCell>
        </TableRow>
        <TableRow className="font-extrabold">
          <TableCell colSpan={5}>Total du panier</TableCell>
          <TableCell className="text-right">
            {formatPrice(calculateTotalCartAfterDiscount(productsInCart,deliveryPrice))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default CartTable;
