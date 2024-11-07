// store/paymentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderResponse } from "@/app/types/OrderCreate";

interface OrderState {
  createPendingOrder: OrderResponse | null;
}

const initialState: OrderState = {
  createPendingOrder: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setCreatePendingOrder(state, action: PayloadAction<OrderResponse>) {
      state.createPendingOrder = action.payload;
    },
    clearCreatePendingOrder(state) {
      state.createPendingOrder = null;
    },
  },
});

export const { setCreatePendingOrder, clearCreatePendingOrder } = paymentSlice.actions;
export default paymentSlice.reducer;
