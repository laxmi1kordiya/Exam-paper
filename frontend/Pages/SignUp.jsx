import React, { useState } from "react";
import { useAuthenticatedFetch } from "../Api/Axios";
import { navigate } from "../Components/NavigationMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    district: "",
    address: "",
    type: "",
    codel: "",
    gender: "",
    mobileError: false,
    codelError: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setNavigate = navigate();
  const fetch = useAuthenticatedFetch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" || name === "codel") {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          [`${name}Error`]: false,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [`${name}Error`]: true,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitData = async () => {
    let hasError = false;

    if (formData.name.trim().length < 3) {
      toast.error("Please enter a valid Name.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    } else if (formData.mobile.trim().length !== 10 || formData.mobileError) {
      toast.error("Please enter a valid Mobile Number.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    } else if (formData.type === "") {
      toast.error("Please select Type.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    } else if (formData.gender === "") {
      toast.error("Please select Gender.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    } else if (formData.district === "") {
      toast.error("Please select District.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    } else if (formData.address.trim().length < 5) {
      toast.error("Please enter a valid Address.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    } else if (
      formData.codel &&
      (formData.codel.length !== 6 || formData.codelError)
    ) {
      toast.error("Referral Code must be 6 digits.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    }

    if (!hasError) {
      setIsSubmitting(true);
      try {
        const res = await fetch.post("signUp", formData);
        localStorage.setItem("userId", res?.data?._id);

        toast.success("Registration Successful!", {
          className: "toastify-custom-success",
        });
        setFormData({
          name: "",
          mobile: "",
          district: "",
          address: "",
          type: "",
          codel: "",
          mobileError: false,
          codelError: false,
        });
        setTimeout(() => {
          setNavigate("/login");
        }, 1500);
      } catch (error) {
        setIsSubmitting(false);
        if (error.response?.status === 500) {
          toast.error(
            "This mobile number is already registered. Please use a different number.",
            {
              className: "toastify-custom-error",
            }
          );
        } else {
          toast.error("Registration failed, please try again later.", {
            className: "toastify-custom-error",
          });
          console.error("Frontend error:", error);
        }
      }
    }
  };

  const goToLogin = () => {
    setNavigate("/login");
  };

  return (
    <div className="login-container">
      <div className="signin-box">
        <div className="login-btn">
          <button type="button" id="verify_button" onClick={goToLogin}>
            Sign in
          </button>
        </div>
        <img
          src=""
          className="img-fluid"
          style={{ width: "100px" }}
          alt="Logo"
        />
        <div className="sign-in-from">
          <h3 className="text-center">Sign Up</h3>
          <p className="text-center text-dark">
            Register your account with ExamPaper
          </p>
          <form className="mt-4" style={{ padding: "20px" }}>
            <div className="row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Enter Name"
                  minLength="3"
                  maxLength="20"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  id="mobile"
                  placeholder="Enter Mobile Number"
                  minLength="10"
                  maxLength="10"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
                {formData.mobileError && (
                  <small className="text-warning errmob">
                    Enter Only Digits
                  </small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  className="form-control"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select--</option>
                  <option value="School">School</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Classes">Classes</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="type">Gender</label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="district">District</label>
                <select
                  className="form-control"
                  name="district"
                  id="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Select District--</option>
                  {[
                    "Ahmedabad",
                    "Amreli",
                    "Anand",
                    "Arvalli",
                    "Banaskantha",
                    "Bhavnagar",
                    "Botad",
                    "Chhotaudaipur",
                    "Devbhumi Dwarka",
                    "Dahod",
                    "Dang",
                    "Gandhinagar",
                    "Gir Somnath",
                    "Jamnagar",
                    "Junagadh",
                    "Kheda",
                    "Kachchh",
                    "Mahesana",
                    "Mahisagar",
                    "Morbi",
                    "Narmada",
                    "Navsari",
                    "Panchmahal",
                    "Patan",
                    "Porbandar",
                    "Rajkot",
                    "Surendranagar",
                    "Sabarkantha",
                    "Surat",
                    "Tapi",
                    "Vadodara",
                    "Valsad",
                    "Other",
                  ].map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  id="address"
                  placeholder="*your address"
                  minLength="5"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="sign-info text-center">
              <button
                type="button"
                id="verify_button"
                onClick={submitData}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
