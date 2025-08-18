import React, { useState, useEffect } from "react";
import "../../styles/Modal.css";

function SignUpModal({ isOpen, onClose, onSignUp, openSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  useEffect(() => {
    setIsFormValid(
      email.trim() !== "" && password.trim() !== "" && username.trim() !== ""
    );
  }, [email, password, username]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    try {
      await onSignUp(email, password, username);
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      if (error.message.includes("email already in use")) {
        setSignUpError("This email is not available");
      } else {
        setSignUpError(error.message);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      setEmailError("");
      setSignUpError("");
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
          />
          <h2 className="modal__title">Sign up</h2>
          <form onSubmit={handleSubmit} className="modal__form">
            <label className="modal__label">
              Email
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="modal__input"
                placeholder="Enter email"
                required
              />
              {emailError && <span className="modal__error">{emailError}</span>}
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
            {signUpError && <span className="modal__error">{signUpError}</span>}
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
