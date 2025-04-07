import React, { useState } from "react";
import NavbarAdmin from "./NavbarAdmin";

const GeneratePaper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="main-content">
      <div className="header">
        <div className="title-container">
          <h2>Generate Paper</h2>
          <p>Generate Paper of Your Choice</p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="steps-container">
        {[1, 2, 3].map((stepNum) => (
          <div
            key={stepNum}
            className={`step ${currentStep === stepNum ? "active" : ""}`}
          >
            <span className="step-number">{stepNum}</span>
            {stepNum === 1 && <p>Select Board, Standard, Semester, Subject</p>}
            {stepNum === 2 && (
              <p>Manage Paper Details Date, Time, Difficulty</p>
            )}
            {stepNum === 3 && <p>Choose Questions of Chapters & Subjects</p>}
          </div>
        ))}
      </div>

      {/* Board Selection */}
      {currentStep === 1 && (
        <div className="board-selection">
          <div className="board-option active">
            <span className="board-text">GSEB-GUJ</span>
          </div>
          <div className="board-option">
            <span className="checkmark">✔</span>
            <span className="board-text">GSEB-ENG</span>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className="form-container">
          <div className="form-group">
            <label>Standard</label>
            <select defaultValue="">
              <option value="" disabled>
                --Standard--
              </option>
              <option value="11">Std 11</option>
              <option value="12">Std 12</option>
            </select>
          </div>
          <div className="form-group">
            <label>Semester</label>
            <select defaultValue="">
              <option value="" disabled>
                --Semester--
              </option>
              <option value="ALL">ALL</option>
              <option value="Sem 1">Sem 1</option>
              <option value="Sem 2">Sem 2</option>
            </select>
          </div>
          <div className="form-group">
            <label>Subject</label>
            <select defaultValue="">
              <option value="" disabled>
                --Subject--
              </option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Maths">Maths</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select defaultValue="ALL">
              <option value="ALL">ALL</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="form-container">
          <div className="form-group">
            <label>Paper Date</label>
            <input type="text" name="paperdate" value="07-04-2025" />
          </div>
          <div className="form-group">
            <label>Paper Type</label>

            <input type="text" name="paperType" value="Weekly" />
          </div>
          <div className="form-group">
            <label>Paper Difficulty</label>
            <select defaultValue="">
              <option value="" disabled>
                --Difficulty--
              </option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="form-container">
          <div className="form-group">
            <label>Select Chapter</label>
            <select defaultValue="">
              <option value="" disabled>
                --Chapter--
              </option>
              <option value="Chapter1">Chapter 1</option>
              <option value="Chapter2">Chapter 2</option>
              <option value="Chapter3">Chapter 3</option>
            </select>
          </div>
          <div className="form-group">
            <label>Generate Type</label>
            <select defaultValue="">
              <option value="" disabled>
                --Select--
              </option>
              <option value="Manually">Manually</option>
              <option value="Random">Random</option>
            </select>
          </div>
        </div>
      )}

      {/* Back Button */}
      {currentStep !== 1 && (
        <div className="button-container">
          <button
            className="continue-button"
            onClick={() => {
              if (currentStep !== 1) setCurrentStep(currentStep - 1);
            }}
          >
            Back
          </button>
        </div>
      )}
      {/* Continue Button */}
      {currentStep !== 3 && (
        <div className="button-container">
          <button
            className="continue-button"
            onClick={() => {
              if (currentStep < 3) setCurrentStep(currentStep + 1);
            }}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default GeneratePaper;
