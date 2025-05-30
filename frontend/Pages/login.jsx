import React, { useState } from "react";
import { navigate } from "../Components/NavigationMenu";
import { useAuthenticatedFetch } from "../Api/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPhone, FaLock } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
    password: "",
    mobileError: false,
  });
  const [otpSend, setOtpSend] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setNavigate = navigate();
  const fetch = useAuthenticatedFetch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          mobileError: false,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          mobileError: true,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitNo = async () => {
    if (formData.mobile.trim().length !== 10 || formData.mobileError) {
      toast.error("Please enter a valid Mobile Number.", {
        className: "toastify-custom-error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch.post("login", { mobile: formData.mobile });
      setOtpSend(true);
      toast.success("OTP sent successfully!", {
        className: "toastify-custom-success",
      });
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.", {
        className: "toastify-custom-error",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitLogin = async () => {
    if (showPasswordLogin) {
      if (!formData.password) {
        toast.error("Please enter your password.", {
          className: "toastify-custom-error",
        });
        return;
      }

      setIsSubmitting(true);
      try {
        if (formData.password === "0000") {
          toast.success("Login successful (via password)!", {
            className: "toastify-custom-success",
          });
          // localStorage.setItem("userId", res?.data?._id);
          setTimeout(() => {
            setNavigate("/admin/my-dashboard");
          }, 1500);
        } else {
          toast.error("Invalid password. Please try again.", {
            className: "toastify-custom-error",
          });
        }
      } catch (error) {
        toast.error("Login failed. Please try again.", {
          className: "toastify-custom-error",
        });
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      if (!formData.otp) {
        toast.error("Please enter the OTP.", {
          className: "toastify-custom-error",
        });
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await fetch.post("verify", {
          mobile: formData.mobile,
          otp: formData.otp,
        });

        if (res.code === 200 && res.data?.otp !== null) {
          toast.success("Login successful!", {
            className: "toastify-custom-success",
          });
          localStorage.setItem("userId", res?.data?._id);
          setTimeout(() => {
            setNavigate("/admin/my-dashboard");
          }, 1500);
        } else if (res.data?.otp === null && res.data?.otpExpiresAt === null) {
          toast.error("OTP has expired. Please request a new one.", {
            className: "toastify-custom-error",
          });
        } else {
          toast.error("Invalid OTP. Please try again.", {
            className: "toastify-custom-error",
          });
        }
      } catch (error) {
        toast.error("Login failed. Please try again.", {
          className: "toastify-custom-error",
        });
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const goToSignUp = () => {
    setNavigate("/signup");
  };

  const toggleLoginMethod = () => {
    setShowPasswordLogin((prev) => !prev);
    setOtpSend(false);
    setFormData((prev) => ({
      ...prev,
      otp: "",
      password: "",
    }));
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Login to access your ExamPaper account</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="text"
              name="mobile"
              id="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              disabled={otpSend}
            />
            {formData.mobileError && (
              <div className="error-message">Only digits allowed</div>
            )}
          </div>

          {showPasswordLogin ? (
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          ) : otpSend ? (
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="text"
                name="otp"
                id="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </div>
          ) : null}

          <button
            className="login-button"
            onClick={
              showPasswordLogin ? submitLogin : otpSend ? submitLogin : submitNo
            }
            disabled={isSubmitting}
          >
            {isSubmitting
              ? showPasswordLogin
                ? "Verifying..."
                : otpSend
                ? "Verifying..."
                : "Sending OTP..."
              : showPasswordLogin
              ? "Login with Password"
              : otpSend
              ? "Verify OTP"
              : "Send OTP"}
          </button>

          <div className="signup-redirect">
            <span onClick={toggleLoginMethod}>
              {showPasswordLogin
                ? "Login with OTP instead"
                : "Login with Password instead"}
            </span>
          </div>

          <div className="signup-redirect">
            Don't have an account? <span onClick={goToSignUp}>Sign Up</span>
          </div>
        </div>
      </div>

      <div className="login-image">
        <div className="image-content">
          <h2>Welcome to ExamPaper</h2>
          <p>Access your personalized exam paper dashboard</p>
          <ul>
            <li>View your exam papers</li>
            <li>Track your progress</li>
            <li>Manage your account</li>
            <li>Access premium features</li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;