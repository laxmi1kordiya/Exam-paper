import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { navLinks } from "../Assets/Mocks/navLink.mock";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openRegisterPage = () => {
    navigate("/signUp");
  };

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
      <div className="navbar-logo">
        <img alt="Company Logo" />
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {navLinks.map(({ id, title }) => (
          <li key={id}>
            <ScrollLink
              to={id}
              smooth={true}
              duration={500}
              offset={-70}
              onClick={() => setMenuOpen(false)}
              className="nav-link"
            >
              {title}
            </ScrollLink>
          </li>
        ))}
      </ul>

      <button className="navbar-register-btn" onClick={openRegisterPage}>
        Login/Register
      </button>
    </nav>
  );
};

export default Navbar;
