import React, { useState, useEffect } from "react";
import "./SignInModal.css";

function SignInModal({ isOpen, onClose, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSignIn(email, password);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="modal__input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="modal__input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
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
            or <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
