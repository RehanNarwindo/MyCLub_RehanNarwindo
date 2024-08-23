import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyClubAPI from "../services/MyClubAPI";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await MyClubAPI.get("/home/news");
  return response.data.data;
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    isLoading: false,
    news: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload;
        state.error = false;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default newsSlice.reducer;
