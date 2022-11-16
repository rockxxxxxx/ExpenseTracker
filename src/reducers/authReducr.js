import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("auth_token");
const email = localStorage.getItem("email");

const initialState = {
  isLoggedIn: token === null ? false : true,
  jwtToken: token,
  userEmail: email,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.jwtToken = action.payload.jwtToken;
      state.userEmail = action.payload.userEmail;
    },
    logoutD: (state) => {
      state.isLoggedIn = false;
      state.jwtToken = "";
      state.userEmail = "";
      localStorage.clear();
    },
  },
});

export default authSlice.reducer;
export const { login, logoutD } = authSlice.actions;
