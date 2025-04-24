import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auths/auth.reducer";
import productReducer from "./products/productsReducer";
import cartReducer from "./carts/cart.reducer";
import OrderReducer from "./orders/order.reducer";
export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: OrderReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
