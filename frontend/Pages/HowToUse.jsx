import React from 'react';
import { steps } from '../Assets/Mocks/steps.mock';
import SectionWrapper from './SectionWrapper';

const HowToUse = () => {

  return (
    <div className="py-12 text-center">
    <div className="how-to-work-container">
      <h2 className="text-3xl font-bold mb-6">How To Use</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{step.step}</div>
            <h2 className="step-title">{step.title}</h2>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SectionWrapper(HowToUse, "howtouse");