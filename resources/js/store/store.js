import { configureStore } from "@reduxjs/toolkit";
import studentSliceReducer from "../components/studentsSection/studentSlice";
import studyGroupSliceReducer from "../components/studyGroupsSection/studyGroupSlice";

const store = configureStore({
  reducer: {
    studentsSlice: studentSliceReducer,
    studyGroupSlice: studyGroupSliceReducer,
  },
});

export default store;
