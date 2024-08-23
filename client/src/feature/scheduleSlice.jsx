import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MyClubAPI from "../services/MyClubAPI";

export const fetchSchedule = createAsyncThunk(
  "schedule/fetchSchedule",
  async () => {
    const response = await MyClubAPI.get("/home/schedule");
    return response.data.data.playDayMatches;
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    loading: false,
    schedule: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload;
        state.error = false;
      })
      .addCase(fetchSchedule.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default scheduleSlice.reducer;
