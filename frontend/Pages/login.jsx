import React, { useState } from "react";
import { navigate } from "../Components/NavigationMenu";
import { useAuthenticatedFetch } from "../Api/Axios";

const login = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
  });
  const [otpSend, setOtpSend] = useState(false);

  const setNavigate = navigate();
  const fetch = useAuthenticatedFetch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitNo = async () => {
    try {
      await fetch.post("login", formData);
      setOtpSend(true);
    } catch (error) {
      console.log(error);
    }
  };
  const submitLogin = async () => {
    try {
      await fetch.post("login", formData);
      setNavigate("/my-dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="logo">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="28" stroke="#FF6F61" strokeWidth="4" />
            <circle cx="30" cy="30" r="20" stroke="#4A90E2" strokeWidth="4" />
            <circle cx="30" cy="30" r="12" stroke="#F5A623" strokeWidth="4" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              fontSize="16"
              fontWeight="bold"
              fill="#333"
            >
              360°
            </text>
          </svg>
          <h2>360Exams Login</h2>
        </div>

        {/* Form */}
        {!otpSend && (
          <div className="login-form">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              // id="mobile"
              placeholder="ENTER MOBILE NUMBER"
              className="mobile-input"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <button type="button" className="otp-button" onClick={submitNo}>
              Send OTP
            </button>
          </div>
        )}

        {otpSend && (
          <div className="login-form">
            <label htmlFor="mobile">add otp</label>
            <input
              type="text"
              name="mobile"
              // id="mobile"
              placeholder="ENTER MOBILE NUMBER"
              className="mobile-input"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <button type="button" className="otp-button" onClick={submitLogin}>
              submit
            </button>
          </div>
        )}

        {/* Sign Up Link */}
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};
export default login;
