import React from 'react';
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Header.css";


function Header() {
  return (
    <header className='header'>
      <h1><NavLink to = "/" end>Lalitcodes.</NavLink></h1>
      <Navbar/>
      <NavLink to = "/getintouch" >
    <span class="material-symbols-outlined">
      identity_platform
    </span>
      </NavLink>
    </header>
  )
}

export default Header
