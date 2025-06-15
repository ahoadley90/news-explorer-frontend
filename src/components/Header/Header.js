import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import SignInModal from "../SignInModal/SignInModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal";
import logoutIcon from "../../images/logout.svg";

function Header({ isLoggedIn, onSignOut, userName, onSignIn, onSignUp }) {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleSignIn = async (email, password) => {
    try {
      await onSignIn(email, password);
      closeModal();
    } catch (error) {
      console.error("Sign in error in Header:", error);
      alert(`Sign in failed: ${error.message || "Unknown error occurred"}`);
    }
  };

  const handleSignUp = async (email, password, username) => {
    try {
      await onSignUp(email, password, username);
      setActiveModal("registrationSuccess");
    } catch (error) {
      console.error("Sign up error in Header:", error);
      alert(`Sign up failed: ${error.message || "Unknown error occurred"}`);
    }
  };

  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  return (
    <header className={`header ${isSavedNewsPage ? "header_saved-news" : ""}`}>
      <div className="header__content">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        <nav className="header__nav">
          <Link
            to="/"
            className={`header__nav-link ${
              !isSavedNewsPage ? "header__nav-link_active" : ""
            }`}
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/saved-news"
              className={`header__nav-link ${
                isSavedNewsPage ? "header__nav-link_active" : ""
              }`}
            >
              Saved articles
            </Link>
          )}
          {isLoggedIn ? (
            <button className="header__button" onClick={onSignOut}>
              {userName}
              <img
                src={logoutIcon}
                alt="Logout"
                className="header__logout-icon"
              />
            </button>
          ) : (
            <button
              className="header__button"
              onClick={() => openModal("signIn")}
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
      <SignInModal
        isOpen={activeModal === "signIn"}
        onClose={closeModal}
        onSignIn={handleSignIn}
        openSignUp={() => openModal("signUp")}
      />
      <SignUpModal
        isOpen={activeModal === "signUp"}
        onClose={closeModal}
        onSignUp={handleSignUp}
        openSignIn={() => openModal("signIn")}
      />
      <RegistrationSuccessModal
        isOpen={activeModal === "registrationSuccess"}
        onClose={closeModal}
        openSignIn={() => openModal("signIn")}
      />
    </header>
  );
}

export default Header;
