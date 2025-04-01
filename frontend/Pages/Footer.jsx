import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo and Copyright */}
        <div className="footer-section">
          <div className="logo">
            <span className="logo-icon">E</span>
            <span className="logo-text">© ExamPaper.com</span>
          </div>
          <p className="copyright">ALL RIGHTS RESERVED.</p>
        </div>

        {/* Middle Section 1: Exam8 App */}
        <div className="footer-section">
          <h3>ExamPaper App</h3>
          <button className="download-btn">Download App</button>
        </div>

        {/* Middle Section 2: Learn More */}
        <div className="footer-section">
          <h3>Learn More</h3>
          <ul>
            <li><a href="#terms">Terms of Use</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Section: Contact Us */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Rajkot, Gujarat</p>
          <div className="contact-links">
            <a href="tel:+91-9574537645">Call Us</a> | <a href="https://wa.me/919574537645" target="_blank">WhatsApp</a> | <a href="mailto:yashkoradiya011@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;