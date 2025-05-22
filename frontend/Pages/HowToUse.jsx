import React from 'react';
import { steps } from '../Assets/Mocks/steps.mock';
import SectionWrapper from './SectionWrapper';
import { FaMobileAlt, FaGraduationCap, FaFileAlt } from 'react-icons/fa';

const HowToUse = () => {
  const getStepIcon = (stepNumber) => {
    switch (stepNumber) {
      case "Step 1":
        return <FaMobileAlt className="step-icon" />;
      case "Step 2":
        return <FaGraduationCap className="step-icon" />;
      case "Step 3":
        return <FaFileAlt className="step-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="how-to-use-section">
      <div className="how-to-use-container">
        <div className="section-header">
          <h2 className="section-title">How To Use</h2>
          <p className="section-subtitle">Follow these simple steps to generate your question papers</p>
        </div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number-container">
                <div className="step-number">{step.step}</div>
                <div className="step-icon-container">
                  {getStepIcon(step.step)}
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(HowToUse, "howtouse");