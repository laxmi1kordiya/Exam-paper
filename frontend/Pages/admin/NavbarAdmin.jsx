import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../../Assets/Mocks/admin.mock";
import { FiMenu, FiX } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";

const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="navbar-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMenu />}
      </div>

      <div className={`navbar-a ${isOpen ? "open" : ""}`}>
        <div className="navbar-logo-a">
            <span className="logo-icon">E</span><t></t>
            <span className="brand-name">ExamPaper</span>
        </div>
        
        <div className="nav-section">
          <ul className="navbar-menu-a">
            {menuItems.map((item, index) => (
              <li key={index} className="navbar-item-a">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="nav-link-content">
                    <span className="navbar-icon-a">{item.icon}</span>
                    <span className="navbar-text-a">{item.name}</span>
                  </div>
                  <div className="nav-link-arrow">
                    <FaChevronRight size={12} />
                  </div>
                  {item.isNew && <span className="new-badge-a">NEW</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarAdmin;
