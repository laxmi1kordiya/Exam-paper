import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../../Assets/Mocks/admin.mock";
import { FiMenu } from "react-icons/fi"; // hamburger icon

const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="navbar-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FiMenu />
      </div>

      <div className={`navbar-a ${isOpen ? "open" : ""}`}>
        <div className="navbar-logo-a">
          <span className="logo-text-a">ExamPaper</span>
        </div>
        <ul className="navbar-menu-a">
          {menuItems.map((item, index) => (
            <li key={index} className="navbar-item-a">
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsOpen(false)} // close menu on click
              >
                <span className="navbar-icon-a">{item.icon}</span>
                <span className="navbar-text-a">{item.name}</span>
                {item.isNew && <span className="new-badge-a">NEW</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavbarAdmin;
