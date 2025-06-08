import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">NewsExplorer</h1>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/" className="header__nav-link">
              Home
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="/saved-news" className="header__nav-link">
              Saved articles
            </Link>
          </li>
        </ul>
      </nav>
      <button className="header__auth-button">Sign in</button>
    </header>
  );
}

export default Header;
