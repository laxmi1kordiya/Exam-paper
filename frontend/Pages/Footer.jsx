import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="modern-footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="brand-logo">
            <span className="logo-icon">E</span>
            <span className="brand-name">ExamPaper</span>
          </div>
          <p className="brand-tagline">Empowering Education Through Technology</p>
          <div className="social-links">
            <a href="https://www.facebook.com/exampaper" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/exampaper" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/exampaper" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://www.youtube.com/@exampaper" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="javascript:void(0)" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="javascript:void(0)" onClick={() => scrollToSection('packages')}>Packages</a></li>
            <li><a href="javascript:void(0)" onClick={() => scrollToSection('how-to-use')}>How To Use</a></li>
            <li><a href="javascript:void(0)" onClick={() => scrollToSection('about')}>About Us</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-links">
          <h3>Support</h3>
          <ul>
            <li><a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
            <li><a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            <li><a href="/refund" target="_blank" rel="noopener noreferrer">Refund Policy</a></li>
            <li><a href="/faq" target="_blank" rel="noopener noreferrer">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul className="contact-list">
            <li>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-map-marker-alt"></i>
                <span>Ahmedabad, Gujarat, India</span>
              </a>
            </li>
            <li>
              <a href="tel:+919574537645">
                <i className="fas fa-phone"></i>
                <span>+91 9574537645</span>
              </a>
            </li>
            <li>
              <a href="mailto:yashkoradiya011@gmail.com">
                <i className="fas fa-envelope"></i>
                <span>yashkoradiya011@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="https://wa.me/919574537645" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
                <span>Chat on WhatsApp</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} ExamPaper. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;