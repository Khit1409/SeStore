import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DecodedUser } from "../type";
// Environment variables
const authUrl = import.meta.env.VITE_AUTH_API;

/* ----------- Async Thunks ----------- */
// Kiểm tra xác thực
export const fetchAuth = createAsyncThunk<
  DecodedUser,
  void,
  { rejectValue: string }
>("auth/fetchAuth", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${authUrl}/check`, {
      withCredentials: true,
    });
    const decoded = response.data.decoded;
    // kiểm tra sự tồn tại của token
    if (!decoded) {
      return thunkAPI.rejectWithValue("Token không hợp lệ hoặc đã hết hạn");
    }
    //return
    return response.data.decoded as DecodedUser;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Lỗi server"
      );
    }
    return thunkAPI.rejectWithValue("Đã xảy ra lỗi không xác định");
  }
});

// Đăng nhập
export const login = createAsyncThunk<
  DecodedUser, // Kết quả trả về
  { email: string; password: string }, // Dữ liệu truyền vào
  { rejectValue: string } // Lỗi trả về
>("auth/login", async (formData, thunkAPI) => {
  try {
    const response = await axios.post(`${authUrl}/login`, formData, {
      withCredentials: true,
    });

    // server trả về: { user, token }
    const res = response.data.user as DecodedUser;
    if (res) {
      return res;
    } else {
      return thunkAPI.rejectWithValue("Đăng nhập thất bại");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Lỗi server"
      );
    }
    return thunkAPI.rejectWithValue("Đã xảy ra lỗi không xác định");
  }
});

// Đăng xuất
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post(`${authUrl}/logout`, {}, { withCredentials: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.message || "Lỗi server"
        );
      }
      return thunkAPI.rejectWithValue("Lỗi khi đăng xuất");
    }
  }
);

//Đăng ký
export const register = createAsyncThunk<
  DecodedUser,
  {
    email: string;
    password: string;
    repassword: string;
    phone: string;
    role: string;
    fullname: string;
    avatar: string;
  },
  { rejectValue: string }
>("auth/register", async (formData, thunkAPI) => {
  try {
    const response = await axios.post(`${authUrl}/register`, formData, {
      withCredentials: true,
    });
    return response.data.user as DecodedUser;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "lỗi servẻ"
      );
    }
    return thunkAPI.rejectWithValue("Đã xảy ra lôĩ không xác định ở register!");
  }
});
