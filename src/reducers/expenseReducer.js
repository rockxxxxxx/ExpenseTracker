import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userExpense: [],
};

export const postExpense = createAsyncThunk("expense/postExpense", (data) => {
  const { userEmail, amount, description, type } = data;
  return axios
    .post(
      `https://expnse-tracker-default-rtdb.firebaseio.com/${userEmail
        .split(".")
        .join("")}.json`,
      {
        amount,
        description,
        type,
      }
    )
    .then((response) => response.data);
});

export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  (userEmail) => {
    return axios
      .get(
        `https://expnse-tracker-default-rtdb.firebaseio.com/${userEmail
          .split(".")
          .join("")}.json`
      )
      .then((response) => response.data);
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  (data) => {
    const { id1, userEmail } = data;
    return axios
      .delete(
        `https://expnse-tracker-default-rtdb.firebaseio.com/${userEmail
          .split(".")
          .join("")}/${id1}.json`
      )
      .then((response) => response.data);
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(postExpense.pending, () => {
      console.log("pending");
    });

    builder.addCase(postExpense.fulfilled, (state, action) => {
      const id = action.payload.name;
      const { amount, description, type } = action.meta.arg;
      state.userExpense = [
        ...state.userExpense,
        { id, amount, description, type },
      ];
    });

    builder.addCase(postExpense.rejected, () => {
      console.log("rejected");
    });

    builder.addCase(fetchExpense.fulfilled, (state, action) => {
      state.userExpense = [];
      if (action.payload !== null) {
        for (let [key, value] of Object.entries(action.payload)) {
          state.userExpense = [
            ...state.userExpense,
            {
              id: key,
              amount: value.amount,
              description: value.description,
              type: value.type,
            },
          ];
        }
      }
    });

    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      console.log(action.payload);
      const updatedGetItems = state.userExpense.filter(
        (item) => item.id !== action.meta.arg.id1
      );
      state.userExpense = updatedGetItems;
      console.log(action.meta.arg.id1);
    });
  },
});

export default expenseSlice.reducer;
