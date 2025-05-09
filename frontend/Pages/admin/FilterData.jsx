import React, { useEffect, useState } from "react";

const FilterData = ({
  boards,
  standards,
  subjects,
  chapters,
  formData,
  updateForm,
  goToStep2,
}) => {
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    const { board, standard, subject, chapter, generateType } = formData;
    setAllFieldsFilled(
      board !== "" && standard !== "" && subject !== "" && chapter !== "" && generateType !== ""
    );
  }, [formData]);

  return (
    <>
      <div className="header">
        <div className="title-container">
          <h2>Generate Your Custom Question Paper</h2>
          <p>Select your preferences below to begin</p>
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

        { allFieldsFilled && (
          <button type="button" onClick={goToStep2} disabled={!allFieldsFilled}>
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default FilterData;