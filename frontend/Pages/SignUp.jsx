import React, { useState } from "react";
import { useAuthenticatedFetch } from "../Api/Axios";
import { navigate } from "../Components/NavigationMenu";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    distict: "Ahmedabad",
    address: "",
    type: "",
    codel: "",
  });
  const setNavigate = navigate();
  const fetch = useAuthenticatedFetch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitData = async () => {
    try {
      await fetch.post("signUp", formData);
      setNavigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const goToLogin = () => {
    setNavigate("/login");
  };
  return (
    <div className="login-container">
      <div className="signin-box ">
        <div className="login-btn">
          <button
            type="button"
            id="verify_button"
            onClick={goToLogin}
          >
            Sign in
          </button>
        </div>
        <img
          src=""
          className="img-fluid"
          style={{ width: "100px" }}
          alt="Logo"
        />
        {/* </div> */}
        <div className="sign-in-from">
          <h3 className="text-center">Sign Up</h3>
          <p className="text-center text-dark">
            Register your account with 360Exam with your profession
          </p>

          <form className="mt-4" style={{padding: "20px"}}>
            <div className="row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Enter Name"
                  minLength="5"
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
                  className="form-control "
                  id="mobile"
                  placeholder="Enter Mobile Number"
                  minLength="10"
                  maxLength="10"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="district">District</label>
                <select
                  className="form-control"
                  name="distict"
                  id="distict"
                  value={formData.distict}
                  onChange={handleChange}
                >
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
                  className="form-control "
                  id="address"
                  placeholder="*your address"
                  minLength="5"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
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
                <label htmlFor="codel">
                  Referral Code <b>(Optional)</b>
                </label>
                <input
                  type="text"
                  name="codel"
                  className="form-control "
                  id="codel"
                  placeholder="887788"
                  minLength="6"
                  maxLength="6"
                  value={formData.codel}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sign-info text-center">
              <button
                type="button"
                className="text-center"
                id="verify_button"
                onClick={submitData}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
