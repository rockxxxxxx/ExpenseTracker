import React, { useContext, useEffect, useState } from "react";
import Card from "../cards/Card";
import { ExpenseDataContext } from "../context/expenseDataContext";
import { LoginContext } from "../context/loginContext";
import "./expense.css";
import ExpenseData from "./ExpenseData";

const addExpenses = (getExpense, am, desc, type, id) => {
  return [
    ...getExpense,
    {
      id: id,
      amount: am,
      description: desc,
      type: type,
    },
  ];
};

let loadedData = [];
function pushData(data) {
  for (const key in data) {
    loadedData.push({
      id: key,
      amount: data[key].amount,
      description: data[key].description,
      type: data[key].type,
    });
  }
}

export default function Expenses() {
  const { userEmail } = useContext(LoginContext);
  const { getExpense, setGetExpense } = useContext(ExpenseDataContext);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Please Select");

  const onSubmithandler = (event) => {
    const data = {
      amount,
      description,
      type,
    };
    event.preventDefault();

    fetch(
      `https://expnse-tracker-default-rtdb.firebaseio.com/${userEmail
        .split(".")
        .join("")}.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data.name);
          setGetExpense(
            addExpenses(getExpense, amount, description, type, data.name)
          );
        });
      } else {
        console.log("something went wrong");
      }
    });
  };

  useEffect(() => {
    loadedData = [];
    fetch(
      `https://expnse-tracker-default-rtdb.firebaseio.com/${userEmail
        .split(".")
        .join("")}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        pushData(data);
        setGetExpense(loadedData);
      });
  }, [userEmail]);

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
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getExpense.map((data) => {
                return (
                  <ExpenseData
                    amount={data.amount}
                    description={data.description}
                    type={data.type}
                    key={data.id}
                    id={data.id}
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
