// src/components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Lalit Rajput</h3>
        <p>Frontend Developer | ReactJS | AI-Driven Web Solutions</p>
        <div className="footer-links">
          <a href="https://github.com/lalit-rajput" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/lalit-rajput-950220216/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
          <a href="mailto:rajputlalitlr@gmail.com">
            <FaEnvelope />
          </a>
        </div>
        <p className="footer-note">
          © {new Date().getFullYear()} Lalit Rajput. All rights reserved. <br />
          Made with <FaHeart className="inline-heart" /> using React & AI-powered creativity.
        </p>
      </div>
    </footer>
  );
}
