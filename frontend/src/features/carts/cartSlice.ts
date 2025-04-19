import { createAsyncThunk } from "@reduxjs/toolkit";
import { Attributes } from "../products/productType";
import axios from "axios";
import { Cart } from "./cartType";

const cartUrl = import.meta.env.VITE_CART_API;
const orderUrl = import.meta.env.VITE_ORDER_API;
//add to cart
export const addToCart = createAsyncThunk<
  Cart,
  {
    productId: string;
    attributes: Attributes[];
    quantity: number;
    address: string;
    userId: string;
  },
  { rejectValue: string }
>(
  "cart/addtocart",
  async ({ productId, attributes, quantity, address, userId }, thunkAPI) => {
    try {
      const response = await axios.post(`${orderUrl}/addtocart/${productId}`, {
        userId,
        address,
        attributes,
        quantity,
      });
      if (response.data.newCart) {
        return response.data.newCart;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue("Không thể thêm vào giỏ hàng");
      }
      return thunkAPI.rejectWithValue("Không thể xác định lỗi");
    }
  }
);

//get cart

export const getCart = createAsyncThunk<
  Cart[],
  { userId: string },
  { rejectValue: string }
>("cart/getCart", async ({ userId }, thunkAPI) => {
  try {
    const response = await axios.get(`${cartUrl}/get_cart/${userId}`);
    if (response.data?.cart) {
      return response.data.cart;
    }
    return thunkAPI.rejectWithValue("Không tìm thấy đơn hàng");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Không thể lấy đơn hàng");
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định");
  }
});

//get cart for seller
export const getCartForSeller = createAsyncThunk<
  Cart[],
  { sellerId: string; typeProduct: string; page: number; limit: number },
  { rejectValue: string }
>(
  "cart/get_seller",
  async ({ sellerId, typeProduct, page, limit }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${cartUrl}/seller/${sellerId}?type=${typeProduct}&page=${page}&limit=${limit}`
      );
      if (response.data) {
        return response.data.store;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue("Khong lay gio hang cho seller duoc!");
      }
      return thunkAPI.rejectWithValue("Loi khong xac dinh");
    }
  }
);
