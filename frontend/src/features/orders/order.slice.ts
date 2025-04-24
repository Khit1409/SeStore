import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from "./order.type";
const orderUrl = import.meta.env.VITE_ORDER_API;
export const addToOrder = createAsyncThunk<
  Order,
  { cart_id: string },
  { rejectValue: string }
>("order/checkout", async ({ cart_id }, thunAPI) => {
  try {
    const response = await axios.put(`${orderUrl}/checkout_order/${cart_id}`);
    if (response.data) {
      return response.data.orders;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunAPI.rejectWithValue("Can not get your cart!");
    }
    return thunAPI.rejectWithValue("Can not know this error");
  }
});

export const getOrder = createAsyncThunk<
  Order[],
  { user_id: string },
  { rejectValue: string }
>("order/getOrder", async ({ user_id }, thunkAPI) => {
  try {
    const response = await axios.get(`${orderUrl}/get_order/${user_id}`);
    if (response.data) {
      return response.data.my_order;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      thunkAPI.rejectWithValue("Can not get your cart!");
    }
    return thunkAPI.rejectWithValue("Can not know this error!");
  }
});

export const getOrderForSeller = createAsyncThunk<
  Order[],
  { seller_id: string },
  { rejectValue: string }
>("order/get_order_seller", async ({ seller_id }, thunkAPI) => {
  try {
    const response = await axios.get(
      `${orderUrl}/get_order_to_seller/${seller_id}`
    );
    if (response.data) {
      return response.data.my_order;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      thunkAPI.rejectWithValue("Can not get your cart!");
    }
    return thunkAPI.rejectWithValue("Can not know this error!");
  }
});

export const submitOrder = createAsyncThunk<
  Order[],
  { order_id: string },
  { rejectValue: string }
>("order/submit", async ({ order_id }, thunkAPI) => {
  try {
    const result = await axios.put(`${orderUrl}/submit/${order_id}`);
    if (result.data) {
      return result.data.orders;
    }
    return thunkAPI.rejectWithValue("Không thể xác nhận");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("can not submit this order");
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định");
  }
});
export const getOrderConfirm = createAsyncThunk<
  Order[],
  { seller_id: string },
  { rejectValue: string }
>("order/seller_order", async ({ seller_id }, thunkAPI) => {
  try {
    const response = await axios.get(`${orderUrl}/seller_order/${seller_id}`);
    if (response.data) {
      return response.data.my_order;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      thunkAPI.rejectWithValue("Can not get your cart!");
    }
    return thunkAPI.rejectWithValue("Can not know this error!");
  }
});
