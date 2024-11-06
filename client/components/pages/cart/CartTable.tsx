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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setShippingMethod } from "@/redux/slice/priceAdjustmentsSlice";
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
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { deliveries, selectedDelivery, handleDeliveryChange, deliveryPrice } =
    useDelivery(productsInCart);
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
  if (selectedDelivery) {
    dispatch(setShippingMethod(selectedDelivery.id));
  }
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
          deliveries={deliveries}
        />
        <RowGiftcardToUse
          giftCardsToUse={giftCardsToUse}
          onGiftcardToUse={handleGiftcardToUse}
        />
        <RowCodePromo
          onDiscount={onDiscount}
          codePromoPercentage={codePromoPercentage}
          productsInCart={productsInCart}
          deliveryPrice={deliveryPrice}
          giftCardsToUse={giftCardsToUse}
        />
        {isAuthenticated && (
          <RowCashbackToUse
            onCashbackSelect={handleCashbackSelect}
            selectedCashback={selectedCashback}
          />
        )}
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
