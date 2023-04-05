import { createSlice } from "@reduxjs/toolkit";
import { fetchStudents } from "./fetchStudents";

const initialState = {
  students: [],
  students_count: 0,
  filtered_students: 0,
  page_links: [],
  total_page: 0,
  prev_page: "",
  next_page: "",
  first_page: "",
  last_page: "",
  target_link: "students",
  searchByNameState: "",
  status: "idle",
  error: null,
};

const pageLinkTransforming = (links) => {
  if (links.length <= 7) {
    return links.slice(1, links.length - 1);
  } else {
    const onlyPages = links.slice(1, links.length - 1);
    const length = onlyPages.length;

    const activeLinkIndex = onlyPages.findIndex((link) => link.active === true);
    let beforeActiveLink = [];
    let activeAndAfterActiveLink = [];

    switch (activeLinkIndex) {
      case 0:
        activeAndAfterActiveLink = onlyPages.slice(0, 5);
        break;

      case 1:
        beforeActiveLink = onlyPages.slice(0, 1);
        activeAndAfterActiveLink = onlyPages.slice(1, 5);
        break;

      case length - 1:
        beforeActiveLink = onlyPages.slice(length - 5, activeLinkIndex);
        activeAndAfterActiveLink = onlyPages.slice(activeLinkIndex);
        break;

      case length - 2:
        beforeActiveLink = onlyPages.slice(length - 5, activeLinkIndex);
        activeAndAfterActiveLink = onlyPages.slice(activeLinkIndex);
        break;

      default:
        beforeActiveLink = onlyPages.slice(
          activeLinkIndex - 2,
          activeLinkIndex
        );
        activeAndAfterActiveLink = onlyPages.slice(
          activeLinkIndex,
          activeLinkIndex + 3
        );
        break;
    }

    const slicedLinks = [];
    beforeActiveLink.forEach((link) => slicedLinks.push(link));
    activeAndAfterActiveLink.forEach((link) => slicedLinks.push(link));

    return slicedLinks;
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
        state.total_page = action.payload.students.last_page;
        state.first_page = action.payload.students.first_page_url;
        state.last_page = action.payload.students.last_page_url;
        state.prev_page = action.payload.students.prev_page_url;
        state.next_page = action.payload.students.next_page_url;
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
