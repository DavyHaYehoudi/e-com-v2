// src/store/wishlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistResponse } from "@/app/types/WishlistTypes";
import { MasterProductsType } from "@/app/types/ProductTypes";

// État initial typé selon WishlistResponse
const initialState: WishlistResponse = {
  wishlist: undefined,
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<WishlistResponse>) => {
      return {
        ...state,
        wishlist: action.payload.wishlist,
        items: action.payload.items,
      };
    },

    toggleItem: (state, action: PayloadAction<MasterProductsType>) => {
      const itemExists = state.items.some(
        (item) => item.id === action.payload.id
      );

      // Si l'item existe, le supprimer ; sinon, l'ajouter
      state.items = itemExists
        ? state.items.filter((item) => item.id !== action.payload.id)
        : [...state.items, action.payload];
    },
  },
});

export const { setWishlist, toggleItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
