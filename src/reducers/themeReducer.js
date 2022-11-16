import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  themeDefault: true,
};

const themSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.themeDefault = action.payload;
    },
  },
});

export default themSlice.reducer;
export const { changeTheme } = themSlice.actions;
