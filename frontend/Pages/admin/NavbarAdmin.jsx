import React from 'react';
import { NavLink } from 'react-router-dom';
import { menuItems } from '../../Assets/Mocks/admin.mock';
import MyDashboard from './MyDashboard';

const NavbarAdmin = () => {

  return (
    <>
    <div className="navbar-a">
      <div className="navbar-logo-a">
        <span className="logo-text-a">360Exams</span>
      </div>
      <ul className="navbar-menu-a">
        {menuItems.map((item, index) => (
          <li key={index} className="navbar-item-a">
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <span className="navbar-icon-a">{item.icon}</span>
              <span className="navbar-text-a">{item.name}</span>
              {item.isNew && <span className="new-badge-a">NEW</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
    <MyDashboard />
    </>
  );
};

export default NavbarAdmin;