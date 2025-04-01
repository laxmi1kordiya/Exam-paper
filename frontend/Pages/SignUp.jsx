import React from "react";
import { useState } from "react";
import { useAuthenticatedFetch } from "../Api/Axios";
const SignUp = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_mobile: "",
    user_city: "Ahmedabad",
    user_address: "",
    user_type: "",
    user_referral: "",
  });
  const fetch = useAuthenticatedFetch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitData = async () => {
  
    try {
      const res = await fetch.get(`signUp`,formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container p-0 section1">
      <div className="row no-gutters height-self-center">
        <div className="col-sm-6 align-self-center bg-white rounded offset-md-3">
          <div className="row m-0">
            <div className="col-md-12 bg-white sign-in-page-data">
              <div className="col-md-12 mt-4 text-center animate__animated animate__fadeInDown">
                <a
                  href="/login"
                  className="btn btn-primary float-right"
                  style={{
                    marginLeft: "-62px",
                    margin: "10px",
                    zIndex: "9999",
                  }}
                >
                  Sign in
                </a>
                <img
                  src="https://360exams.in/admin/images/logo.png"
                  className="img-fluid"
                  style={{ width: "100px" }}
                  alt="Logo"
                />
              </div>
              <div className="sign-in-from">
                <h3 className="mb-0 text-center">Sign Up</h3>
                <p className="text-center text-dark">
                  Register your account with 360Exam with your profession
                </p>

                <form className="mt-4">
                  <div className="row">
                    <div className="form-group col-6">
                      <label htmlFor="user_name">Your Name</label>
                      <input
                        type="text"
                        name="user_name"
                        className="form-control mb-0"
                        id="user_name"
                        placeholder="Enter Name"
                        minLength="5"
                        maxLength="20"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group col-6">
                      <label htmlFor="user_mobile">Mobile Number</label>
                      <input
                        type="text"
                        name="user_mobile"
                        className="form-control mb-0"
                        id="user_mobile"
                        placeholder="Enter Mobile Number"
                        minLength="10"
                        maxLength="10"
                        value={formData.user_mobile}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group col-6">
                      <label htmlFor="district">District</label>
                      <select
                        className="form-control"
                        name="user_city"
                        id="user_city"
                        value={formData.user_city}
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

                    <div className="form-group col-6">
                      <label htmlFor="user_address">Address</label>
                      <input
                        type="text"
                        name="user_address"
                        className="form-control mb-0"
                        id="user_address"
                        placeholder="*your address"
                        minLength="5"
                        value={formData.user_address}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group col-6">
                      <label htmlFor="user_type">Type</label>
                      <select
                        className="form-control"
                        id="user_type"
                        name="user_type"
                        value={formData.user_type}
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

                    <div className="form-group col-6">
                      <label htmlFor="user_referral">
                        Referral Code <b>(Optional)</b>
                      </label>
                      <input
                        type="text"
                        name="user_referral"
                        className="form-control mb-0"
                        id="user_referral"
                        placeholder="887788"
                        minLength="6"
                        maxLength="6"
                        value={formData.user_referral}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sign-info text-center">
                    <button
                      type="button"
                      className="btn btn-primary w-100 mb-2"
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
        </div>
      </div>
    </div>
  );
};

export default SignUp;
