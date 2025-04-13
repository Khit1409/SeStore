import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType } from "./productType";
import axios from "axios";

const productUrl = import.meta.env.VITE_PRODUCT_API;

export const getProduct = createAsyncThunk<
  ProductType[],
  { typeProduct: string | ""; limit: 8; page: number },
  { rejectValue: string }
>("product/get", async ({ typeProduct, limit, page }, thunkAPI) => {
  try {
    const response = await axios.get(
      `${productUrl}/${typeProduct}?limit=${limit}&page=${page}`
    );
    if (response.data.product) {
      return response.data.product;
    }
    return thunkAPI.rejectWithValue("Không tìm thấy sản phẩm");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Lỗi server"
      );
    }
    return thunkAPI.rejectWithValue("Đã xảy ra lỗi không xác định");
  }
});
