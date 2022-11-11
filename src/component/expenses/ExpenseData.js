import React, { useContext, useState } from "react";
import { ExpenseDataContext } from "../context/expenseDataContext";

import Modal from "react-bootstrap/Modal";
import { LoginContext } from "../context/loginContext";
import { ToasterContext } from "../context/toasterContext";
import Toast from "../toast/Toast";

export default function ExpenseData({
  amount,
  description,
  type,
  id,
  editHandler,
}) {
  const { onDelete, onRefreshDataLoad } = useContext(ExpenseDataContext);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const { userEmail } = useContext(LoginContext);
  const [editAmount, setEditAmount] = useState(amount);
  const [editDescription, setEditDescription] = useState(description);
  const [editType, setEditType] = useState(type);
  const { isToaster, setIsToaster, isMessage, setIsMessage } =
    useContext(ToasterContext);

  const handleClose = () => setShow(false);
  const EditExpense = (id1) => {
    setShow(true);
    setEditId(id1);
  };
  const DeleteExpense = (id1) => {
    onDelete(id1);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const patchData = {
      amount: editAmount,
      description: editDescription,
      type: editType,
    };
    fetch(
      `https://expnse-tracker-default-rtdb.firebaseio.com/${userEmail
        .split(".")
        .join("")}/${editId}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(patchData),
      }
    ).then((response) => {
      if (response.ok) {
        onRefreshDataLoad();
        setShow(false);
        setIsMessage({
          message: "your changes has been successfully saved",
          type: "success",
        });
        setIsToaster(true);
      }
    });
  };

  return (
    <>
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Expenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="row row-cols-lg-auto g-3 align-items-center"
            onSubmit={onSubmitHandler}
          >
            <div className="col-12">
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
                  value={editAmount}
                  onChange={(evnet) => {
                    setEditAmount(evnet.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-12">
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
                  value={editDescription}
                  onChange={(event) => {
                    setEditDescription(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="col-12">
              <label className="visually-hidden" htmlFor="inlineFormSelectPref">
                Expense Type
              </label>
              <select
                className="form-select"
                id="inlineFormSelectPref"
                name="type"
                value={editType}
                onChange={(event) => {
                  setEditType(event.target.value);
                }}
              >
                <option value={type}>{type}</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Movie">Movie</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>

            <div class="col-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {isToaster && show && (
        <Toast message={isMessage.message} type={isMessage.type} />
      )}
    </>
  );
}
