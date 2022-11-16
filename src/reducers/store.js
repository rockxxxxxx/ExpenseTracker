import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authReducr";
import expenseSliceReducer from "./expenseReducer";
import premiumServiceReducer from "./premiumServiceReducer";
import themeReducer from "./themeReducer";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    addExpenses: expenseSliceReducer,
    theme: themeReducer,
    premium: premiumServiceReducer,
  },
});
