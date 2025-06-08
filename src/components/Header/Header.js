import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__logo">NewsExplorer</h1>
        <nav className="header__nav">
          <Link to="/" className="header__nav-link header__nav-link_active">
            Home
          </Link>
          <Link to="/saved-news" className="header__nav-link">
            Saved articles
          </Link>
          <button className="header__button">Sign in</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
