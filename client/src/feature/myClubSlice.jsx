import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyClubAPI from "../services/MyClubAPI";
import { act } from "react";

export const fetchMyClub = createAsyncThunk(
  "myClub/fetchMyClub",
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const respons = await MyClubAPI({
      url: "/myClub",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respons.data;
  }
);

export const deleteMyClub = createAsyncThunk(
  "myClub/deleteMyClub",
  async (myClubId, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const respons = await MyClubAPI({
      url: `/myClub/${myClubId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respons.data.message;
  }
);

export const searchClub = createAsyncThunk(
  "myClub/searchClub",
  async (search, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const respons = await MyClubAPI({
      url: `/myClub/search?search=${search}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respons.data;
  }
);

export const myClubSlice = createSlice({
  name: "myClub",
  initialState: {
    loading: false,
    myClub: {},
    error: false,
    deleteResponse: null,
    search: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyClub.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchMyClub.fulfilled, (state, action) => {
        state.loading = false;
        state.myClub = action.payload;
        state.error = false;
      })
      .addCase(fetchMyClub.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // DELETE
      .addCase(deleteMyClub.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteMyClub.fulfilled, (state, action) => {
        state.loading = false;
        state.myClub = {};
        state.deleteResponse = action.payload;
        state.error = false;
      })
      .addCase(deleteMyClub.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // SEARCH
      .addCase(searchClub.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchClub.fulfilled, (state, action) => {
        state.loading = false;
        state.search = action.payload;
        state.error = false;
      })
      .addCase(searchClub.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default myClubSlice.reducer;
