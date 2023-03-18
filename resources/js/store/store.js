import { configureStore } from "@reduxjs/toolkit";
import studentSliceReducer from "../components/studentsSection/studentSlice";

const store = configureStore({
  reducer: {
    studentsSlice: studentSliceReducer,
  },
});

export default store;
