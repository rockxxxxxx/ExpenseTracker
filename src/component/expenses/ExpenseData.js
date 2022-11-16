import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ToasterContext } from "../context/toasterContext";
import Toast from "../toast/Toast";
import del from "../../delete.png";
import edit from "../../edit.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, fetchExpense } from "../../reducers/expenseReducer";

export default function ExpenseData({
  amount,
  description,
  type,
  id,
  editHandler,
}) {
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");

  const [editAmount, setEditAmount] = useState(amount);
  const [editDescription, setEditDescription] = useState(description);
  const [editType, setEditType] = useState(type);
  const { isToaster, setIsToaster, isMessage, setIsMessage } =
    useContext(ToasterContext);

  const userEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();
  const getExpense = useSelector((state) => state.addExpenses.userExpense);
  const expenseTotal =
    getExpense.reduce(
      (total, expenseAmount) =>
        parseInt(total) + parseInt(expenseAmount.amount),
      0
    ) - parseInt(amount);

  const handleClose = () => setShow(false);
  const EditExpense = (id1) => {
    setShow(true);
    setEditId(id1);
  };
  const DeleteExpense = (id1) => {
    //onDelete(id1);
    const data = { id1, userEmail };
    dispatch(deleteExpense(data));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const patchData = {
      amount: editAmount,
      description: editDescription,
      type: editType,
    };
    if (expenseTotal + parseInt(editAmount) <= 10000) {
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
          dispatch(fetchExpense(userEmail));
          setShow(false);
          setIsMessage({
            message: "your changes has been successfully saved",
            type: "success",
          });
          setIsToaster(true);
        }
      });
    } else {
      alert(
        "You need a premium service for adding more than a total expense of ₹10,000"
      );
    }
  };

  return (
    <>
      <tr>
        <td>₹ {amount}</td>
        <td>{description}</td>
        <td>{type}</td>
        <td>
          <span onClick={() => EditExpense(id)} style={{ cursor: "pointer" }}>
            <img src={edit} alt="Edit" style={{ backgroundColor: "white" }} />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span onClick={() => DeleteExpense(id)} style={{ cursor: "pointer" }}>
            {" "}
            <img src={del} alt="Delete" style={{ backgroundColor: "white" }} />
          </span>
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
