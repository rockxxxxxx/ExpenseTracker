import React, { useContext } from "react";
import { ToasterContext } from "../context/toasterContext";

export default function Toast({ message, type }) {
  const { setIsToaster } = useContext(ToasterContext);
  const onToasterClose = () => {
    setIsToaster(false);
  };
  return (
    <div
      className={`toast show align-items-center text-white bg-${type} border-0 position-absolute top-50 end-0`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div class="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white  me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={onToasterClose}
        ></button>
      </div>
    </div>
  );
}
