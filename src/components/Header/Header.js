import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import SignInModal from "../SignInModal/SignInModal";

function Header({ isLoggedIn, onSignOut, userName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignInClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSignIn = (email, password) => {
    // Implement sign-in logic here
    console.log("Sign in with:", email, password);
    setIsModalOpen(false);
  };

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
              {userName} (Sign out)
            </button>
          ) : (
            <button className="header__button" onClick={handleSignInClick}>
              Sign in
            </button>
          )}
        </nav>
      </div>
      <SignInModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSignIn={handleSignIn}
      />
    </header>
  );
}

export default Header;
