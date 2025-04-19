import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType } from "./productType";
import axios from "axios";

const productUrl = import.meta.env.VITE_PRODUCT_API;

export const getProductForSeller = createAsyncThunk<
  ProductType[],
  { sellerId: string; typeProduct: string; limit: 8; page: number },
  { rejectValue: string }
>("product/get", async ({ sellerId, limit, page, typeProduct }, thunkAPI) => {
  try {
    const response = await axios.get(
      `${productUrl}/${sellerId}?type=${typeProduct}&limit=${limit}&page=${page}`
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
//get product for user
export const getProductForUser = createAsyncThunk<
  ProductType[],
  {
    typeProduct: string;
    price: string;
    stateProduct: string;
    limit: number;
    page: number;
  },
  { rejectValue: string }
>(
  "product/getUser",
  async ({ typeProduct, price, stateProduct, limit, page }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${productUrl}?type=${typeProduct}&price=${price}&stateProduct=${stateProduct}&limit=${limit}&page=${page}`
      );
      if (response.data.product) {
        return response.data.product;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.message || "Lỗi server"
        );
      }
      return thunkAPI.rejectWithValue("Đã xảy ra lỗi không xác định");
    }
  }
);
//get product for detail product
export const getProductForDetail = createAsyncThunk<
  ProductType,
  { productId: string },
  { rejectValue: string }
>("product/getOrder", async ({ productId }, thunkAPI) => {
  try {
    const response = await axios.get(`${productUrl}/detail/${productId}`);

    if (response.data.product) {
      return response.data.product;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Lỗi get product order!");
    }
    return thunkAPI.rejectWithValue("Không xác định lỗi");
  }
});

//delete product

export const deleteProduct = createAsyncThunk<
  ProductType[], // <-- Chỗ này sửa từ null thành string
  { productId: string; sellerId: string },
  { rejectValue: string }
>("product/delete", async ({ productId, sellerId }, thunkAPI) => {
  try {
    const result = await axios.post(`${productUrl}/delete`, {
      productId,
      sellerId,
    });
    if (result.status === 200) {
      return result.data.reRender;
    } else {
      return thunkAPI.rejectWithValue("Failed to delete product");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Can not delete product");
    } else {
      return thunkAPI.rejectWithValue("Unknown error");
    }
  }
});
