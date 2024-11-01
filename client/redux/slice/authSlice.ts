// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isVisitor: boolean;
  isTokenExpired: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isVisitor: true,
  isTokenExpired: false,
};

// Fonction pour vérifier l'expiration du token
const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const exp = decodedToken.exp ? decodedToken.exp * 1000 : 0;
    return Date.now() > exp;
  } catch {
    return true; // Considère le token comme expiré si non décodable
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isVisitor = false;
      state.isTokenExpired = isTokenExpired(action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isVisitor = true;
      state.isTokenExpired = false;
    },
    checkTokenExpiration: (state) => {
      if (state.token) {
        state.isTokenExpired = isTokenExpired(state.token);
        state.isAuthenticated = !state.isTokenExpired;
        state.isVisitor = state.isTokenExpired;
      }
    },
  },
});

export const { login, logout, checkTokenExpiration } = authSlice.actions;

// Configuration pour persister les données dans le localStorage
const persistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "token",
    "user",
    "isAuthenticated",
    "isVisitor",
    "isTokenExpired",
  ],
};

export default persistReducer(persistConfig, authSlice.reducer);
