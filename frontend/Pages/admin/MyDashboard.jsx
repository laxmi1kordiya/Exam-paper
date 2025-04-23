import React from "react";
import { useNavigate } from "react-router-dom";
import { blueprints, createPaper, headersetting, MyPapers } from "../../Assets";

const MyDashboard = () => {
  const navigate = useNavigate();

  const DashboardCard = ({ title, image, alt, destination }) => {
    const handleClick = () => {
      navigate(destination);
    };

    return (
      <div
        className="dashboard-card rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <div className="card-content">
          <img src={image} alt={alt} className="w-28 h-28 mb-6 object-contain" />
          <h2 className="text-2xl font-bold gradient-text">{title}</h2>
        </div>
      </div>
    );
  };

  return (
    <div className="content-page">
      <div className="min-h-screen flex flex-col items-center py-12">
        <h1 className="text-4xl font-extrabold gradient-text mb-10">My Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full px-6">
          <DashboardCard
            title="Create Paper"
            image={createPaper}
            alt="Create Question Paper Icon"
            destination="/admin/generate-paper"
          />
          <DashboardCard
            title="My Papers"
            image={MyPapers}
            alt="Question Papers Stack Icon"
            destination="/admin/my-papers"
          />
          <DashboardCard
            title="Paper Header Setting"
            image={headersetting}
            alt="Header Settings Icon"
            destination="/admin/paper-setting"
          />
          <DashboardCard
            title="Blueprints"
            image={blueprints}
            alt="Question Paper Blueprint Icon"
            destination="/admin/my-worksheets"
          />
        </div>
      </div>
    </div>
  );
};

export default MyDashboard; 