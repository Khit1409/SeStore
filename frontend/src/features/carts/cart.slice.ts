import { createAsyncThunk } from "@reduxjs/toolkit";
import { Attributes } from "../products/productType";
import axios from "axios";
import { Cart } from "./cart.type";

const cartUrl = import.meta.env.VITE_CART_API;
const orderUrl = import.meta.env.VITE_ORDER_API;
//add to cart
export const addToCart = createAsyncThunk<
  Cart,
  {
    product_id: string;
    method_pay: string;
    attributes: Attributes[];
    quantity: number;
    address: string;
    user_id: string;
  },
  { rejectValue: string }
>(
  "cart/add_to_cart",
  async (
    { product_id, attributes, quantity, address, user_id, method_pay },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${orderUrl}/addtocart/${product_id}`, {
        user_id,
        address,
        attributes,
        method_pay,
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
  { user_id: string },
  { rejectValue: string }
>("cart/get_cart", async ({ user_id }, thunkAPI) => {
  try {
    const response = await axios.get(`${cartUrl}/get_cart/${user_id}`);
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

//fetch cart for place orer
export const getCartForDetail = createAsyncThunk<
  Cart,
  { cart_id: string },
  { rejectValue: string }
>("cart/get_pay", async ({ cart_id }, thunkAPI) => {
  try {
    const carts = await axios.get(`${cartUrl}/payment/${cart_id}`);
    if (carts.data) {
      return carts.data.cart_detail;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("can not get this cart!");
    }
    return thunkAPI.rejectWithValue("Can not know this error!");
  }
});
//cancel cart
export const cancelCart = createAsyncThunk<
  Cart[],
  { cart_id: string; user_id: string },
  { rejectValue: string }
>("cart/cancel", async ({ cart_id, user_id }, thunkAPI) => {
  try {
    const new_cart = await axios.delete(
      `${cartUrl}/cancel/${user_id}/${cart_id}`
    );
    if (new_cart.data) {
      return new_cart.data.carts;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Can not cancel this cart!");
    }
    return thunkAPI.rejectWithValue("Cancel successfully!");
  }
});
