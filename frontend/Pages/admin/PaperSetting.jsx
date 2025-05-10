import React from "react";

const PaperSetting = ({ handleNextFromStep2, headerData, updateHeader }) => {
  return (
    <>
      <div className="header">
        <div className="title-container">
          <h2>Customize Exam Paper Header</h2>
          <p>Set the title and subtitle for your exam paper.</p>
        </div>
      </div>
      <form onSubmit={handleNextFromStep2}>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="title">Institute Name</label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              value={headerData.title}
              onChange={updateHeader}
              placeholder="Enter paper title"
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
            <label htmlFor="paperTime">Paper Time (in minute)</label>
            <input
              type="number"
              name="paperTime"
              className="form-control"
              id="paperTime"
              value={headerData.paperTime}
              onChange={updateHeader}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paperTime">Water Mark</label>
            <input
              type="checkbox"
              name="WaterMark"
              className="form-control"
              id="WaterMark"
              value={headerData.WaterMark}
              onChange={updateHeader}
            />
          </div>
          <div className="form-group">
            {headerData.WaterMark && (
              <>
                <label htmlFor="paperTime">Water Mark Text</label>
                <input
                  type="text"
                  name="WaterMarkTaxt"
                  className="form-control"
                  id="WaterMarkTaxt"
                  value={headerData.WaterMarkTaxt}
                  onChange={updateHeader}
                />
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default PaperSetting;
