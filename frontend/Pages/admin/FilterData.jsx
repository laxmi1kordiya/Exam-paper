import React from "react";

const FilterData = ({
  boards,
  standards,
  subjects,
  chapters,
  formData,
  updateForm,
  goToStep2,
}) => {
  return (
    <>
      <div className="header">
        <div className="title-container">
          <h2>Generate Paper</h2>
          <p>Generate Paper of Your Choice</p>
        </div>
      </div>

      <div className="form-container">
        {[
          {
            label: "--Select Board--",
            value: "",
            options: boards,
            name: "board",
          },
          {
            label: "--Select Standard--",
            value: "",
            options: standards,
            name: "standard",
          },
          {
            label: "--Select Subject--",
            value: "",
            options: subjects,
            name: "subject",
          },
          {
            label: "--Select Chapter--",
            value: "",
            options: chapters,
            name: "chapter",
          },
          {
            label: "--Generate Type--",
            value: "",
            options: [
              { label: "Manually", value: "Manually" },
              { label: "Random", value: "Random" },
            ],
            name: "generateType",
          },
        ].map(({ label, value, options, name }) => (
          <div key={name} className="form-group">
            <select name={name} value={formData[name]} onChange={updateForm}>
              <option value="">{label}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {formData.generateType === "Manually" && (
          <button type="button" onClick={goToStep2}>
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default FilterData;
