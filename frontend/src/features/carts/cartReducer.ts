import { createSlice } from "@reduxjs/toolkit";
import { addToCart, getCart, getCartForSeller } from "./cartSlice";
import { cartInitState } from "./cartType";

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.cart = null;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = [action.payload];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cart = null;
        state.error = action.payload ?? "Lỗi khi thêm sản phẩm vào giỏ hàng";
      })
      .addCase(getCart.pending, (state) => {
        state.cart = null;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.cart = null;
        state.error = action.payload ?? "Lỗi ";
      })
      .addCase(getCartForSeller.pending, (state) => {
        state.cart = null;
        state.error = null;
      })
      .addCase(getCartForSeller.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(getCartForSeller.rejected, (state, action) => {
        state.error = action.payload ?? "Lỗi lấy sản phẩm";
        state.cart = null;
      });
  },
});

export default cartSlice.reducer;
export const { clearError } = cartSlice.actions;
