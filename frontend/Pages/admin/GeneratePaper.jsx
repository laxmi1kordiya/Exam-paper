import React from 'react';
import NavbarAdmin from './NavbarAdmin';
const GeneratePaper = () => {
  return (
    <>
    <NavbarAdmin />
    <div className="app-container">
      {/* Top Navigation */}
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

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="title-container">
            <h2>Generate Paper</h2>
            <p>Generate Paper of Your Choice</p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="steps-container">
          <div className="step active">
            <span className="step-number">1</span>
            <p>Select Board, Standard, Semester, Subject</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p>Manage Paper Details Date, Time, Difficulty</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <p>Choose Questions of Chapters & Subjects</p>
          </div>
        </div>

        {/* Board Selection */}
        <div className="board-selection">
          <div className="board-option active">
            <span className="board-text">GSEB-GUJ</span>
          </div>
          <div className="board-option">
            <span className="checkmark">✔</span>
            <span className="board-text">GSEB-ENG</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-container">
          <div className="form-group">
            <label>Standard</label>
            <select defaultValue="">
              <option value="" disabled>--Standard--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="form-group">
            <label>Semester</label>
            <select defaultValue="">
              <option value="" disabled>--Semester--</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div className="form-group">
            <label>Subject</label>
            <select defaultValue="">
              <option value="" disabled>--Subject--</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
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

        {/* Continue Button */}
        <div className="button-container">
          <button className="continue-button">Continue</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default GeneratePaper;