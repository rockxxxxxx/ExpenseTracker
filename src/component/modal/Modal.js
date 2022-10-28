import React, { useContext } from "react";
import { ModalContext } from "../context/modalContext";

export default function Modal({ children, title }) {
  const { setIsModal } = useContext(ModalContext);
  const hideModal = () => {
    setIsModal(false);
  };
  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">
            {title}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={hideModal}
          ></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
