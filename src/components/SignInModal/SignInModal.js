import React, { useState, useEffect } from "react";
import "./SignInModal.css";

function SignInModal({ isOpen, onClose, onSignIn, openSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with email:", email);
    if (isFormValid) {
      console.log("About to call onSignIn function");
      onSignIn(email, password);
      // Clear the form fields
      setEmail("");
      setPassword("");
    }
  };

  // Clear form fields when modal is opened or closed
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

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
          <h2 className="modal__title">Sign in</h2>
          <form onSubmit={handleSubmit} className="modal__form">
            <label className="modal__label">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="modal__input"
                placeholder="Enter email"
                required
              />
            </label>
            <label className="modal__label">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="modal__input"
                placeholder="Enter password"
                required
              />
            </label>
            <button
              type="submit"
              className={`modal__submit ${
                !isFormValid ? "modal__submit_disabled" : ""
              }`}
              disabled={!isFormValid}
            >
              Sign in
            </button>
          </form>
          <p className="modal__signup-text">
            or{" "}
            <button className="modal__link" onClick={openSignUp}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
