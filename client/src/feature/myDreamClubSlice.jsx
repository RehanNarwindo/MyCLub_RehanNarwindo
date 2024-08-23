import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyClubAPI from "../services/MyClubAPI";

export const fetchMyDreamClub = createAsyncThunk(
  "myDreamCLub/fetchMyDreamClub",
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const response = await MyClubAPI({
      url: "/myDreamClub",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data.data;
  }
);

export const myDreamCLubSLice = createSlice({
  name: "myDreamClub",
  initialState: {
    loading: false,
    MyDreamClub: {},
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyDreamClub.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchMyDreamClub.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, "test my dream");
        state.MyDreamClub = action.payload;
        state.error = false;
      })
      .addCase(fetchMyDreamClub.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default myDreamCLubSLice.reducer;
