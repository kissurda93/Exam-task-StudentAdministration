import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStudents = createAsyncThunk(
  "students/getStudents",
  async (link) => {
    try {
      const response = await axios.get(link);
      return response.data;
    } catch (e) {
      console.warn(e);
    }
  }
);
