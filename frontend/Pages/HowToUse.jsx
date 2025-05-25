import React from 'react';
import { steps } from '../Assets/Mocks/steps.mock';
import SectionWrapper from './SectionWrapper';
import { FaMobileAlt, FaGraduationCap, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const StepCard = ({ step, title, description, icon: Icon, index }) => {
  // Extract just the number from the step string (e.g., "Step 1" -> "1")
  const stepNumber = step.split(' ')[1];

  return (
    <motion.div 
      className="step-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="step-number-container">
        <motion.div 
          className="step-number"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
        >
          {stepNumber}
        </motion.div>
        <motion.div 
          className="step-icon-container"
          initial={{ rotate: -180, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        >
          <Icon className="step-icon" />
        </motion.div>
      </div>
      <div className="step-content">
        <h3 className="step-title">{title}</h3>
        <p className="step-description">{description}</p>
      </div>
      {index < steps.length - 1 && (
        <motion.div 
          className="step-connector"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
        />
      )}
    </motion.div>
  );
};

const HowToUse = () => {
  const getStepIcon = (stepNumber) => {
    switch (stepNumber) {
      case "Step 1":
        return FaMobileAlt;
      case "Step 2":
        return FaGraduationCap;
      case "Step 3":
        return FaFileAlt;
      default:
        return FaMobileAlt;
    }
  };
  const location = useLocation();
  const path = location.pathname;

  return (
      <div className={path !== "/admin/how-to-use" ? "how-to-use-section" : ""}>
      <div className="how-to-use-container">
        <motion.div 
          className="how-to-use-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="pricing-title">How To Use</h2>
          <p className="features-subtitle">Follow these simple steps to generate your question papers</p>
        </motion.div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              index={index}
              step={step.step}
              title={step.title}
              description={step.description}
              icon={getStepIcon(step.step)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(HowToUse, "howtouse");