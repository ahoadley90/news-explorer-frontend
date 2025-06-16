import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import githubIcon from "../../images/github.svg";
import fbIcon from "../../images/fb.svg";

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
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            TripleTen
          </a>
        </div>
        <div className="footer__social">
          <a
            href="https://github.com/ahoadley90"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
          >
            <img
              src={githubIcon}
              alt="GitHub"
              className="footer__social-icon"
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
          >
            <img src={fbIcon} alt="Facebook" className="footer__social-icon" />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
