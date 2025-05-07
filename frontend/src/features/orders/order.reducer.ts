import { createSlice } from "@reduxjs/toolkit";
import {
  checkoutOrder,
  getOrder,
  getOrderConfirm,
  getOrderForSeller,
  submitOrder,
} from "./order.slice";
import { orderInitState } from "./order.type";

const orderSlice = createSlice({
  name: "order",
  initialState: orderInitState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (bulder) => {
    bulder

      .addCase(getOrder.pending, (state) => {
        state.orders = null;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.error = action.payload ?? "Lỗi lấy đơn hàng";
        state.orders = null;
      })
      .addCase(getOrderForSeller.pending, (state) => {
        state.orders = null;
        state.error = null;
      })
      .addCase(getOrderForSeller.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrderForSeller.rejected, (state, action) => {
        state.error = action.payload ?? "Không lấy đơn hàng được";
      })
      .addCase(submitOrder.pending, (state) => {
        state.orders = null;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.error = action.payload ?? "Không xác nhận được đơn hàng!";
      })
      .addCase(getOrderConfirm.pending, (state) => {
        state.orders = null;
        state.error = null;
      })
      .addCase(getOrderConfirm.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrderConfirm.rejected, (state, action) => {
        state.error = action.payload ?? "Can not get order";
      })
      .addCase(checkoutOrder.pending, (state) => {
        state.checkoutUrl = null;
      })
      .addCase(checkoutOrder.fulfilled, (state, action) => {
        state.checkoutUrl = action.payload;
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.checkoutUrl = null;
        state.error = action.payload ?? "Lỗi tạo link thanh toán";
      });
  },
});

export default orderSlice.reducer;
export const { clearError } = orderSlice.actions;
