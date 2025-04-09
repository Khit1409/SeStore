import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DecodedUser, initialState } from "./type";
// Environment variables
// const authUrl = import.meta.env.VITE_AUTH_API;

/* ----------- Async Thunks ----------- */
// Kiểm tra xác thực
export const fetchAuth = createAsyncThunk<
  DecodedUser,
  void,
  { rejectValue: string }
>("auth/fetchAuth", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/auths/check`, {
      withCredentials: true,
    });
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
    const response = await axios.post(
      "http://localhost:5000/api/auths/login",
      formData,
      {
        withCredentials: true,
      }
    );

    // server trả về: { user, token }
    return response.data.user as DecodedUser;
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
      await axios.post(
        `http://localhost:5000/api/auths/logout`,
        {},
        { withCredentials: true }
      );
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
    address: string;
    fullname: string;
    birthday: string;
    avatar: string;
  },
  { rejectValue: string }
>("auth/register", async (formData, thunkAPI) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/auths/register`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data.user;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "lỗi servẻ"
      );
    }
    return thunkAPI.rejectWithValue("Đã xảy ra lôĩ không xác định ở register!");
  }
});

/* ----------- Slice ----------- */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // login
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticate = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ?? "Lỗi đăng nhập";
        state.isAuthenticate = false;
      })

      //register
      .addCase(register.pending, (state) => {
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload ?? "lỗi đăng ký";
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticate = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload ?? "Lỗi đăng xuất";
      })

      // fetchAuth
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticate = true;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload ?? "Không thể xác thực";
        state.isAuthenticate = false;
      });
  },
});

export default authSlice.reducer;
