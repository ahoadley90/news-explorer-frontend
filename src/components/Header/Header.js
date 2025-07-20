import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import SignInModal from "../SignInModal/SignInModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal";
import logoutIcon from "../../images/logout.svg";

function Header({
  isLoggedIn,
  onSignOut,
  userName,
  onSignIn,
  onSignUp,
  simulateLogin,
}) {
  const [activeModal, setActiveModal] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const openModal = (modalName) => {
    setActiveModal(modalName);
    setIsMenuOpen(false);
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
      throw error;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      if (window.innerWidth > 480) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`header ${isSavedNewsPage ? "header_saved-news" : ""} ${
        isMenuOpen ? "header_menu-open" : ""
      }`}
    >
      <div className="header__content">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        {isMobile && (
          <button className="header__menu-button" onClick={toggleMenu}>
            {isMenuOpen ? "✕" : "☰"}
          </button>
        )}
        <nav className={`header__nav ${isMenuOpen ? "header__nav_open" : ""}`}>
          <Link
            to="/"
            className={`header__nav-link ${
              !isSavedNewsPage ? "header__nav-link_active" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/saved-news"
              className={`header__nav-link ${
                isSavedNewsPage ? "header__nav-link_active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
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
        <button className="header__simulate-login" onClick={simulateLogin}>
          Simulate Login
        </button>
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
