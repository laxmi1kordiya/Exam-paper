import React from "react";

const Header = () => {
  return (
    <div className="top-nav">
      <div className="nav-item">Question List</div>
      <div className="user-profile">
        <div className="notification-icon">🔔</div>
        <div className="user-info">
          <span>Yash</span>
          <span>Study</span>
        </div>
        <div className="user-avatar">👤</div>
      </div>
    </div>
  );
};

export default  Header
