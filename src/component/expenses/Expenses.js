import React, { useContext, useEffect } from "react";
import Card from "../cards/Card";
import { ExpenseDataContext } from "../context/expenseDataContext";
import { LoginContext } from "../context/loginContext";
import { ToasterContext } from "../context/toasterContext";
import Toast from "../toast/Toast";
import "./expense.css";
import ExpenseData from "./ExpenseData";

export default function Expenses() {
  const { userEmail } = useContext(LoginContext);
  const { isToaster, isMessage } = useContext(ToasterContext);
  const {
    getExpense,
    amount,
    setAmount,
    description,
    setDescription,
    type,
    setType,
    addExpense,
    onRefreshDataLoad,
  } = useContext(ExpenseDataContext);

  const onSubmithandler = (event) => {
    event.preventDefault();
    addExpense();
  };

  useEffect(() => {
    onRefreshDataLoad();
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
      {isToaster && <Toast message={isMessage.message} type={isMessage.type} />}
    </>
  );
}
