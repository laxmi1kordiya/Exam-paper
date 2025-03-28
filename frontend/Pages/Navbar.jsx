import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../Assets/Mocks/navLink.mock"; // Importing mock data
// import "./Navbar.css"; // Import CSS file

const Navbar = () => {
  return (
    <nav className="header">
      {/* Logo */}
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>

      {/* Navigation Links */}
      <ul className="nav">
        {navLinks.map((item) => (
          <li key={item.id}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>

      {/* Login Button */}
      <Link to="/login">
        <button className="login-btn">Login</button>
      </Link>
    </nav>
  );
};

export default Navbar;

