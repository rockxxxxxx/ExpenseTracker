import React, { useContext, useState } from "react";

import useFormValidator from "../../hooks/useFormValidator";
import Card from "../cards/Card";

import { ToasterContext } from "../context/toasterContext";
import Loader from "../loader/Loader";
import Toast from "../toast/Toast";
import "../login/login.css";

const emailValidator = (value) => value.includes("@");

export default function ForgotPassword({ reset }) {
  const [loader, setLoader] = useState(false);
  const { isMessage, setIsMessage, isToaster, setIsToaster } =
    useContext(ToasterContext);
  const [submitVisible, setSubmitVisible] = useState(true);
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useFormValidator(emailValidator);

  let formIsValid = false;
  if (emailIsValid) {
    formIsValid = true;
  }
  const formValue = {
    requestType: "PASSWORD_RESET",
    email: enteredEmail,
  };
  function onSubmitHandler(event) {
    setSubmitVisible(false);
    setLoader(true);
    event.preventDefault();
    if (formIsValid) {
      setLoader(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCJx5BaRP2wpkK7EusD5XYqdvO-F3eTyQs",
        {
          method: "POST",
          body: JSON.stringify(formValue),
          heders: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setSubmitVisible(true);
          setLoader(false);
          if (res.ok) {
            setIsMessage({
              message: "You have successfully Logged in",
              type: "success",
            });
            setIsToaster(true);
            emailReset();
            return res.json();
          } else {
            return res.json().then((data) => {
              setIsMessage({
                message: "Email or Password is wrong",
                type: "danger",
              });
              setIsToaster(true);
            });
          }
        })
        .then((data) => {
          localStorage.setItem("auth_token", data.idToken);
          localStorage.setItem("email", data.email);
        });
    } else {
      setSubmitVisible(true);
      setLoader(false);
      emailBlurHandler();
    }
  }

  return (
    <>
      <div className="container login">
        <Card title="Login">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
              <div id="login-error" className="form-text">
                {emailInputHasError && "Please enter a valid email address"}
              </div>
            </div>

            {submitVisible && (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
            {loader && <Loader />}
          </form>
        </Card>
        {isToaster && (
          <Toast message={isMessage.message} type={isMessage.type} />
        )}
      </div>
      <div
        className="mx-auto"
        style={{ textAlign: "center", paddingTop: "3rem" }}
      >
        <span className="border border-primary p-3">
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => reset(false)}
          >
            Click here
          </span>
          to login
        </span>
      </div>
    </>
  );
}
