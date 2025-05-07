import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from "./order.type";
const orderUrl = import.meta.env.VITE_ORDER_API;
const checkoutUrl = import.meta.env.VITE_CHECKOUT_API;
// lấy danh sách đơn hàng đã đặt
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
// lấy danh sách đơn hàng đã được mua theo id người bán
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

// xác nhận đơn hàng thủ công phía người bán
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

// lấy danh sách đơn hàng đã được mua và chờ vận chuyển
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

// thanh toán đơn hàng
export const checkoutOrder = createAsyncThunk<
  string,
  { amount: number; orderCode: number },
  { rejectValue: string }
>("order/checkout_order", async ({ amount, orderCode }, thunkAPI) => {
  try {
    const response = await axios.post(`${checkoutUrl}/create-payment-link`, {
      amount,
      orderCode,
    });
    if (!response.data.checkoutUrl) {
      return thunkAPI.rejectWithValue("Can not create payment link");
    }
    return response.data.checkoutUrl;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue("Có lỗi ở post!");
    }
    return thunkAPI.rejectWithValue("Lỗi không xác định!");
  }
});
