import React from 'react';
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Header.css";
import { FaEnvelope } from "react-icons/fa";
// import logo from "../../assets/png/png/LC.png";

function Header() {
  return (
    <header className='header'>
        {/* <img src={logo} alt="Lalitcodes logo" className="mobile-logo" /> */}

      <h1><NavLink to="/" end>Lalitcodes.</NavLink></h1>
      <Navbar/>
      <NavLink to="/getintouch" >
        <span className="material-symbols-outlined">
          <FaEnvelope/>
        </span>
      </NavLink>
    </header>
  )
}

export default Header
