import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../Assets/Mocks/navLink.mock"; 

const Navbar = () => {
  return (
    <nav className="header">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <ul className="nav">
        {navLinks.map((item) => (
          <li key={item.id}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
        <Link to="/SignUp">
         <button className="login-btn" >Register</button> 
        </Link>
    </nav>
  );
};

export default Navbar;

