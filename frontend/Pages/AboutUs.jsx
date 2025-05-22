import React from "react";
import SectionWrapper from "./SectionWrapper";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <span className="about-us-label">About Us</span>
        <h1>Transforming Education Through Technology</h1>
      </div>
      <div className="about-us-content">
        <div className="about-us-text">
          <div className="mission-statement">
            <h2>Our Mission</h2>
            <p>
              At Exam Paper, we're revolutionizing the way educators create and manage assessments. 
              Our platform combines cutting-edge technology with educational expertise to provide 
              a seamless, efficient, and intelligent solution for generating high-quality exam papers.
            </p>
          </div>
          
          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Innovation</h3>
                <p>Constantly pushing boundaries to create better educational tools</p>
              </div>
              <div className="value-item">
                <h3>Excellence</h3>
                <p>Committed to delivering the highest quality in everything we do</p>
              </div>
              <div className="value-item">
                <h3>Accessibility</h3>
                <p>Making quality education tools available to all educators</p>
              </div>
              <div className="value-item">
                <h3>Support</h3>
                <p>Dedicated to helping educators succeed in their mission</p>
              </div>
            </div>
          </div>

          <div className="impact-section">
            <h2>Our Impact</h2>
            <div className="impact-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Educators Served</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Papers Generated</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">User Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(AboutUs, "about");
