import React from 'react';
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Header.css";
import { FaEnvelope } from "react-icons/fa";

function Header() {
  return (
    <header className='header'>
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
