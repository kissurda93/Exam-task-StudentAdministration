import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStudyGroups = createAsyncThunk(
  "studyGroups/getStudyGroups",
  async () => {
    try {
      const response = await axios.get("/studyGroups");
      return response.data;
    } catch (e) {
      console.warn(e);
    }
  }
);
