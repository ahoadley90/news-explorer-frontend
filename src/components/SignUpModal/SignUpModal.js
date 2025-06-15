import React, { useState, useEffect } from "react";
import "./SignUpModal.css";

function SignUpModal({ isOpen, onClose, onSignUp, openSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      email.trim() !== "" && password.trim() !== "" && username.trim() !== ""
    );
  }, [email, password, username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up attempted with:", email, password, username);
    if (isFormValid) {
      onSignUp(email, password, username);
      // Clear the form fields
      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  // Clear form fields when modal is opened or closed
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
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
          <h2 className="modal__title">Sign up</h2>
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
            <label className="modal__label">
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="modal__input"
                placeholder="Enter your username"
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
              Sign up
            </button>
          </form>
          <p className="modal__text">
            or{" "}
            <button className="modal__link" onClick={openSignIn}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
