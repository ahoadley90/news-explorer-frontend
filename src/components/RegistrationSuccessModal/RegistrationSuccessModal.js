import React from "react";
import "./RegistrationSuccessModal.css";

function RegistrationSuccessModal({ isOpen, onClose, openSignIn }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__content">
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
          <h2 className="modal__title">Registration successfully completed!</h2>
          <button className="modal__link" onClick={openSignIn}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccessModal;
