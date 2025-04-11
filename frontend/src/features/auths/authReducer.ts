import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../type";
import { fetchAuth, login, logout, register } from "./authSlice";

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
export const { clearError } = authSlice.actions;
