import React, { useEffect, useState } from "react";
import Card from "../cards/Card";
import "./expense.css";
import ExpenseData from "./ExpenseData";

const addExpenses = (getExpense, am, desc, type) => {
  return [
    ...getExpense,
    {
      amount: am,
      description: desc,
      type: type,
    },
  ];
};

export default function Expenses() {
  const [getExpense, setGetExpense] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Please select");

  const onSubmithandler = (event) => {
    event.preventDefault();
    setGetExpense(addExpenses(getExpense, amount, description, type));
  };

  return (
    <>
      <div className="expenses">
        <Card title="Expenses">
          <form
            className="row row-cols-lg-auto g-3 align-items-center"
            onSubmit={onSubmithandler}
          >
            <div className="col-3">
              <label
                className="visually-hidden"
                htmlFor="inlineFormInputGroupUsername"
              >
                Amount
              </label>
              <div className="input-group">
                <div className="input-group-text">₹</div>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputGroupUsername"
                  placeholder="Amount"
                  name="amount"
                  value={amount}
                  onChange={(evnet) => {
                    setAmount(evnet.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-3">
              <label
                className="visually-hidden"
                htmlFor="inlineFormInputGroupUsername"
              >
                Description
              </label>
              <div className="input-group">
                <div className="input-group-text"></div>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputGroupUsername"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="col-3">
              <label className="visually-hidden" htmlFor="inlineFormSelectPref">
                Expense Type
              </label>
              <select
                className="form-select"
                id="inlineFormSelectPref"
                name="type"
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <option value={type}>{type}</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Movie">Movie</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>

            <div class="col-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <hr />
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">Description</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              {getExpense.map((data) => {
                return (
                  <ExpenseData
                    amount={data.amount}
                    description={data.description}
                    type={data.type}
                  />
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
