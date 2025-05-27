import React, { useState, useEffect, useRef } from "react";
import "./pop.css"; // Ensure this CSS file is in the same directory

const PaperData = ({
  boards,
  standards,
  subjects,
  chapters,
  formData,
  updateForm,
  type, // 'paper' or other types if applicable
  title,
}) => {
  // State for controlling the custom multi-select dropdown (for chapters)
  const [openDropdown, setOpenDropdown] = useState(null);
  const selectRefs = useRef({}); // Refs for custom dropdowns to detect outside clicks

  // States for managing the initial filter pop-up flow
  const [showInitialFilterPopup, setShowInitialFilterPopup] = useState(false);
  const [initialFiltersConfirmed, setInitialFiltersConfirmed] = useState(false);
  const popupRef = useRef(null); // Ref for the pop-up content to detect outside clicks

  // --- Effects ---

  // Effect to handle clicking outside custom multi-select dropdowns
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
  }, [openDropdown]);

  // Effect to determine if initial filters are already set in formData on mount or change
  useEffect(() => {
    if (formData.board && formData.standard && formData.subject) {
      setInitialFiltersConfirmed(true);
    } else {
      setInitialFiltersConfirmed(false);
    }
  }, [formData.board, formData.standard, formData.subject]);

  // Prevent popup from closing on outside click if it's open
  useEffect(() => {
    const handleClickOutsidePopup = (event) => {
      if (
        showInitialFilterPopup &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        // Do nothing, keep popup open
      }
    };
    document.addEventListener("mousedown", handleClickOutsidePopup);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePopup);
    };
  }, [showInitialFilterPopup]);

  // --- Field Definitions ---

  const baseFields = [
    {
      label: "--Select Board--",
      options: boards,
      name: "board",
    },
    {
      label: "--Select Standard--",
      options: standards,
      name: "standard",
    },
    {
      label: "--Select Subject--",
      options: subjects,
      name: "subject",
    },
  ];

  const paperFields = [
    {
      label: "--Select Chapter--",
      options: chapters,
      name: "chapter",
      multiple: true,
    },
    {
      label: "--Generate Type--",
      options: [
        { label: "Manually", value: "Manually" },
        { label: "Random", value: "Random" },
      ],
      name: "generateType",
    },
  ];

  // --- Helper Functions ---

  const getOptionLabel = (options, value) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : "";
  };

  const handleInitialSelectChange = (e) => {
    updateForm(e);
  };

  const handleConfirmInitialFilters = () => {
    if (formData.board && formData.standard && formData.subject) {
      setInitialFiltersConfirmed(true);
      setShowInitialFilterPopup(false);
    }
  };

  const handleOpenInitialFiltersPopup = () => {
    setShowInitialFilterPopup(true);
  };

  const handleCustomSelect = (option, field) => {
    if (field.multiple) {
      const currentValues = Array.isArray(formData[field.name])
        ? formData[field.name]
        : [];
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

  // --- Render Functions ---

  const renderSelectField = (field) => {
    if (!field.multiple) {
      return (
        <select
          name={field.name}
          value={formData[field.name] || ""}
          onChange={field.name === "generateType" ? updateForm : handleInitialSelectChange}
        >
          <option value="">{field.label}</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    const isOpen = openDropdown === field.name;
    const selectedOptions = field.options.filter((opt) =>
      formData[field.name]?.includes(opt.value)
    );

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
                onClick={() => handleCustomSelect(option, field)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // --- Main Component Render ---

  const initialSelectDisplayText = initialFiltersConfirmed
    ? `${getOptionLabel(boards, formData.board)} > ${getOptionLabel(standards, formData.standard)} > ${getOptionLabel(subjects, formData.subject)}`
    : "Please select Class & Subject.";

  const isOkButtonDisabled = !formData.board || !formData.standard || !formData.subject;

  return (
    <>
      <h2 className="pricing-title">{title}</h2>
      <p className="pricing-subtitle">Select your preferences below to begin</p>

      <div className="">
        {/* First Row: Class & Subject display field with Select/Edit button */}
        <div className="form-group initial-select-group">
          {/* <label className="initial-select-label">Class & Subject</label> */}
          <div className="initial-select-display-wrapper">
            <div className="initial-select-display">
              {initialSelectDisplayText}
            </div>
            <button
              className="initial-select-button"
              onClick={handleOpenInitialFiltersPopup}
            >
              {initialFiltersConfirmed ? "Edit" : "Select"}
            </button>
          </div>
          {/* {!initialFiltersConfirmed && (
            <p className="validation-message">
              Please select class & subject using select button above.
            </p>
          )} */}
        </div>

        {/* Second Row: Select Chapter (only if initial filters confirmed and popup closed) */}
        {type === "paper" && initialFiltersConfirmed && !showInitialFilterPopup && (
          <div className="form-group">
            <label className="form-label">Select Chapter</label>
            {renderSelectField(paperFields[0])}
          </div>
        )}

        {/* Third Row: Generate Type (only if initial filters confirmed and popup closed) */}
        {type === "paper" && initialFiltersConfirmed && !showInitialFilterPopup && (
          <div className="form-group">
            <label className="form-label">Generate Type</label>
            {renderSelectField(paperFields[1])}
          </div>
        )}

        {/* Initial Filter Pop-up */}
        {showInitialFilterPopup && (
          <div className="popup-overlay">
            <div className="popup-content" ref={popupRef}>
              <h3>Class & Subject</h3>
              <div className="filter-step">
                <div className="form-group">
                  {renderSelectField(baseFields[0])}
                </div>
                <div className="form-group">
                  {renderSelectField(baseFields[1])}
                </div>
                <div className="form-group">
                  {renderSelectField(baseFields[2])}
                </div>
                <button
                  onClick={handleConfirmInitialFilters}
                  disabled={isOkButtonDisabled}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaperData;