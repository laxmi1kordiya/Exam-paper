import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SocialLink = ({ icon: Icon, href, label }) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label={label}
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon />
  </motion.a>
);

const FooterLink = ({ href, onClick, children }) => (
  <motion.li
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    {onClick ? (
      <a href="javascript:void(0)" onClick={onClick}>{children}</a>
    ) : (
      <Link to={href}>{children}</Link>
    )}
  </motion.li>
);

const ContactItem = ({ icon: Icon, href, text }) => (
  <motion.li
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon />
      <span>{text}</span>
    </a>
  </motion.li>
);

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
        <motion.div 
          className="footer-brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="brand-logo">
            <motion.span 
              className="logo-icon"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              E
            </motion.span>
            <span className="brand-name">ExamPaper</span>
          </div>
          <p className="brand-tagline">Empowering Education Through Technology</p>
          <div className="social-links">
            <SocialLink icon={FaFacebookF} href="https://www.facebook.com/exampaper" label="Facebook" />
            <SocialLink icon={FaInstagram} href="https://www.instagram.com/exampaper" label="Instagram" />
            <SocialLink icon={FaLinkedinIn} href="https://www.linkedin.com/company/exampaper" label="LinkedIn" />
            <SocialLink icon={FaYoutube} href="https://www.youtube.com/@exampaper" label="YouTube" />
          </div>
        </motion.div>

        <motion.div 
          className="footer-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3>Quick Links</h3>
          <ul>
            <FooterLink onClick={() => scrollToSection('home')}>Home</FooterLink>
            <FooterLink onClick={() => scrollToSection('packages')}>Packages</FooterLink>
            <FooterLink onClick={() => scrollToSection('how-to-use')}>How To Use</FooterLink>
            <FooterLink onClick={() => scrollToSection('about')}>About Us</FooterLink>
          </ul>
        </motion.div>

        <motion.div 
          className="footer-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>Support</h3>
          <ul>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/refund">Refund Policy</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </ul>
        </motion.div>

        <motion.div 
          className="footer-contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3>Contact Us</h3>
          <ul className="contact-list">
            <ContactItem 
              icon={FaMapMarkerAlt}
              href="https://maps.google.com"
              text="Ahmedabad, Gujarat, India"
            />
            <ContactItem 
              icon={FaPhone}
              href="tel:+919574537645"
              text="+91 9574537645"
            />
            <ContactItem 
              icon={FaEnvelope}
              href="mailto:yashkoradiya011@gmail.com"
              text="yashkoradiya011@gmail.com"
            />
            <ContactItem 
              icon={FaWhatsapp}
              href="https://wa.me/919574537645"
              text="Chat on WhatsApp"
            />
          </ul>
        </motion.div>
      </div>

      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>&copy; {currentYear} ExamPaper. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;