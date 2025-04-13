import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../products/productsReducer";
export const productStore = configureStore({
  reducer: {
    dataProduct: productReducer,
  },
});

export type ProductRootState = ReturnType<typeof productStore.getState>;
export type ProductDispatch = typeof productStore.dispatch;
