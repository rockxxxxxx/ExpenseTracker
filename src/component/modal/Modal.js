import React, { useContext } from "react";
import { ModalContext } from "../context/modalContext";

export default function Modal({ children, title, isUpdated, isEditing }) {
  const { setIsModal, isModal } = useContext(ModalContext);
  const hideModal = () => {
    setIsModal(false);
  };

  const onEditing = () => {
    isEditing();
  };
  return (
    <>
      {(isModal || isUpdated) && (
        <div
          className="modal-dialog"
          style={{ width: "50%", margin: "auto", paddingBottom: "50px" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="staticBackdropLabel"
                onClick={onEditing}
              >
                {title}
              </h5>
              {!isUpdated && (
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={hideModal}
                ></button>
              )}
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
