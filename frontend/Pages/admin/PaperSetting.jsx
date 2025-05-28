import React from "react";
import "./pop.css";

const PaperSetting = ({ handleNextFromStep2, headerData, updateHeader, onBack }) => {
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 16 }}>
      <h2 className="pricing-title">Customize Exam Paper Header</h2>
      <p className="pricing-subtitle">Set the title and subtitle for your exam paper.</p>
      <form onSubmit={handleNextFromStep2} className="paper-form">
        <div className="form-group">
          <label htmlFor="title">
            Institute Name <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            value={headerData.title}
            onChange={updateHeader}
            placeholder="Enter full institute name"
          />
          <small style={{ color: '#888', marginTop: 4 }}>
            This will appear at the top of the paper.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="subtitle">
            Subtitle <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="subtitle"
            className="form-control"
            id="subtitle"
            value={headerData.subtitle}
            onChange={updateHeader}
            placeholder="e.g. Midterm Exam 2024"
          />
          <small style={{ color: '#888', marginTop: 4 }}>
            This will appear below the institute name.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="paperTime">
            Paper Time (in minutes) <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            name="paperTime"
            className="form-control"
            id="paperTime"
            value={headerData.paperTime}
            onChange={updateHeader}
            min="0"
            placeholder="Enter time in minutes"
          />
        </div>
        <hr style={{ margin: "1.5rem 0" }} />
        <h4 style={{ marginTop: "1.5rem", color: "#31B2A6" }}>Watermark Options</h4>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="WaterMark"
              id="WaterMark"
              checked={headerData.WaterMark}
              onChange={updateHeader}
            />
            Water Mark
          </label>
          <small style={{ color: '#888', marginTop: 4 }}>
            Enable to add a watermark to the paper.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="WaterMarkText">
            Water Mark Text
          </label>
          <input
            type="text"
            name="WaterMarkText"
            className="form-control"
            id="WaterMarkText"
            value={headerData.WaterMarkText}
            onChange={updateHeader}
            placeholder="Enter water mark text"
            disabled={!headerData.WaterMark}
          />
          <small style={{ color: '#888', marginTop: 4 }}>
            This text will appear as a watermark on the paper.
          </small>
        </div>
      </form>
    </div>
  );
};

export default PaperSetting;
