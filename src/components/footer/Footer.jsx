// src/components/Footer/Footer.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaFileAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Column 1: Brand + Address */}
        <div className="footer-col footer-brand">
          <h1 className="footer-logo">Lalitcodes.</h1>
          <div className="address">
            <FaMapMarkerAlt className="address-icon" />
            <p>
              H. No. 48, Block-E, Jindal Industries, Staff Colony,
              <br />
              New Model Town Extension, Hisar, Haryana 125001
              <br />
              <strong>Landmark:</strong> Jindal Industries Pvt. Ltd., Hisar
            </p>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-col">
          <h3>Explore</h3>
          <ul>
            <li>
              <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/skills" className={({ isActive }) => (isActive ? "active" : "")}>
                Skills
              </NavLink>
            </li>
            <li>
              <NavLink to="/experience" className={({ isActive }) => (isActive ? "active" : "")}>
                Experience
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
                Projects
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Column 3: Tech Stack */}
        <div className="footer-col">
          <h3>Tech Stack</h3>
          <ul>
            <li>ReactJS</li>
            <li>Three.js</li>
            <li>Swiper.js</li>
            <li>React Router</li>
            <li>HTML5 & CSS3</li>
            <li>JavaScript (ES6+)</li>
            <li>VS Code</li>
          </ul>
        </div>

        {/* Column 4: Resources */}
        <div className="footer-col">
          <h3>Resources</h3>
          <button
            className="resume-btn"
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            <FaFileAlt /> View Resume
          </button>
          <NavLink to="/getintouch" className="contact-link">
            <FaEnvelope /> Get In Touch
          </NavLink>
          
        </div>
        
      </div>
       <p className="footer-note">
        © {new Date().getFullYear()} Lalit Rajput. All rights reserved.
        &nbsp;Made with <FaHeart className="inline-heart" /> using ReactJs.
      </p>
    </footer>
  );
}
