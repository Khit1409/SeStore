import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  getCart,
  getCartForDetail,
  getCartForSeller,
} from "./cartSlice";
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
        state.cart_detail = null;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart_detail = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cart_detail = null;
        state.error = action.payload ?? "Lỗi khi thêm sản phẩm vào giỏ hàng";
      })
      .addCase(getCart.pending, (state) => {
        state.carts = null;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.carts = null;
        state.error = action.payload ?? "Lỗi ";
      })
      .addCase(getCartForSeller.pending, (state) => {
        state.carts = null;
        state.error = null;
      })
      .addCase(getCartForSeller.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(getCartForSeller.rejected, (state, action) => {
        state.error = action.payload ?? "Lỗi lấy sản phẩm";
        state.carts = null;
      })
      .addCase(getCartForDetail.pending, (state) => {
        state.cart_detail = null;
        state.error = null;
      })
      .addCase(getCartForDetail.fulfilled, (state, action) => {
        state.cart_detail = action.payload;
      })
      .addCase(getCartForDetail.rejected, (state, action) => {
        state.error =
          action.payload ?? "Lỗi lấy chi tiết đơn hàng để thanh toán";
      });
  },
});

export default cartSlice.reducer;
export const { clearError } = cartSlice.actions;
