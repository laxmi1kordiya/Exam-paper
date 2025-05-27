import React from "react";
import { features } from "../Assets/Mocks/features.mock";
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";

const FeatureCard = ({ title, icon, description, bgColor, index }) => {
  return (
    <motion.div 
      className="feature-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
      }}
    >
      <div className="feature-icon" style={{ backgroundColor: bgColor }}>
        {icon}
      </div>
      <div className="feature-content">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <div className="features-section">
      <motion.div 
        className="features-header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="pricing-title">Our Amazing Features</h2>
        <p className="features-subtitle">Discover what makes our platform unique</p>
      </motion.div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            index={index}
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
