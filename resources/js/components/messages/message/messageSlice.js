import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      if (!action.payload.type) {
        state.message = action.payload;
      } else {
        state.message = action.payload.message;
        state.type = action.payload.type;
      }
    },
    resetMessage: (state) => {
      state.message = initialState.message;
      state.type = initialState.type;
    },
  },
});

export const { setMessage, resetMessage } = messageSlice.actions;

export default messageSlice.reducer;
