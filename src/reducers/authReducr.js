import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  jwtToken: "",
  userEmail: "",
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
    },
  },
});

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const { login, logoutD } = authSlice.actions;
