import { configureStore } from "@reduxjs/toolkit";
import studentSliceReducer from "../components/studentsSection/studentSlice";
import studyGroupSliceReducer from "../components/studyGroupsSection/studyGroupSlice";
import messageSliceReducer from "../components/messages/message/messageSlice";

const store = configureStore({
  reducer: {
    studentsSlice: studentSliceReducer,
    studyGroupSlice: studyGroupSliceReducer,
    messageSlice: messageSliceReducer,
  },
});

export default store;
