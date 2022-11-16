import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permiumService: false,
};

const permiumServiceSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {
    activatePremium: (state, action) => {
      state.permiumService = true;
    },
  },
});

export default permiumServiceSlice.reducer;
export const { activatePremium } = permiumServiceSlice.actions;
