import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType } from "./productType";
import axios from "axios";

const productUrl = import.meta.env.VITE_PRODUCT_API;

export const getProductForSeller = createAsyncThunk<
  ProductType[],
  {
    seller_id: string;
    type_product: string;
    limit: 8;
    page: number;
    search: string;
  },
  { rejectValue: string }
>(
  "product/get",
  async ({ seller_id, limit, page, type_product, search }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${productUrl}/${seller_id}?typeProduct=${type_product}&limit=${limit}&page=${page}&search=${search}`
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
  }
);
//get product for user
export const getProductForUser = createAsyncThunk<
  ProductType[],
  {
    type_product: string;
    price: string;
    state_product: string;
    limit: number;
    page: number;
    search: string;
  },
  { rejectValue: string }
>(
  "product/getUser",
  async (
    { type_product, price, state_product, limit, page, search },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `${productUrl}?type=${type_product}&price=${price}&stateProduct=${state_product}&limit=${limit}&page=${page}&search=${search}`
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
  { product_id: string },
  { rejectValue: string }
>("product/getOrder", async ({ product_id }, thunkAPI) => {
  try {
    const response = await axios.get(`${productUrl}/detail/${product_id}`);

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
  ProductType[],
  { product_id: string; seller_id: string },
  { rejectValue: string }
>("product/delete", async ({ product_id, seller_id }, thunkAPI) => {
  try {
    const result = await axios.post(`${productUrl}/delete`, {
      product_id,
      seller_id,
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
