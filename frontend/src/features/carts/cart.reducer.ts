import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  cancelCart,
  getCart,
  getCartForDetail,
} from "./cart.slice";
import { cartInitState } from "./cart.type";

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
        state.loading = true;
        state.cart_detail = null;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart_detail = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
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
      })
      .addCase(cancelCart.pending, (state) => {
        state.carts = null;
      })
      .addCase(cancelCart.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(cancelCart.rejected, (state, action) => {
        state.error = action.payload ?? "cancel not successfully";
      });
  },
});

export default cartSlice.reducer;
export const { clearError } = cartSlice.actions;
