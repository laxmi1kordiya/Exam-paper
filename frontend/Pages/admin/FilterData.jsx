import React from "react";

const FilterData = ({
  boards,
  standards,
  subjects,
  chapters,
  formData,
  updateForm,
  type,
  title,
}) => {
  const baseFields = [
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
  ];

  const paperFields = [
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
  ];

  const allFields = type === "paper" ? [...baseFields, ...paperFields] : baseFields;

  return (
    <>
      <div className="header">
        <div className="title-container">
          <h2>{title}</h2>
          <p>Select your preferences below to begin</p>
        </div>
      </div>

      <div className="form-container">
        {allFields.map(({ label, options, name }) => (
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
      </div>
    </>
  );
};

export default FilterData;