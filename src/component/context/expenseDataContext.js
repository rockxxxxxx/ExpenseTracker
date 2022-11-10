import { createContext, useState } from "react";

export const ExpenseDataContext = createContext({
  getExpense: [],
  setGetExpense: () => {},
});

export const ExpenseDataProvider = ({ children }) => {
  const [getExpense, setGetExpense] = useState([]);
  const value = {
    getExpense,
    setGetExpense,
  };
  return (
    <ExpenseDataContext.Provider value={value}>
      {children}
    </ExpenseDataContext.Provider>
  );
};
