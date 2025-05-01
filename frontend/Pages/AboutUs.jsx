import React from "react";
import SectionWrapper from "./SectionWrapper";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        {/* <span className="about-us-label">About Us</span> */}
        <h1>Who We Are?</h1>
      </div>
      <div className="about-us-content">
        <div className="about-us-text">
          <h2>About Exam Paper</h2>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < 4 ? "star filled" : "star"}>
                ★
              </span>
            ))}
          </div>
          <p>
            We are a passionate and dynamic team, each member bringing a wealth
            of diverse skills and experiences, united by a single purpose: to
            make a positive impact on education. While our backgrounds vary, we
            all share a deep commitment to creating tools that empower both
            teachers and students in their learning journey.
          </p>
          <p>
            Our mission isn’t just about building a product – it’s about shaping
            the future of education and making it more accessible, engaging, and
            effective for everyone. The road ahead may be uncertain, but the joy
            of contributing to a brighter future for children is our true
            motivation.
          </p>
          <div className="contact-info">
            <p>
              <strong>Mail-</strong> info.CreatePaper
            </p>
            <p>
              <strong>Contact-</strong> +91 9876543210
            </p>
          </div>
        </div>
        <div className="about-us-image">
          <div className="image-wrapper">
            {/* Placeholder for the person image */}
            <img
              src="frontend\Assets\images\model-min.png"
              alt="Person"
              className="person-image"
            />
            {/* SVG for the purple splash background */}
            <svg
              className="splash-background"
              viewBox="0 0 300 400"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C150,100 300,0 300,200 C300,400 150,300 0,400 Z"
                fill="#8B5CF6"
                opacity="0.8"
              />
              <circle cx="280" cy="20" r="10" fill="#000" />
              <circle cx="260" cy="50" r="8" fill="#000" />
              <circle cx="290" cy="80" r="6" fill="#000" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(AboutUs, "about");
