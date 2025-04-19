import { createSlice } from "@reduxjs/toolkit";
import { productInitState } from "../products/productType";
import {
  deleteProduct,
  getProductForDetail,
  getProductForSeller,
  getProductForUser,
} from "./productsSlice";
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
      .addCase(getProductForSeller.pending, (state) => {
        state.error = null;
        state.product = null;
      })
      .addCase(getProductForSeller.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProductForSeller.rejected, (state, action) => {
        state.product = null;
        state.error = action.payload ?? "Lỗi lấy sản phẩm";
      })
      .addCase(getProductForUser.pending, (state) => {
        state.error = null;
        state.product = null;
      })
      .addCase(getProductForUser.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProductForUser.rejected, (state, action) => {
        state.product = null;
        state.error = action.payload ?? "Lỗi lấy sản phẩm khách hàng";
      })
      .addCase(getProductForDetail.pending, (state) => {
        state.productDetai = null;
        state.error = null;
      })
      .addCase(getProductForDetail.fulfilled, (state, action) => {
        state.productDetai = action.payload;
      })
      .addCase(getProductForDetail.rejected, (state, action) => {
        state.error = action.payload ?? "lỗi lấy sản phẩm về order";
        state.productDetai = null;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.error = null;
        state.product = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.product = null;
        state.error = action.payload ?? "Lỗi xóa ";
      });
      
  },
});

export default productsSlice.reducer;
export const { clearError } = productsSlice.actions;
