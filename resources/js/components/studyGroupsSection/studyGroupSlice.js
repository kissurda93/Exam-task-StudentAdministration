import { createSlice } from "@reduxjs/toolkit";
import { fetchStudyGroups } from "./fetchStudyGroups";

const initialState = {
  studyGroups: [],
  studyGroups_count: 0,
  checkboxStates: {},
  status: "idle",
  error: null,
};

const groupsForFilter = (array) => {
  let object = {};
  array.map((item) => (object[item.name] = false));
  return object;
};

export const studyGroupSlice = createSlice({
  name: "studyGroups",
  initialState,
  reducers: {
    setCheckboxState: (state, action) => {
      state.checkboxStates[action.payload] =
        !state.checkboxStates[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudyGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudyGroups.fulfilled, (state, action) => {
        state.studyGroups = action.payload;
        state.studyGroups_count = action.payload.length;
        state.checkboxStates = groupsForFilter(action.payload);
        state.status = "succeeded";
      })
      .addCase(fetchStudyGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCheckboxState } = studyGroupSlice.actions;

export default studyGroupSlice.reducer;
