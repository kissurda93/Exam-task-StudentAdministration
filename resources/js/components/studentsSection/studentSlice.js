import { createSlice } from "@reduxjs/toolkit";
import { fetchStudents } from "./fetchStudents";

const initialState = {
  students: [],
  students_count: 0,
  filtered_students: 0,
  page_links: [],
  target_link: "http://localhost:8000/students",
  searchByNameState: "",
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
    setSearchByName: (state, action) => {
      state.searchByNameState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.page_links = action.payload.students.links
          ? action.payload.students.links.slice(
              1,
              action.payload.students.links.length - 1
            )
          : [];
        state.students = action.payload.students.data
          ? action.payload.students.data
          : action.payload.students;
        state.filtered_students = action.payload.students.total;
        state.students_count = action.payload.count;
        state.status = "succeeded";
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setLink, setSearchByName } = studentSlice.actions;

export default studentSlice.reducer;
