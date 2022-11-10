import React from "react";

export default function ExpenseData({ amount, description, type }) {
  return (
    <tr>
      <td>₹ {amount}</td>
      <td>{description}</td>
      <td>{type}</td>
    </tr>
  );
}
