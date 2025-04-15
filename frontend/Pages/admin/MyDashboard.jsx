import React from "react";

const MyDashboard = () => {
  const items = [
    { title: "Create Paper", icon: "generate-paper.png" }, // Replace with your icon paths
    { title: "My Papers", icon: "my-papers.png" },
    { title: "My Questions", icon: "my-questions.png" },
    { title: "Blueprints", icon: "blueprints.png" },
  ];

  return (
    <div className="content-page">
      <div className="dashboard">
        <div className="dashboard-items">
          {items.map((item, index) => (
            <div className="dashboard-item" key={index}>
              <img src={item.icon} alt={item.title} className="item-icon" />
              <div className="item-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
