import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "../feature/newsSlice";
import myDreamClubSlice from "../feature/myDreamClubSlice";
import scheduleSlice from "../feature/scheduleSlice";
import authSlice from "../feature/authSlice";
import myClubSlice from "../feature/myClubSlice";

export const store = configureStore({
  reducer: {
    news: newsSlice,
    schedule: scheduleSlice,
    myDreamClub: myDreamClubSlice,
    auth: authSlice,
    myClub: myClubSlice,
  },
});
