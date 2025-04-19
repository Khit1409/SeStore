import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auths/authReducer";
import productReducer from "./products/productsReducer";
import cartReducer from "./carts/cartReducer";
export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
