import React from "react";
import {features} from "../Assets/Mocks/features.mock";
import SectionWrapper from "./SectionWrapper";

const FeatureCard = ({ title, icon, description, bgColor }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>
      <div className="feature-content">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="features-section">
      <div className="features-header">
        <h2 className="features-title">Our Amazing Features</h2>
        <p className="features-subtitle">Discover what makes our platform unique</p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            icon={feature.icon}
            description={feature.description}
            bgColor={feature.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Features, "features");
