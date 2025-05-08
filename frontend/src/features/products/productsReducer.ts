import { createSlice } from "@reduxjs/toolkit";
import { productInitState } from "../products/productType";
import {
  createProducts,
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
        state.products = null;
      })
      .addCase(getProductForSeller.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProductForSeller.rejected, (state, action) => {
        state.products = null;
        state.error = action.payload ?? "Lỗi lấy sản phẩm";
      })
      .addCase(getProductForUser.pending, (state) => {
        state.error = null;
        state.products = null;
      })
      .addCase(getProductForUser.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProductForUser.rejected, (state, action) => {
        state.products = null;
        state.error = action.payload ?? "Lỗi lấy sản phẩm khách hàng";
      })
      .addCase(getProductForDetail.pending, (state) => {
        state.product_detail = null;
        state.error = null;
      })
      .addCase(getProductForDetail.fulfilled, (state, action) => {
        state.product_detail = action.payload;
      })
      .addCase(getProductForDetail.rejected, (state, action) => {
        state.error = action.payload ?? "lỗi lấy sản phẩm về order";
        state.product_detail = null;
      })
      .addCase(createProducts.pending, (state) => {
        state.error = null;
        state.mess = null;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.mess = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.error = action.payload ?? "loi them san pham";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.error = null;
        state.products = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.products = null;
        state.error = action.payload ?? "Lỗi xóa ";
      });
  },
});

export default productsSlice.reducer;
export const { clearError } = productsSlice.actions;
