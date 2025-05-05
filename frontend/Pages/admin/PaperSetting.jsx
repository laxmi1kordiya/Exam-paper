import React, { useEffect, useState, useCallback } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { navigate } from "../../Components/NavigationMenu";

const PaperSetting = () => {
  const fetch = useAuthenticatedFetch();
  const setNavigate = navigate();

  const [formData, setFormData] = useState({
    title: "Create Paper",
    subtitle: "Paper Generate by Create Paper",
    // WaterMark: false,
    // WaterMarkTaxt: "",
  });

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "formData");
    formData["userId"] = localStorage.getItem("userId");
    const res1 = await fetch.post("paperSetting", formData);
    console.log(res1, "res1");
    toast.success("Paper header updated successfully!");
    if (res1) {
      setNavigate("/admin/my-papers");
    }
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <div className="signin-box">
          <h3 className="text-center">Paper Header Settings</h3>
          <p className="text-center text-dark">
            Configure details for the exam paper
          </p>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subtitle">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  className="form-control"
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PaperSetting;
