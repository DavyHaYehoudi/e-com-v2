// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlistReducer from "../slice/wishlistSlice";
import { combineReducers } from "redux";

// Configuration de persistance
const persistConfig = {
  key: "root",
  storage,
};

// Combinez vos reducers, s'il y en a plusieurs
const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  // ...autres reducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurez le store avec le reducer persistant
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
