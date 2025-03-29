import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../Assets/Mocks/navLink.mock"; 
import { navigate } from "../Components/NavigationMenu";

const Navbar = () => {
  const setNavigate = navigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const openRegisterPage = useCallback(() => {
    setNavigate("/signUp");
  }, [navigate]);

  return (
    
    <nav className="navbar">
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
      <div className="navbar-logo">
        <img src="logo.png" alt="Company Logo" />
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {navLinks.map(({ id, path, title }) => (
          <li key={id}>
            <Link to={path}>{title}</Link>
          </li>
        ))}
      </ul>

      <button className="navbar-register-btn" onClick={openRegisterPage}>Register</button>

    </nav>
  );
};

export default Navbar;
