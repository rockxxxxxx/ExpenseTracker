import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authReducr";
import expenseSliceReducer from "./expenseReducer";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    addExpenses: expenseSliceReducer,
  },
});
