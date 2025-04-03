import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      {/* Left Sidebar */}
      <NavbarAdmin />
      
      {/* Right Side Content */}
      <div className="admin-content">  
        <Outlet /> {/* This will load the component based on the route */}
      </div>
    </div>
  );
};

export default AdminLayout;
