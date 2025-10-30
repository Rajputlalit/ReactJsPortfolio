import { NavLink } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  return (
    <nav className="nav">
        <ul>
            <li><NavLink to = "/home" className={({isActive})=>(isActive ? "active-link" : " ")}>Home</NavLink></li>
            <li><NavLink to = "/about" className={({isActive})=>(isActive ? "active-link" : " ")} >About</NavLink></li>
            <li><NavLink to = "/skills" className={({isActive})=>(isActive ? "active-link" : " ")} >Skills</NavLink></li>
            <li><NavLink to = "/experience" className={({isActive})=>(isActive ? "active-link" : " ")} >Experience</NavLink></li>
            <li><NavLink to = "/projetcs" className={({isActive})=>(isActive ? "active-link" : " ")} >Projects</NavLink></li>
            {/* <li><NavLink to = "/notfound" >NotFound</NavLink></li> */}
        </ul>
    </nav>
  )
}

export default Navbar
