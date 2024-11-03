"use client";
import {
  Table,
  TableBody,
  TableFooter,
} from "@/components/ui/table";
import CartRowItem from "./CartRowItem";
import { calculateTotalWeightCart } from "./utils/calculUtils";
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
import { CartResponse } from "@/app/types/CartTypes";
import { useCartManager } from "@/app/panier/hooks/useCartManager";

interface CartRowItemProps {
  productsInCart: CartResponse | null;
  removeProduct: (
    productId: number,
    variant: string | null,
    type: "item" | "giftCard"
  ) => void;
}
const CartTable: React.FC<CartRowItemProps> = ({
  productsInCart,
  removeProduct,
}) => {
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
  const deliveryPrice =
    productsInCart &&
    calculateDeliveryPrice({
      selectedDelivery,
      totalWeight: calculateTotalWeightCart(productsInCart.items),
    });
  const weightTotal =
    productsInCart && calculateTotalWeightCart(productsInCart.items);
  const onDiscount = (discount_percentage: number) => {
    setCodePromoPercentage(discount_percentage);
  };
  const handleCashbackSelect = (amount: number) => {
    setSelectedCashback(amount);
  };
  return (
    <Table>
      <TableBody>
        <CartRowItem
          productsInCart={productsInCart}
          removeProduct={removeProduct}
        />
        <CartRowGiftcard
          productsInCart={productsInCart}
          removeProduct={removeProduct}
        />
      </TableBody>
      <TableFooter>
        <ProductsBeforePromotion productsInCart={productsInCart} />
        <RowPromotion productsInCart={productsInCart} />
        <RowDelivery
          handleDeliveryChange={handleDeliveryChange}
          selectedDelivery={selectedDelivery}
          weightTotal={weightTotal}
          deliveryPrice={deliveryPrice}
        />
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
