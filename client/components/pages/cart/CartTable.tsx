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
  calculateCodePromoDiscountOnCartTotal,
  calculateTotalAmountGiftCardToUse,
  calculateTotalCartAfterCodePromo,
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
import CartCodePromo from "./codePromo/CartCodePromo";
import GiftcardToUse from "./giftcardToUse/GiftcardToUse";
import { GiftcardToUseType } from "@/app/types/GiftcardToUseTypes";

const CartTable = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(
    defaultDelivery(deliveries)
  );
  const [codePromoPercentage, setCodePromoPercentage] = useState(0);
  const [giftCardsToUse, setGiftCardsToUse] = useState<GiftcardToUseType[]>([]);
  const handleDeliveryChange = (deliveryId: number) => {
    const selected = deliveries.find((delivery) => delivery.id === deliveryId);
    setSelectedDelivery(selected);
  };
  const deliveryPrice = calculateDeliveryPrice({
    selectedDelivery,
    totalWeight: calculateTotalWeightCart(productsInCart.items),
  });
  const weightTotal = calculateTotalWeightCart(productsInCart.items);
  const onDiscount = (discount_percentage: number) => {
    setCodePromoPercentage(discount_percentage);
  };

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
          <TableCell className="border-b border-gray-500" colSpan={5}>
            Total des produits hors promotion
          </TableCell>
          <TableCell className="text-right border-b border-gray-500">
            {formatPrice(
              calculateTotalCartBeforeDiscount(
                productsInCart.items,
                productsInCart.gift_cards
              )
            )}{" "}
          </TableCell>
        </TableRow>

        <TableRow>
          <CartDelivery
            handleDeliveryChange={handleDeliveryChange}
            selectedDelivery={selectedDelivery}
            weightTotal={weightTotal}
          />
          <TableCell className="text-right border-b border-gray-500">
            {formatPrice(deliveryPrice)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5} className="border-b border-gray-500">
            Total des promotions
          </TableCell>
          <TableCell className="text-right border-b border-gray-500">
            {calculateTotalDiscountCart(productsInCart.items) > 0
              ? `- ${formatPrice(
                  calculateTotalDiscountCart(productsInCart.items)
                )}`
              : 0}
          </TableCell>
        </TableRow>

        <TableRow>
          <GiftcardToUse
            giftCardsToUse={giftCardsToUse}
            setGiftCardsToUse={setGiftCardsToUse}
          />
          <TableCell className="text-right bg-white" colSpan={5}>
            {calculateTotalAmountGiftCardToUse(giftCardsToUse) > 0
              ? `- ${formatPrice(
                  calculateTotalAmountGiftCardToUse(giftCardsToUse)
                )}`
              : 0}
          </TableCell>
        </TableRow>
        <TableRow>
          <CartCodePromo
            onDiscount={onDiscount}
            codePromoPercentage={codePromoPercentage}
          />
          <TableCell className="text-right bg-white" colSpan={5}>
            {codePromoPercentage
              ? `- ${formatPrice(
                  calculateCodePromoDiscountOnCartTotal(
                    productsInCart.items,
                    deliveryPrice,
                    productsInCart.gift_cards,
                    giftCardsToUse,
                    codePromoPercentage
                  )
                )}`
              : 0}
          </TableCell>
        </TableRow>
        <TableRow className="font-extrabold">
          <TableCell colSpan={5} className="border-b border-gray-500">
            Total du panier
          </TableCell>
          <TableCell className="text-right  border-b border-gray-500">
            {formatPrice(
              calculateTotalCartAfterCodePromo(
                productsInCart.items,
                deliveryPrice,
                productsInCart.gift_cards,
                giftCardsToUse,
                codePromoPercentage
              )
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default CartTable;
