import { createSlice } from "@reduxjs/toolkit";
import {
  addToOrder,
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
      .addCase(addToOrder.pending, (state) => {
        state.order_detail = null;
        state.error = null;
        state.loading = false;
      })
      .addCase(addToOrder.fulfilled, (state, action) => {
        state.order_detail = action.payload;
        state.loading = false;
      })
      .addCase(addToOrder.rejected, (state, action) => {
        state.order_detail = null;
        state.error = action.payload ?? "Lỗi thêm đơn hàng";
        state.loading = false;
      })
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
      });
  },
});

export default orderSlice.reducer;
export const { clearError } = orderSlice.actions;
