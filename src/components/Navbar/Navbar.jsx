import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeAnd = (cb) => {
    // close mobile menu then do optional callback (NavLink will handle navigation)
    setIsOpen(false);
    if (typeof cb === "function") cb();
  };

  return (
    <nav className="nav-root">
      {/* Desktop nav (keeps your existing markup & active-link logic) */}
      <ul className={`nav ${isOpen ? "nav-hidden" : ""}`}>
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/skills" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Skills
          </NavLink>
        </li>
          <li>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/experience" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Experience
          </NavLink>
        </li>
      
      </ul>

      {/* Hamburger (visible only on mobile via CSS) */}
      <button
        className={`hamburger-btn ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((s) => !s)}
        aria-label="Toggle navigation"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* Mobile menu (slides in / uses same NavLink active classes) */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`} role="menu">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => closeAnd()}
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => closeAnd()}
        >
          About
        </NavLink>

        <NavLink
          to="/skills"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => closeAnd()}
        >
          Skills
        </NavLink>

        <NavLink
          to="/experience"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => closeAnd()}
        >
          Experience
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => closeAnd()}
        >
          Projects
        </NavLink>

        <NavLink
          to="/getintouch"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => closeAnd()}
        >
          Get in Touch
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
