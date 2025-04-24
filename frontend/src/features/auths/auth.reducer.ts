import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../type";
import {
  fetchAuth,
  getAccountForAdmin,
  login,
  logout,
  register,
} from "./auth.slice";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // login
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isAuthenticate = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ?? "Lỗi đăng nhập";
        state.isAuthenticate = false;
      })

      //register
      .addCase(register.pending, (state) => {
        state.users = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload ?? "lỗi đăng ký";
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.users = null;
        state.isAuthenticate = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload ?? "Lỗi đăng xuất";
      })

      // fetchAuth
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isAuthenticate = true;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.users = null;
        state.error = action.payload ?? "Không thể xác thực";
        state.isAuthenticate = false;
      })
      //get account
      .addCase(getAccountForAdmin.pending, (state) => {
        state.error = null;
        state.account = null;
      })
      .addCase(getAccountForAdmin.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(getAccountForAdmin.rejected, (state, action) => {
        state.error = action.payload ?? "Lỗi lấy danh sách acc";
        state.account = null;
      });
  },
});

export default authSlice.reducer;
export const { clearError } = authSlice.actions;
