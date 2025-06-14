import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2023 Supersite, Powered by News API</p>
      <nav className="footer__nav">
        <div className="footer__links">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a
            href="https://practicum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            TripleTen
          </a>
        </div>
        <div className="footer__social">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
