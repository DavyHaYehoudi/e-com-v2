// store/priceAdjustmentsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceAdjustmentsState {
  promoCode: string | null;
  giftCards: Array<number>;
  shippingMethod: number | null;
  cashBackToSpend: number | null;
  totalDiscount: number;
  totalFees: number;
}

const initialState: PriceAdjustmentsState = {
  promoCode: null,
  giftCards: [],
  shippingMethod: null,
  cashBackToSpend: 0,
  totalDiscount: 0,
  totalFees: 0,
};

const priceAdjustmentsSlice = createSlice({
  name: "priceAdjustments",
  initialState,
  reducers: {
    applyPromoCode(state, action: PayloadAction<string>) {
      state.promoCode = action.payload;
    },
    setGiftCard(
      state,
      action: PayloadAction<{
        id?: number;
        code?: string;
        type: "add" | "remove";
      }>
    ) {
      if (action.payload.type === "remove") {
        state.giftCards = state.giftCards.filter(
          (id) => id !== action.payload.id
        );
      } else if (action.payload.type === "add" && action.payload.id) {
        state.giftCards = Array.from(
          new Set([...state.giftCards, action.payload.id])
        );
      }
    },
    setShippingMethod(state, action: PayloadAction<number>) {
      state.shippingMethod = action.payload;
    },
    setCashBackToSpend(state, action: PayloadAction<number>) {
      state.cashBackToSpend = action.payload;
    },
    setTotalDiscount(state, action: PayloadAction<number>) {
      state.totalDiscount = action.payload;
    },
    setTotalFees(state, action: PayloadAction<number>) {
      state.totalFees = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  applyPromoCode,
  setGiftCard,
  setShippingMethod,
  setCashBackToSpend,
  setTotalDiscount,
  setTotalFees,
  reset,
} = priceAdjustmentsSlice.actions;

export default priceAdjustmentsSlice.reducer;
