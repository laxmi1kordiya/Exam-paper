import React, { useState } from "react";
import { useAuthenticatedFetch } from "../Api/Axios";
import { navigate } from "../Components/NavigationMenu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaPhone, FaMapMarkerAlt, FaVenusMars, FaBuilding, FaLock } from "react-icons/fa";

const SignUp = () => {
  const [SignUpData, setSignUpData] = useState({
    name: "",
    mobile: "",
    district: "",
    // address: "",
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
        setSignUpData((prev) => ({
          ...prev,
          [name]: value,
          [`${name}Error`]: false,
        }));
      } else {
        setSignUpData((prev) => ({
          ...prev,
          [`${name}Error`]: true,
        }));
      }
    } else {
      setSignUpData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitData = async () => {
    let hasError = false;

    if (SignUpData.name.trim().length < 3) {
      toast.error("Please enter a valid Name.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    } else if (SignUpData.mobile.trim().length !== 10 || SignUpData.mobileError) {
      toast.error("Please enter a valid Mobile Number.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    } else if (SignUpData.type === "") {
      toast.error("Please select Type.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    } else if (SignUpData.gender === "") {
      toast.error("Please select Gender.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    } else if (SignUpData.district === "") {
      toast.error("Please select District.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    // } else if (SignUpData.address.trim().length < 5) {
    //   toast.error("Please enter a valid Address.", {
    //     className: "toastify-custom-error",
    //   });
    //   hasError = true;
    } else if (
      SignUpData.codel &&
      (SignUpData.codel.length !== 6 || SignUpData.codelError)
    ) {
      toast.error("Referral Code must be 6 digits.", {
        className: "toastify-custom-error",
      });
      hasError = true;
    }

    if (!hasError) {
      setIsSubmitting(true);
      try {
        const res = await fetch.post("signUp", SignUpData);
        localStorage.setItem("type", res?.data?.type);
        toast.success("Registration Successful!", {
          className: "toastify-custom-success",
        });
        setSignUpData({
          name: "",
          mobile: "",
          district: "",
          // address: "",
          type: "",
          codel: "",
          gender: "",
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
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Join ExamPaper and create customized exam papers</p>
        </div>
        
        <div className="signup-form">
          <div className="form-row">
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Full Name"
                value={SignUpData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group">
              <FaPhone className="input-icon" />
              <input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Mobile Number"
                value={SignUpData.mobile}
                onChange={handleChange}
                required
              />
              {SignUpData.mobileError && (
                <div className="error-message">Only digits allowed</div>
              )}
            </div>
          </div>
          
          <div className="form-row">
            <div className="input-group">
              <FaBuilding className="input-icon" />
              <select
                name="type"
                id="type"
                value={SignUpData.type}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Type</option>
                <option value="School">School</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Classes">Classes</option>
              </select>
            </div>
            
            <div className="input-group">
              <FaVenusMars className="input-icon" />
              <select
                name="gender"
                id="gender"
                value={SignUpData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="input-group">
              <FaMapMarkerAlt className="input-icon" />
              <select
                name="district"
                id="district"
                value={SignUpData.district}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select District</option>
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
            
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="text"
                name="codel"
                id="codel"
                placeholder="Referral Code (Optional)"
                value={SignUpData.codel}
                onChange={handleChange}
              />
              {SignUpData.codelError && (
                <div className="error-message">Only digits allowed</div>
              )}
            </div>
          </div>
          
          {/* <div className="input-group full-width">
            <FaMapMarkerAlt className="input-icon" />
            <textarea
              name="address"
              id="address"
              placeholder="Your Full Address"
              value={SignUpData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div> */}
          
          <button 
            className="signup-button" 
            onClick={submitData}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
          
          <div className="login-redirect">
            Already have an account? <span onClick={goToLogin}>Sign In</span>
          </div>
        </div>
      </div>
      <div className="signup-image">
        <div className="image-content">
          <h2>Welcome to ExamPaper</h2>
          <p>Create customized exam papers for GSEB Board with ease</p>
          <ul>
            <li>Design personalized question papers</li>
            <li>Generate answer keys automatically</li>
            <li>Choose from thousands of questions</li>
            <li>Perfect for schools, teachers and students</li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
