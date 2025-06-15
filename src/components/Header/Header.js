import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import SignInModal from "../SignInModal/SignInModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal";
import logoutIcon from "../../images/logout.svg";
import { auth } from "../../utils/firebase";

function Header({ isLoggedIn, onSignOut, userName, onSignIn, onSignUp }) {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isRegistrationSuccessModalOpen, setIsRegistrationSuccessModalOpen] =
    useState(false);

  const openSignInModal = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };

  const openSignUpModal = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const closeRegistrationSuccessModal = () => {
    setIsRegistrationSuccessModalOpen(false);
  };

  const handleSignIn = async (email, password) => {
    try {
      await onSignIn(email, password);
      closeSignInModal();
    } catch (error) {
      console.error("Sign in error in Header:", error);
      alert(`Sign in failed: ${error.message || "Unknown error occurred"}`);
    }
  };

  const handleSignUp = async (email, password, username) => {
    await onSignUp(email, password, username);
    closeSignUpModal();
    setIsRegistrationSuccessModalOpen(true);
  };

  const checkAuthState = () => {
    const currentUser = auth.currentUser;
    console.log(
      "Current auth state:",
      currentUser ? "Logged in" : "Logged out"
    );
    console.log(
      "Current user from Firebase:",
      JSON.stringify(currentUser, null, 2)
    );
    console.log("isLoggedIn prop:", isLoggedIn);
    console.log("userName prop:", userName);
    console.log("Full auth object:", JSON.stringify(auth, null, 2));
  };

  useEffect(() => {
    console.log("Header: isLoggedIn changed to", isLoggedIn);
    console.log("Header: userName changed to", userName);
  }, [isLoggedIn, userName]);

  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__logo">NewsExplorer</h1>
        <nav className="header__nav">
          <Link to="/" className="header__nav-link header__nav-link_active">
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/saved-news" className="header__nav-link">
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
            <button className="header__button" onClick={openSignInModal}>
              Sign in
            </button>
          )}
        </nav>
      </div>
      <button onClick={checkAuthState}>Check Auth State</button>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={closeSignInModal}
        onSignIn={handleSignIn}
        openSignUp={openSignUpModal}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={closeSignUpModal}
        onSignUp={handleSignUp}
        openSignIn={openSignInModal}
      />
      <RegistrationSuccessModal
        isOpen={isRegistrationSuccessModalOpen}
        onClose={closeRegistrationSuccessModal}
        openSignIn={openSignInModal}
      />
    </header>
  );
}

export default Header;
