"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import CartRowItem from "./CartRowItem";
import { formatPrice } from "@/app/utils/pricesFormat";
import {
  calculateTotalCartAfterDiscount,
  calculateTotalCartBeforeDiscount,
  calculateTotalCashbackCart,
  calculateTotalDiscountCart,
  calculateTotalWeightCart,
} from "./utils/calculUtils";
import { productsInCart } from "@/app/mocks/products";
import CartDelivery from "./CartDelivery";
import { useState } from "react";
import { calculateDeliveryPrice, defaultDelivery } from "./utils/deliveryUtils";
import { deliveries } from "@/app/mocks/delivery";
import CartRowGiftcard from "./CartRowGiftcard";

const CartTable = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(
    defaultDelivery(deliveries)
  );
  const handleDeliveryChange = (deliveryId: number) => {
    const selected = deliveries.find((delivery) => delivery.id === deliveryId);
    setSelectedDelivery(selected);
  };
  const deliveryPrice = calculateDeliveryPrice({
    selectedDelivery,
    totalWeight: calculateTotalWeightCart(productsInCart.items),
  });
  const weightTotal = calculateTotalWeightCart(productsInCart.items);
  return (
    <Table>
      {calculateTotalCashbackCart(productsInCart.items) > 0 && (
        <TableCaption className="uppercase bg-blue-500 text-white rounded-sm p-1">
          Total du cashback capitalisé pour vos prochains achats :{" "}
          <span className="font-extrabold">
            {formatPrice(calculateTotalCashbackCart(productsInCart.items))}
          </span>
        </TableCaption>
      )}
      <TableBody>
        <CartRowItem />
        <CartRowGiftcard />
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total des produits hors promotion</TableCell>
          <TableCell className="text-right">
            {formatPrice(
              calculateTotalCartBeforeDiscount(
                productsInCart.items,
                productsInCart.gift_cards
              )
            )}{" "}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5}>Total des promotions</TableCell>
          <TableCell className="text-right">
            {formatPrice(calculateTotalDiscountCart(productsInCart.items))}{" "}
          </TableCell>
        </TableRow>
        <TableRow>
          <CartDelivery
            handleDeliveryChange={handleDeliveryChange}
            selectedDelivery={selectedDelivery}
            weightTotal={weightTotal}
          />
          <TableCell className="text-right">
            {formatPrice(deliveryPrice)}
          </TableCell>
        </TableRow>
        <TableRow className="font-extrabold">
          <TableCell colSpan={5}>Total du panier</TableCell>
          <TableCell className="text-right">
            {formatPrice(
              calculateTotalCartAfterDiscount(
                productsInCart.items,
                deliveryPrice,
                productsInCart.gift_cards
              )
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default CartTable;
