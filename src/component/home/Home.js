import React, { useContext, useState } from "react";
import useFormValidator from "../../hooks/useFormValidator";
import { ModalContext } from "../context/modalContext";
import { ToasterContext } from "../context/toasterContext";
import Modal from "../modal/Modal";
import "./home.css";
import Loader from "../loader/Loader";
import axios from "axios";
import { LoginContext } from "../context/loginContext";
import Toast from "../toast/Toast";
import { json } from "react-router-dom";

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
  const [isUpdated, setIsUpdated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const onEdit = () => {
    setIsEditing(true);
  };

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
    setEnteredValue: setEnteredName,
  } = useFormValidator(nameValidator);

  const {
    value: enteredPhotoUrl,
    isValid: enteredPhotoUrlIsValid,
    hasError: enteredPhotoInputHasError,
    inputChangeHandler: photoUrlChangeHandler,
    onBlurHandler: photoBlurHandler,
    reset: photoUrlReset,
    setEnteredValue: setEnteredPhotoUrl,
  } = useFormValidator(photourlValidator);

  let formIsValid = false;
  if (enteresNameIsValid && enteredPhotoUrlIsValid) {
    formIsValid = true;
  }
  const formValue = {
    idToken: jwtToken,
    displayName: enteredName,
    photoUrl: enteredPhotoUrl,
    returnSecureToken: true,
  };

  const onSubmitHandler = (event) => {
    setSubmitVisible(false);
    setLoader(true);
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
      ).then((response) => {
        if (response.ok) {
          setIsUpdated(true);
          setIsModal(false);
          setLoader(false);
          setSubmitVisible(true);
          setIsToaster(true);
          setIsEditing(false);
          setIsMessage({
            message: "your profile is successfully update",
            type: "success",
          });
          response.json().then((data) => console.log(data));
        } else {
          setIsToaster(true);
          setIsMessage({
            message: "Something went wrong. Please try again later",
            type: "danger",
          });
        }
      });
    } else {
      setSubmitVisible(true);
      setLoader(false);
      console.log("not valid");
      nameBlurHandler();
      photoBlurHandler();
    }
  };

  const getData = {
    idToken: jwtToken,
  };

  useState(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCJx5BaRP2wpkK7EusD5XYqdvO-F3eTyQs",
      {
        method: "POST",
        body: JSON.stringify({ idToken: jwtToken }),
        heders: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setIsEmailVerified(data.users[0].emailVerified);
        if (
          data.users[0].displayName.length ||
          data.users[0].photoUrl.length > 0
        ) {
          setIsUpdated(true);

          setEnteredName(data.users[0].displayName);
          setEnteredPhotoUrl(data.users[0].photoUrl);
        }
      });
  }, []);

  const verifyEmailPayload = {
    requestType: "VERIFY_EMAIL",
    idToken: jwtToken,
  };
  const verifyEmailAddress = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCJx5BaRP2wpkK7EusD5XYqdvO-F3eTyQs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verifyEmailPayload),
      }
    );
  };

  return (
    <>
      {!isEmailVerified && (
        <div
          class="mx-auto"
          style={{ textAlign: "center", paddingTop: "3rem" }}
        >
          <span class="border border-primary p-3 ">
            Your email is not verified.{" "}
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => verifyEmailAddress()}
            >
              Verify it now!
            </span>
          </span>
        </div>
      )}
      {!isUpdated && (
        <div
          class="mx-auto"
          style={{ textAlign: "center", paddingTop: "3rem" }}
        >
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
      )}
      {isToaster && <Toast message={isMessage.message} type={isMessage.type} />}
      {(isModal || isUpdated) && (
        <Modal
          title={isUpdated ? "Edit Profile" : "Update Profile"}
          isUpdated={isUpdated}
          isEditing={() => {
            onEdit();
          }}
        >
          <form onSubmit={onSubmitHandler}>
            <fieldset disabled={isEditing || !isUpdated ? "" : "disabled"}>
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
            </fieldset>
          </form>
        </Modal>
      )}
    </>
  );
}
