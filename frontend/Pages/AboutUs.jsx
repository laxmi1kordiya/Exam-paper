import React from "react";
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { FaLightbulb, FaStar, FaUsers, FaHandshake } from 'react-icons/fa';

const ValueItem = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="value-item"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Icon className="value-icon" />
    <h3>{title}</h3>
    <p>{description}</p>
  </motion.div>
);

const StatItem = ({ number, label }) => (
  <motion.div 
    className="stat-item"
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.span 
      className="stat-number"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      {number}
    </motion.span>
    <span className="stat-label">{label}</span>
  </motion.div>
);

const AboutUs = () => {
  const values = [
    {
      icon: FaLightbulb,
      title: "Innovation",
      description: "Constantly pushing boundaries to create better educational tools"
    },
    {
      icon: FaStar,
      title: "Excellence",
      description: "Committed to delivering the highest quality in everything we do"
    },
    {
      icon: FaUsers,
      title: "Accessibility",
      description: "Making quality education tools available to all educators"
    },
    {
      icon: FaHandshake,
      title: "Support",
      description: "Dedicated to helping educators succeed in their mission"
    }
  ];

  return (
    <div className="about-us-container">
      <motion.div 
        className="about-us-header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="about-us-label">About Us</span>
        <h1>Empowering Education Through Technology</h1>
      </motion.div>

      <div className="about-us-content">
        <motion.div 
          className="about-us-text"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mission-statement">
            <h2>Our Mission</h2>
            <p>
              At Exam Paper, we're revolutionizing the way educators create and manage assessments. 
              Our platform combines cutting-edge technology with educational expertise to provide 
              a seamless, efficient, and intelligent solution for generating high-quality exam papers.
            </p>
          </div>
          
          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              {values.map((value, index) => (
                <ValueItem key={index} {...value} />
              ))}
            </div>
          </div>

          <div className="impact-section">
            <h2>Our Impact</h2>
            <div className="impact-stats">
              <StatItem number="10K+" label="Educators Served" />
              <StatItem number="50K+" label="Papers Generated" />
              <StatItem number="95%" label="User Satisfaction" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(AboutUs, "about");
