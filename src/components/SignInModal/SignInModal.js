import React, { useState, useEffect } from "react";
import "../../styles/Modal.css";

function SignInModal({ isOpen, onClose, onSignIn, openSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSignIn(email, password);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal__close" onClick={onClose}>
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
              required
            />
          </label>
          <button type="submit" className="modal__submit">
            Sign in
          </button>
        </form>
        <p className="modal__text">
          or{" "}
          <button className="modal__link" onClick={openSignUp}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignInModal;