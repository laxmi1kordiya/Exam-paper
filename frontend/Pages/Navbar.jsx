import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { navLinks } from "../Assets/Mocks/navLink.mock";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openRegisterPage = () => {
    navigate("/signUp");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const handleNavClick = (id) => {
    if (id === "how-to-use") {
      navigate("/how-to-use");
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
        <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
      </div>
      
      <div className="navbar-logo" onClick={navigateToHome}>
        <span className="logo-icon">E</span>
        <span className="brand-name">ExamPaper</span>
      </div>

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ id, title }) => (
          <li key={id}>
            <div
              className="nav-link"
              onClick={() => handleNavClick(id)}
            >
              {title}
            </div>
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
