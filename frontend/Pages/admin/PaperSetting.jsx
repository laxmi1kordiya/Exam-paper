import React from "react";
import "./pop.css";

const PaperSetting = ({
  handleNextFromStep2,
  headerData,
  updateHeader,
  onBack,
}) => {
  return (
    <>
      <h2 className="pricing-title">Customize Exam Paper Header</h2>
      <p className="pricing-subtitle">
        Set the title and subtitle for your exam paper.
      </p>
      <form onSubmit={handleNextFromStep2} className="paper-form" style={{gap:"50px"}}>
        <div style={{ display: "flex", flexDirection: "row",alignItems:"end",gap:"20px" }}>
          <div className="form-group">
            <label htmlFor="title">Institute Name</label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              value={headerData.title}
              onChange={updateHeader}
              placeholder="Enter institute name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="subtitle">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              className="form-control"
              id="subtitle"
              value={headerData.subtitle}
              onChange={updateHeader}
              placeholder="Enter subtitle"
            />
          </div>
          <div className="form-group">
            <label htmlFor="paperTime">Paper Time <span style={{fontSize:"10px"}}>(in minutes)</span></label>
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
        </div>
        <div style={{ display: "flex", flexDirection: "row" ,alignItems:"end",gap:"20px"}}>
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
          </div>
          {headerData.WaterMark && (
            <div className="form-group">
              <label htmlFor="WaterMarkText">Water Mark Text</label>
              <input
                type="text"
                name="WaterMarkText"
                className="form-control"
                id="WaterMarkText"
                value={headerData.WaterMarkText}
                onChange={updateHeader}
                placeholder="Enter water mark text"
              />
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default PaperSetting;
