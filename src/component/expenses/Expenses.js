import React, { useContext, useEffect, useState } from "react";
import Card from "../cards/Card";
import { CSVLink, CSVDownload } from "react-csv";

import { ToasterContext } from "../context/toasterContext";
import Toast from "../toast/Toast";
import "./expense.css";
import ExpenseData from "./ExpenseData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchExpense, postExpense } from "../../reducers/expenseReducer";

export default function Expenses() {
  const { isToaster, isMessage } = useContext(ToasterContext);
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);
  console.log(userEmail);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const getExpense = useSelector((state) => state.addExpenses.userExpense);
  const expenseTotal = getExpense.reduce(
    (total, expenseAmount) => parseInt(total) + parseInt(expenseAmount.amount),
    0
  );

  const onSubmithandler = (event) => {
    const data = {
      userEmail,
      amount,
      type,
      description,
    };
    event.preventDefault();
    if (expenseTotal + parseInt(amount) <= 10000) {
      dispatch(postExpense(data));
    } else {
      console.log(expenseTotal + amount);
      alert(
        "You need a premium service for adding more than a total expense of ₹10,000"
      );
    }
  };
  const headers = [
    { label: "Amount", key: "amount" },
    { label: "Desctription", key: "description" },
    { label: "Type", key: "type" },
  ];

  const data = getExpense;

  console.log(useSelector((state) => state));

  useEffect(() => {
    //onRefreshDataLoad();
    dispatch(fetchExpense(userEmail));
  }, [userEmail, dispatch]);
  const premium = useSelector((state) => state.premium.permiumService);

  return (
    <>
      <div className="expenses">
        <Card title="Expenses">
          {premium && (
            <CSVLink data={data} headers={headers} filename="Expense">
              Download Your Report
            </CSVLink>
          )}
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

            <div className="col-3">
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
      {isToaster && <Toast message={isMessage.message} type={isMessage.type} />}
    </>
  );
}
