"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
} from "@/components/ui/table";
import CartRowItem from "./CartRowItem";
import { formatPrice } from "@/app/utils/pricesFormat";
import {
  calculateTotalCashbackCart,
  calculateTotalWeightCart,
} from "./utils/calculUtils";
import { productsInCart } from "@/app/mocks/products";
import { useState } from "react";
import { calculateDeliveryPrice, defaultDelivery } from "./utils/deliveryUtils";
import { deliveries } from "@/app/mocks/delivery";
import CartRowGiftcard from "./CartRowGiftcard";
import { GiftcardToUseType } from "@/app/types/GiftcardToUseTypes";
import ProductsBeforePromotion from "./rowTotals/ProductsBeforePromotion";
import RowDelivery from "./rowTotals/RowDelivery";
import RowPromotion from "./rowTotals/RowPromotion";
import RowGiftcardToUse from "./rowTotals/giftcardToUse/RowGiftcardToUse";
import RowCodePromo from "./rowTotals/codePromo/RowCodePromo";
import RowTotalCart from "./rowTotals/RowTotalCart";
import RowCashbackToUse from "./rowTotals/cashback/RowCashbackToUse";

const CartTable = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(
    defaultDelivery(deliveries)
  );
  const [codePromoPercentage, setCodePromoPercentage] = useState(0);
  const [giftCardsToUse, setGiftCardsToUse] = useState<GiftcardToUseType[]>([]);
  const [selectedCashback, setSelectedCashback] = useState<number | null>(null);
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
  const handleCashbackSelect = (amount: number) => {
    setSelectedCashback(amount);
    console.log("Montant sélectionné:", amount);
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
        <ProductsBeforePromotion productsInCart={productsInCart} />
        <RowDelivery
          handleDeliveryChange={handleDeliveryChange}
          selectedDelivery={selectedDelivery}
          weightTotal={weightTotal}
          deliveryPrice={deliveryPrice}
        />
        <RowPromotion productsInCart={productsInCart} />
        <RowGiftcardToUse
          giftCardsToUse={giftCardsToUse}
          setGiftCardsToUse={setGiftCardsToUse}
        />
        <RowCodePromo
          onDiscount={onDiscount}
          codePromoPercentage={codePromoPercentage}
          productsInCart={productsInCart}
          deliveryPrice={deliveryPrice}
          giftCardsToUse={giftCardsToUse}
        />
        <RowCashbackToUse
          onCashbackSelect={handleCashbackSelect}
          selectedCashback={selectedCashback}
        />
        <RowTotalCart
          productsInCart={productsInCart}
          deliveryPrice={deliveryPrice}
          giftCardsToUse={giftCardsToUse}
          codePromoPercentage={codePromoPercentage}
          selectedCashback={selectedCashback}
        />
      </TableFooter>
    </Table>
  );
};
export default CartTable;
