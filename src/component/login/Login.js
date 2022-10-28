import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useFormValidator from "../../hooks/useFormValidator";
import Card from "../cards/Card";
import { LoginContext } from "../context/loginContext";
import { ToasterContext } from "../context/toasterContext";
import Loader from "../loader/Loader";
import Toast from "../toast/Toast";
import "./login.css";

const emailValidator = (value) => value.includes("@");
const passwordValidator = (value) => value.length > 6;

export default function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setJwtToken, setUserEmail, jwtToken } =
    useContext(LoginContext);
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

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJx5BaRP2wpkK7EusD5XYqdvO-F3eTyQs",
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
            passwordReset();
            navigate("/home");
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
          setJwtToken(data.idToken);
          setUserEmail(data.email);
          localStorage.setItem("auth_token", data.idToken);
          localStorage.setItem("email", data.email);
        });
    } else {
      setSubmitVisible(true);
      setLoader(false);
      emailBlurHandler();
      passwordBlurHandler();
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
      <div class="mx-auto" style={{ textAlign: "center", paddingTop: "3rem" }}>
        <span class="border border-primary p-3">
          Don't have an account? <NavLink to="/signup">Signup</NavLink>
        </span>
      </div>
    </>
  );
}
