import React, { useState } from "react";

const PaperSetting = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    studentName: "",
    standard: "",
    subject: "",
    totalMarks: "",
    obtainedMarks: "",
    date: "",
    logo: null,
    logoPreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Send this data to PDF generator or backend
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            Exam Form With Logo
          </h2>

          {[
            { label: "Title", name: "title" },
            { label: "Subtitle", name: "subtitle" },
            { label: "Student Name", name: "studentName" },
            { label: "Standard", name: "standard" },
            { label: "Subject", name: "subject" },
            { label: "Total Marks", name: "totalMarks", type: "number" },
            { label: "Obtained Marks", name: "obtainedMarks", type: "number" },
            { label: "Date", name: "date", type: "date" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontWeight: "bold" }}>
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginTop: "0.25rem",
                }}
              />
            </div>
          ))}

          {/* Logo Upload */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                fontWeight: "bold",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              Upload Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              style={{
                padding: "0.4rem 0",
                display: "block",
              }}
            />
            {formData.logoPreview && (
              <img
                src={formData.logoPreview}
                alt="Logo Preview"
                style={{ marginTop: "0.5rem", width: "100px", height: "auto" }}
              />
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaperSetting;
