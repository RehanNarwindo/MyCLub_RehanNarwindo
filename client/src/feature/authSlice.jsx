import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MyClubAPI from "../services/MyClubAPI";

export const postLogin = createAsyncThunk("auth/login", async (payload, {}) => {
  const respons = await MyClubAPI({
    url: "/login",
    method: "POST",
    data: payload,
  });

  return respons.data;
});
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    login: {},
    error: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
        localStorage.setItem("token", action.payload.access_token);
        localStorage.setItem("username", action.payload.username);
        state.error = false;
      })
      .addCase(postLogin.rejected, (status) => {
        state.loading = false;
        status.error = true;
      });
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
