import { GiftcardToUseType } from "@/app/types/GiftcardToUseTypes";
import {
  ProductCartGiftcards,
  ProductCartItems,
} from "@/app/types/ProductTypes";

export const calculateTotalPriceByRow = (
  quantity: number,
  price: number,
  discountPercentage: number | undefined | null
): number => {
  if (discountPercentage) {
    const discountAmount = (discountPercentage * price) / 100;
    const discountedPrice = price - discountAmount;
    return quantity * discountedPrice;
  }

  // Si pas de réduction, retourne le prix normal
  return quantity * price;
};
export const calculateTotalDiscountByRow = (
  quantity: number,
  price: number,
  discountPercentage: number | undefined | null
): number => {
  if (discountPercentage) {
    const discountAmount = (discountPercentage * price) / 100;
    return quantity * discountAmount;
  }
  // Pas de réduction, donc pas de discount
  return 0;
};
export const calculateTotalDiscountCart = (items: ProductCartItems[]) => {
  return items.reduce((sum, product) => {
    if (product.discount_percentage) {
      return (
        sum +
        (product.price * product.quantityInCart * product.discount_percentage) /
          100
      );
    }
    return sum;
  }, 0);
};
export const calculateTotalCashbackCartToEarn = (items: ProductCartItems[]) => {
  return items.reduce((sum, product) => {
    if (product.cash_back) {
      return sum + product.quantityInCart * product.cash_back;
    }
    return sum;
  }, 0);
};
export const calculateTotalCartBeforeDiscount = (
  items: ProductCartItems[],
  giftcards: ProductCartGiftcards[] = []
) => {
  const giftcardsTotalAmount = calculateTotalAmountGiftCardToBuy(giftcards);
  return items.reduce((sum, product) => {
    return sum + product.price * product.quantityInCart;
  }, giftcardsTotalAmount || 0);
};
export const calculateTotalWeightCart = (items: ProductCartItems[]) => {
  return items.reduce((sum, product) => {
    return sum + (product.weight || 0) * product.quantityInCart;
  }, 0);
};
export const calculateTotalAmountGiftCardToBuy = (
  giftcards: ProductCartGiftcards[]
) => {
  return giftcards.reduce(
    (sum, giftcard) => sum + giftcard.amount * giftcard.quantity,
    0
  );
};
export const calculateTotalAmountGiftCardToUse = (
  giftcards: GiftcardToUseType[]
) => {
  return giftcards.reduce((sum, giftcard) => sum + (giftcard.balance ?? 0), 0);
};
export const calculateTotalCartAfterDiscountAndGiftcardToUse = (
  items: ProductCartItems[],
  deliveryPrice: number,
  giftcardsToBuy: ProductCartGiftcards[] = [],
  giftcardsToUse: GiftcardToUseType[] = []
) => {
  return (
    calculateTotalCartBeforeDiscount(items) -
    calculateTotalDiscountCart(items) +
    deliveryPrice +
    calculateTotalAmountGiftCardToBuy(giftcardsToBuy) -
    calculateTotalAmountGiftCardToUse(giftcardsToUse)
  );
};
export const calculateCodePromoDiscountOnCartTotal = (
  items: ProductCartItems[],
  deliveryPrice: number,
  giftcardsToBuy: ProductCartGiftcards[] = [],
  giftcardsToUse: GiftcardToUseType[] = [],
  percentage: number
) => {
  return Math.max(
    0,
    (calculateTotalCartAfterDiscountAndGiftcardToUse(
      items,
      deliveryPrice,
      giftcardsToBuy,
      giftcardsToUse
    ) *
      percentage) /
      100
  );
};
export const calculateTotalCartAfterCashback = (
  items: ProductCartItems[],
  deliveryPrice: number,
  giftcardsToBuy: ProductCartGiftcards[] = [],
  giftcardsToUse: GiftcardToUseType[] = [],
  percentage: number,
  selectedCashback: number | null
) => {
  return Math.max(
    0,
    calculateTotalCartAfterDiscountAndGiftcardToUse(
      items,
      deliveryPrice,
      giftcardsToBuy,
      giftcardsToUse
    ) -
      calculateCodePromoDiscountOnCartTotal(
        items,
        deliveryPrice,
        giftcardsToBuy,
        giftcardsToUse,
        percentage
      ) -
      (selectedCashback ?? 0)
  );
};
