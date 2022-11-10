import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import useFormValidator from "../../hooks/useFormValidator";
import Card from "../cards/Card";
import { ToasterContext } from "../context/toasterContext";
import Loader from "../loader/Loader";
import Toast from "../toast/Toast";
import "./signup.css";

const emailValidator = (value) => value.includes("@");
const passwordValidator = (value) => value.length > 6;

export default function Signup() {
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

  const {
    value: enteredPaasword,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useFormValidator(passwordValidator);

  const confirmPassValidator = (value) => enteredPaasword === value;

  const {
    value: confirmPaasword,
    isValid: confirmpasswordIsValid,
    hasError: confirmpasswordInputHasError,
    inputChangeHandler: confirmpasswordChangeHandler,
    onBlurHandler: confirmpasswordBlurHandler,
    reset: confirmpasswordReset,
  } = useFormValidator(confirmPassValidator);

  console.log(isMessage);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid && confirmpasswordIsValid && !loader) {
    formIsValid = true;
  }
  const formValue = {
    email: enteredEmail,
    password: enteredPaasword,
    returnSecureToken: true,
  };
  function onSubmitHandler(event) {
    setSubmitVisible(false);
    setLoader(true);
    event.preventDefault();
    if (formIsValid) {
      setLoader(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJx5BaRP2wpkK7EusD5XYqdvO-F3eTyQs",
        {
          method: "POST",
          body: JSON.stringify(formValue),
          heders: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setSubmitVisible(true);
        setLoader(false);
        if (res.ok) {
          setIsMessage({
            message: "You have successfully registered",
            type: "success",
          });
          setIsToaster(true);
          emailReset();
          passwordReset();
          confirmpasswordReset();
        } else {
          return res.json().then((data) => {
            if (data.error.message === "EMAIL_EXISTS") {
              setIsMessage({
                message: "This email is already registerd",
                type: "danger",
              });
              setIsToaster(true);
            } else {
              setIsMessage({
                message: "Something went wrong! Please again later",
                type: "danger",
              });
              setIsToaster(true);
            }
          });
        }
      });
    } else {
      setSubmitVisible(true);
      setLoader(false);
      console.log("not valid");
      emailBlurHandler();
      passwordBlurHandler();
    }
  }

  return (
    <>
      <div className="container signup">
        <Card title="Signup">
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
              <div id="signup-error" className="form-text">
                {emailInputHasError && "Please enter a valid email address"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={enteredPaasword}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
              />
              <div id="signup-error" className="form-text">
                {passwordInputHasError &&
                  "Please enter the password greater than 6 character"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirrm Password"
                value={confirmPaasword}
                onChange={confirmpasswordChangeHandler}
                onBlur={confirmpasswordBlurHandler}
              />
              <div id="signup-error" className="form-text">
                {confirmpasswordInputHasError && "Password not matched"}
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
          Already have an account? <NavLink to="/login">Login</NavLink>
        </span>
      </div>
    </>
  );
}
