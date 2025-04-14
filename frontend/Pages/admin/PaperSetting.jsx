import React, { useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

const PaperSetting = () => {
  const fetch = useAuthenticatedFetch();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    studentName: "",
    standard: "",
    subject: "",
    totalMarks: "",
    obtainedMarks: "",
    date: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch.post("paperSetting", formData);
      alert("Form submitted successfully!");
    } catch (error) {
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="signin-box">
        <div className="sign-in-from">
          <h3 className="text-center">Exam Paper Settings</h3>
          <p className="text-center text-dark">
            Configure details for the exam paper
          </p>

          <form className="mt-4" style={{ padding: "20px" }}>
            <div className="row">
              {[
                {
                  label: "Title",
                  name: "title",
                  placeholder: "Enter Exam Title",
                },
                {
                  label: "Subtitle",
                  name: "subtitle",
                  placeholder: "Enter Subtitle",
                },
                {
                  label: "Student Name",
                  name: "studentName",
                  placeholder: "Enter Student Name",
                },
                {
                  label: "Standard",
                  name: "standard",
                  placeholder: "Enter Class/Standard",
                },
                {
                  label: "Subject",
                  name: "subject",
                  placeholder: "Enter Subject",
                },
                {
                  label: "Total Marks",
                  name: "totalMarks",
                  type: "number",
                  placeholder: "Enter Total Marks",
                },
                {
                  label: "Obtained Marks",
                  name: "obtainedMarks",
                  type: "number",
                  placeholder: "Enter Marks Obtained",
                },
                { label: "Date", name: "date", type: "date", placeholder: "" },
              ].map(({ label, name, type = "text", placeholder }) => (
                <div key={name} className="form-group">
                  <label htmlFor={name}>{label}</label>
                  <input
                    type={type}
                    name={name}
                    className="form-control"
                    id={name}
                    value={formData[name]}
                    placeholder={placeholder}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="form-group">
                <label htmlFor="logo">Upload Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  id="logo"
                  onChange={handleLogoChange}
                />
                {formData.logoPreview && (
                  <img
                    src={formData.logoPreview}
                    alt="Logo Preview"
                    style={{
                      marginTop: "10px",
                      width: "100px",
                      height: "auto",
                    }}
                  />
                )}
              </div>
            </div>

            <div className="sign-info text-center">
              <button
                type="submit"
                className="text-center"
                id="verify_button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaperSetting;
