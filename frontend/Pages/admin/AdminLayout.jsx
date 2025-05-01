import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import Header from "./Header";

const AdminLayout = () => {
  return (
    <>
      <div className="admin-layout">
        <div className="admin-sidebar">
          <NavbarAdmin />
        </div>
        <div className="admin-content">
          <Header />
          <Outlet /> 
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
