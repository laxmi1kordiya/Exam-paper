import React, { useEffect, useState, useCallback } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaperSetting = () => {
  const fetch = useAuthenticatedFetch();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    logo: null,
    logoPreview: null,
  });

  const [logoError, setLogoError] = useState("");

  const fetchData = useCallback(async () => {
    const res = await fetch.get("getHeaderData");
    const data = res?.data;
    if (data) {
      setFormData(data);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

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
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 2 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setLogoError("Only JPG, JPEG, and PNG formats are allowed.");
        return;
      }

      if (file.size > maxSize) {
        setLogoError("File size must be less than or equal to 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result,
        }));
        setLogoError("");
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (logoError) return toast.error(logoError);
    formData["userId"] = localStorage.getItem("userId");
    console.log(formData,'formData')
    await fetch.post("paperSetting", formData);
    toast.success("Paper header updated successfully!");
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <div className="signin-box">
          <h3 className="text-center">Paper Header Settings</h3>
          <p className="text-center text-dark">
            Configure details for the exam paper
          </p>
          <form>
            <div className="row">
              <div className="form-group col-md-12">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="title"
                  placeholder="Enter Exam Title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="subtitle">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  className="form-control"
                  id="subtitle"
                  placeholder="Enter Subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="logo">Upload Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  id="logo"
                  onChange={handleLogoChange}
                />
                {logoError && (
                  <small className="text-danger">{logoError}</small>
                )}
                {formData.logoPreview && !logoError && (
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

            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PaperSetting;
