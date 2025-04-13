import { createSlice } from "@reduxjs/toolkit";
import { productInitState } from "../products/productType";
import { getProduct } from "./productsSlice";
const productsSlice = createSlice({
  name: "product",
  initialState: productInitState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.error = null;
        state.product = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.product = null;
        state.error = action.payload ?? "Lỗi lấy sản phẩm";
      });
  },
});

export default productsSlice.reducer;
export const { clearError } = productsSlice.actions;
