import React, { useContext } from "react";
import { ExpenseDataContext } from "../context/expenseDataContext";
import { LoginContext } from "../context/loginContext";

export default function ExpenseData({ amount, description, type, id }) {
  const { getExpense, setGetExpense } = useContext(ExpenseDataContext);
  const { userEmail } = useContext(LoginContext);
  const EditExpense = (id1) => {
    alert(id1);
  };
  const DeleteExpense = (id1) => {
    fetch(
      `https://expnse-tracker-default-rtdb.firebaseio.com/${userEmail
        .split(".")
        .join("")}/${id1}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (response.ok) {
        const updatedGetItems = getExpense.filter((item) => item.id !== id1);
        setGetExpense(updatedGetItems);
      }
    });
  };
  return (
    <tr>
      <td>₹ {amount}</td>
      <td>{description}</td>
      <td>{type}</td>
      <td>
        <span onClick={() => EditExpense(id)}>Edit </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span onClick={() => DeleteExpense(id)}> Delete</span>
      </td>
    </tr>
  );
}
