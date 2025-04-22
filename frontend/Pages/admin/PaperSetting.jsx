import React, { useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    logo: null,
    logoPreview: null,
  });

  const [logoError, setLogoError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const validFormats = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file) {
      if (!validFormats.includes(file.type)) {
        setLogoError("Only JPG, JPEG, and PNG formats are allowed.");
        setFormData((prev) => ({
          ...prev,
          logo: null,
          logoPreview: null,
        }));
        return;
      }

      if (file.size > maxSize) {
        setLogoError("File size must be less than or equal to 2MB.");
        setFormData((prev) => ({
          ...prev,
          logo: null,
          logoPreview: null,
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result,
        }));
        setLogoError(""); // Clear error if valid
      };
      reader.readAsDataURL(file);
    } else {
      setLogoError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return toast.error("Please enter the Title.");
    if (!formData.subtitle.trim()) return toast.error("Please enter the Subtitle.");
    // if (!formData.studentName.trim()) return toast.error("Please enter the Student Name.");
    // if (!formData.standard.trim()) return toast.error("Please enter the Standard.");
    // if (!formData.subject.trim()) return toast.error("Please enter the Subject.");
    // if (!formData.totalMarks.trim()) return toast.error("Please enter the Total Marks.");
    // if (!formData.obtainedMarks.trim()) return toast.error("Please enter the Obtained Marks.");
    // if (!formData.date.trim()) return toast.error("Please select the Date.");
    if (logoError) return toast.error("Please fix the logo upload error before submitting.");

    try {
      console.log(formData,"formData");
      await fetch.post("paperSetting", formData);
      toast.success("Form submitted successfully!");
      setFormData({
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
    } catch (error) {
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <div className="signin-box">
          <h3 className="text-center">Paper Heaader Settings</h3>
          <p className="text-center text-dark">Configure details for the exam paper</p>

          <form className="mt-4" style={{ padding: "20px" }} onSubmit={handleSubmit}>
            <div className="row">
              {[
                { label: "Title", name: "title", placeholder: "Enter Exam Title" },
                { label: "Subtitle", name: "subtitle", placeholder: "Enter Subtitle" },
                // { label: "Student Name", name: "studentName", placeholder: "Enter Student Name" },
                // { label: "Standard", name: "standard", placeholder: "Enter Class/Standard" },
                // { label: "Subject", name: "subject", placeholder: "Enter Subject" },
                // { label: "Total Marks", name: "totalMarks", type: "number", placeholder: "Enter Total Marks" },
                // { label: "Obtained Marks", name: "obtainedMarks", type: "number", placeholder: "Enter Marks Obtained" },
                // { label: "Date", name: "date", type: "date", placeholder: "" },
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
                {logoError && <small className="text-danger">{logoError}</small>}
                {formData.logoPreview && !logoError && (
                  <img
                    src={formData.logoPreview}
                    alt="Logo Preview"
                    style={{ marginTop: "10px", width: "100px", height: "auto" }}
                  />
                )}
              </div>
            </div>

            <div className="sign-info text-center">
              <button type="submit" className="text-center" id="verify_button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PaperSetting;