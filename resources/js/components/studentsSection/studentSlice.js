import { createSlice } from "@reduxjs/toolkit";
import { fetchStudents } from "./fetchStudents";

const initialState = {
  students: [],
  students_count: 0,
  page_links: [],
  target_link: "http://localhost:8000/students",
  status: "idle",
  error: null,
};

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setLink: (state, action) => {
      state.target_link = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.page_links = action.payload.paginated.links.slice(
          1,
          action.payload.paginated.links.length - 1
        );
        state.students = action.payload.paginated.data;
        state.students_count = action.payload.count;
        state.status = "succeeded";
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setLink } = studentSlice.actions;

export default studentSlice.reducer;
