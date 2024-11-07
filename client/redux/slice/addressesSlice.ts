import { Address } from "@/app/types/AddressTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// État initial du slice avec les adresses `shipping` et `billing` initialement nulles
interface AddressesState {
  shipping: Address | null;
  billing: Address | null;
}

const initialState: AddressesState = {
  shipping: null,
  billing: null,
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    // Action pour définir les adresses `shipping` et `billing` dans le state
    setAddresses(
      state,
      action: PayloadAction<{
        shipping: Address | null;
        billing: Address | null;
      }>
    ) {
      // On assigne les adresses s'ils sont présents dans l'action
      if (action.payload.shipping) {
        state.shipping = action.payload.shipping;
      }
      if (action.payload.billing) {
        state.billing = action.payload.billing;
      }
    },

    // Action pour mettre à jour une adresse spécifique (shipping ou billing)
    updateAddress(
      state,
      action: PayloadAction<{
        type: "shipping" | "billing";
        updatedAddress: Address;
      }>
    ) {
      const { type, updatedAddress } = action.payload;
      // On vérifie le type d'adresse et on met à jour le state correspondant
      if (type === "shipping") {
        state.shipping = updatedAddress;
      } else if (type === "billing") {
        state.billing = updatedAddress;
      }
    },
  },
});

export const { setAddresses, updateAddress } = addressesSlice.actions;

export default addressesSlice.reducer;
