import React, { useContext, useState } from "react";
import useFormValidator from "../../hooks/useFormValidator";
import { ModalContext } from "../context/modalContext";
import { ToasterContext } from "../context/toasterContext";
import Modal from "../modal/Modal";
import "./home.css";
import Loader from "../loader/Loader";
import axios from "axios";
import { LoginContext } from "../context/loginContext";

var regex =
  /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
const nameValidator = (value) => value.length >= 2;
const photourlValidator = (value) => regex.test(value);
export default function Home() {
  const { isModal, setIsModal } = useContext(ModalContext);
  const [loader, setLoader] = useState(false);
  const { isMessage, setIsMessage, isToaster, setIsToaster } =
    useContext(ToasterContext);
  const [submitVisible, setSubmitVisible] = useState(true);
  const { jwtToken } = useContext(LoginContext);
  const completeProfileHandler = () => {
    setIsModal(true);
  };
  const {
    value: enteredName,
    isValid: enteresNameIsValid,
    hasError: enteredNameHasError,
    inputChangeHandler: nameChageHandler,
    onBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useFormValidator(nameValidator);

  const {
    value: enteredPhotoUrl,
    isValid: enteredPhotoUrlIsValid,
    hasError: enteredPhotoInputHasError,
    inputChangeHandler: photoUrlChangeHandler,
    onBlurHandler: photoBlurHandler,
    reset: photoUrlReset,
  } = useFormValidator(photourlValidator);

  let formIsValid = false;
  if (enteresNameIsValid && enteredPhotoUrlIsValid) {
    formIsValid = true;
  }
  const formValue = {
    displayName: enteredName,
    photoUrl: enteredPhotoUrl,
    returnSecureToken: true,
    idToken: jwtToken,
  };

  console.log(formValue);
  const onSubmitHandler = (event) => {
    setSubmitVisible(false);
    setLoader(true);
    event.preventDefault();
    event.preventDefault();
    if (formIsValid) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCJx5BaRP2wpkK7EusD5XYqdvO-F3eTyQs",
        {
          method: "POST",
          body: JSON.stringify(formValue),
          heders: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setLoader(false);
          setIsToaster(true);
          if (res.ok) {
            setIsMessage({
              message: "Your profile is successfully updated",
              type: "success",
            });
            setIsToaster(true);
            nameReset();
            photoUrlReset();
            setIsModal(false);
            submitVisible(true);
          } else {
            setIsMessage({
              message: "something went wrong. Please try again later",
              type: "danger",
            });
            setLoader(false);
            setIsToaster(true);
            submitVisible(true);
          }
        })
        .catch((error) => {
          setIsMessage({
            message: "something went wrong. Please try again later",
            type: "danger",
          });
          setLoader(false);
          setIsToaster(true);
          submitVisible(true);
        });
    } else {
      setSubmitVisible(true);
      setLoader(false);
      console.log("not valid");
      nameBlurHandler();
      photoBlurHandler();
    }
  };
  return (
    <>
      <div class="mx-auto" style={{ textAlign: "center", paddingTop: "3rem" }}>
        <span class="border border-primary p-3">
          Your profile is incomplete!{" "}
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={completeProfileHandler}
          >
            Complete it now
          </span>
        </span>
      </div>
      {isModal && (
        <Modal title="Update Profile">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                value={enteredName}
                onChange={nameChageHandler}
                onBlur={nameBlurHandler}
              />
              <div id="update-error" className="form-text">
                {enteredNameHasError && "Please enter a valid name"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="pfurl" className="form-label">
                Profile Photo URL
              </label>
              <input
                type="text"
                className="form-control"
                id="pfurl"
                value={enteredPhotoUrl}
                onChange={photoUrlChangeHandler}
                onBlur={photoBlurHandler}
              />
              <div id="update-error" className="form-text">
                {enteredPhotoInputHasError && "Please enter a valid url"}
              </div>
            </div>

            {submitVisible && (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
            {loader && <Loader />}
          </form>
        </Modal>
      )}
    </>
  );
}
