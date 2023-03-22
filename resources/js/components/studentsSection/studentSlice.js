import { createSlice } from "@reduxjs/toolkit";
import { fetchStudents } from "./fetchStudents";

const initialState = {
  students: [],
  students_count: 0,
  filtered_students: 0,
  page_links: [],
  total_page: 0,
  first_page: "",
  last_page: "",
  target_link: "http://localhost:8000/students",
  searchByNameState: "",
  status: "idle",
  error: null,
};

const checkIfIndexNotNegative = (target, active) => {
  if (active - target < 0) {
    return active - 1;
  } else {
    return active - target;
  }
};

const pageLinkTransforming = (links) => {
  if (links.length <= 7) {
    return links.slice(1, links.length - 1);
  } else {
    const onlyPages = links.slice(1, links.length - 1);
    const activeLinkIndex = onlyPages.findIndex((link) => link.active === true);
    const beforeActiveLink = onlyPages.slice(
      checkIfIndexNotNegative(2, activeLinkIndex),
      activeLinkIndex
    );
    const activeAndAfterActiveLink = onlyPages.slice(
      activeLinkIndex,
      activeLinkIndex + 3
    );

    const slicedLinks = [];
    beforeActiveLink.forEach((link) => slicedLinks.push(link));
    activeAndAfterActiveLink.forEach((link) => slicedLinks.push(link));

    const completedWithNavLinks = [];
    completedWithNavLinks.push(links[0]);
    slicedLinks.forEach((link) => completedWithNavLinks.push(link));
    completedWithNavLinks.push(links[links.length - 1]);

    return completedWithNavLinks;
  }
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
        state.page_links = pageLinkTransforming(action.payload.students.links);

        state.students = action.payload.students.data
          ? action.payload.students.data
          : action.payload.students;
        state.filtered_students = action.payload.students.total;
        state.students_count = action.payload.count;
        state.status = "succeeded";
        state.total_page = action.payload.students.last_page;
        state.first_page = action.payload.students.first_page_url;
        state.last_page = action.payload.students.last_page_url;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setLink, setSearchByName } = studentSlice.actions;

export default studentSlice.reducer;
