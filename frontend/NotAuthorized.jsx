// src/Pages/NotAuthorized.jsx
import React from "react";

const NotAuthorized = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center", marginTop: "10rem" }}>
      <h1 style={{ fontSize: "2rem", color: "#e74c3c" }}>403 - Not Authorized</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default NotAuthorized;