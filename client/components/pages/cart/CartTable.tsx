"use client";
import { Table, TableBody, TableFooter } from "@/components/ui/table";
import CartRowItem from "./CartRowItem";
import { calculateTotalWeightCart } from "./utils/calculUtils";
import CartRowGiftcard from "./CartRowGiftcard";
import ProductsBeforePromotion from "./rowTotals/ProductsBeforePromotion";
import RowDelivery from "./rowTotals/RowDelivery";
import RowPromotion from "./rowTotals/RowPromotion";
import RowGiftcardToUse from "./rowTotals/giftcardToUse/RowGiftcardToUse";
import RowCodePromo from "./rowTotals/codePromo/RowCodePromo";
import RowTotalCart from "./rowTotals/RowTotalCart";
import RowCashbackToUse from "./rowTotals/cashback/RowCashbackToUse";
import { CartResponse } from "@/app/types/CartTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useDelivery } from "./hooks/useDelivery";
import { useDiscounts } from "./hooks/useDiscounts";
import { useGiftCards } from "./hooks/useGiftCards";

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
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { deliveries, handleDeliveryChange, deliveryPrice, selectedDelivery } =
    useDelivery();
  const {
    codePromoPercentage,
    selectedCashback,
    applyDiscount,
    handleCashbackSelect,
  } = useDiscounts();
  const { giftCardsToUse, handleGiftcardToUse } = useGiftCards();

  const weightTotal =
    productsInCart && calculateTotalWeightCart(productsInCart.items);
  const onDiscount = (discount_percentage: number) => {
    applyDiscount(discount_percentage);
  };
  const isItemsInCart = useSelector((state: RootState) => state.cart.items);
  const isOnlyGiftcardsInCart = isItemsInCart.length === 0;
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
        <RowCodePromo
          onDiscount={onDiscount}
          codePromoPercentage={codePromoPercentage}
          productsInCart={productsInCart}
        />
        {!isOnlyGiftcardsInCart && (
          <RowDelivery
            handleDeliveryChange={handleDeliveryChange}
            selectedDelivery={selectedDelivery}
            weightTotal={weightTotal}
            deliveryPrice={deliveryPrice}
            deliveries={deliveries}
          />
        )}
        {isAuthenticated && (
          <RowCashbackToUse
            onCashbackSelect={handleCashbackSelect}
            selectedCashback={selectedCashback}
          />
        )}
        <RowGiftcardToUse
          giftCardsToUse={giftCardsToUse}
          onGiftcardToUse={handleGiftcardToUse}
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
