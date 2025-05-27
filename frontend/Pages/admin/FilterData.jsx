import React, { useState, useEffect, useRef } from "react";

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
  const [openDropdown, setOpenDropdown] = useState(null);
  const selectRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown &&
        selectRefs.current[openDropdown] &&
        !selectRefs.current[openDropdown].contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      value: [],
      options: chapters,
      name: "chapter",
      multiple: true,
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

  const handleSelect = (option, field) => {
    if (field.multiple) {
      const currentValues = Array.isArray(formData[field.name]) ? formData[field.name] : [];
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter((val) => val !== option.value)
        : [...currentValues, option.value];

      updateForm({
        target: {
          name: field.name,
          value: newValues,
        },
      });
    } else {
      updateForm({
        target: {
          name: field.name,
          value: option.value,
        },
      });
      setOpenDropdown(null);
    }
  };

  const removeChip = (valueToRemove, fieldName) => {
    const newValues = formData[fieldName].filter((val) => val !== valueToRemove);
    updateForm({
      target: {
        name: fieldName,
        value: newValues,
      },
    });
  };

  const renderSelect = (field) => {
    const isOpen = openDropdown === field.name;
    const selectedOptions = field.multiple
      ? field.options.filter((opt) => formData[field.name]?.includes(opt.value))
      : field.options.find((opt) => opt.value === formData[field.name]);

    if (!field.multiple) {
      // Default select for non-multiple
      return (
        <select name={field.name} value={formData[field.name]} onChange={updateForm}>
          <option value="">{field.label}</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    // Custom multi-select
    return (
      <div
        className="select-container multiselect-container"
        ref={(el) => (selectRefs.current[field.name] = el)}
      >
        <div
          className={`select-input multiselect-input ${isOpen ? "open" : ""}`}
          onClick={() => setOpenDropdown(isOpen ? null : field.name)}
        >
          {selectedOptions.length > 0 ? (
            <div className="select-chips">
              {selectedOptions.map((option) => (
                <div key={option.value} className="select-chip multiselect-chip">
                  <span className="select-chip-text">{option.label}</span>
                  <span
                    className="select-chip-remove multiselect-chip-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeChip(option.value, field.name);
                    }}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="select-placeholder multiselect-placeholder">
              {field.label}
            </span>
          )}
          <span className={`select-arrow ${isOpen ? "open" : ""}`} />
        </div>
        {isOpen && (
          <div className="select-dropdown multiselect-dropdown">
            {field.options.map((option) => (
              <div
                key={option.value}
                className={`select-option multiselect-option ${
                  formData[field.name]?.includes(option.value) ? "selected" : ""
                }`}
                onClick={() => handleSelect(option, field)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <h2 className="pricing-title">{title}</h2>
      <p className="pricing-subtitle">Select your preferences below to begin</p>
      <div className="form-container">
        {allFields.map((field) => (
          <div key={field.name} className="form-group">
            {renderSelect(field)}
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterData;
