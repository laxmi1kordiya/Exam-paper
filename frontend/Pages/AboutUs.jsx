import React from 'react';
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
              <span key={index} className={index < 4 ? 'star filled' : 'star'}>★</span>
            ))}
          </div>
          <p>
            We are group of enthusiasts with diverse career interests but bound by one common passion, to create something special for Teachers and children. Every individual is a craftsman in his or her own way and contribute different and skills to the Education world to build the product.
          </p>
          <p>
            Whether we will achieve success in building a world wonder, we do not know. But what we do know is that we are on this never ending journey to create a better future for our children. We enjoy their company, we enjoy doing something special for them and that makes us a happy MY Team.
          </p>
          <div className="contact-info">
            <p><strong>Mail</strong> – info.360exam</p>
            <p><strong>Contact</strong> – +91 945929 6160</p>
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
            <svg className="splash-background" viewBox="0 0 300 400" preserveAspectRatio="none">
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

export default SectionWrapper(AboutUs,"about");