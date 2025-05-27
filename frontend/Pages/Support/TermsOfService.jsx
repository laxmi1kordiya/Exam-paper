import React, { useEffect } from 'react';
import { FaFileContract, FaUserCheck, FaExclamationTriangle, FaGavel, FaHandshake, FaQuestionCircle } from 'react-icons/fa';

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service - ExamPaper";
  }, []);

  const sections = [
    {
      icon: <FaFileContract />,
      title: "Agreement to Terms",
      content: [
        "By accessing and using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
        [
          "You must be at least 18 years old to use our services",
          "You must provide accurate and complete information",
          "You are responsible for maintaining the security of your account",
          "You agree to comply with all applicable laws and regulations"
        ]
      ]
    },
    {
      icon: <FaUserCheck />,
      title: "User Responsibilities",
      content: [
        "As a user of our services, you are responsible for:",
        [
          "Maintaining the confidentiality of your account credentials",
          "All activities that occur under your account",
          "Providing accurate and up-to-date information",
          "Using the service in compliance with these terms"
        ]
      ]
    },
    {
      icon: <FaExclamationTriangle />,
      title: "Prohibited Activities",
      content: [
        "You agree not to engage in any of the following activities:",
        [
          "Sharing account credentials with others",
          "Using the service for any illegal purposes",
          "Attempting to breach or circumvent security measures",
          "Uploading malicious content or software",
          "Interfering with the proper functioning of the service"
        ]
      ]
    },
    {
      icon: <FaGavel />,
      title: "Intellectual Property",
      content: [
        "All content and materials available through our service are protected by intellectual property rights:",
        [
          "You may not copy, modify, or distribute our content without permission",
          "You retain rights to content you create and upload",
          "We may use your content to provide and improve our services",
          "You grant us a license to use your content as necessary"
        ]
      ]
    },
    {
      icon: <FaHandshake />,
      title: "Service Modifications",
      content: [
        "We reserve the right to modify or discontinue our services:",
        [
          "We may update these terms from time to time",
          "We will notify users of significant changes",
          "Continued use after changes constitutes acceptance",
          "We may suspend or terminate services at our discretion"
        ]
      ]
    },
    {
      icon: <FaQuestionCircle />,
      title: "Contact Information",
      content: [
        "If you have any questions about these Terms of Service, please contact us at:",
        [
          "Email: yashkoradiya011@gmail.com",
          "Phone: +91 9574537645",
          "Address: [Your Company Address]"
        ]
      ]
    }
  ];

  return (
    <div className="support-page">
      <div className="support-container">
        <h1>Terms of Service</h1>
        <div className="terms-content">
          <p className="terms-intro">
            Please read these Terms of Service carefully before using our services.
            These terms govern your access to and use of our website and services.
          </p>
          
          <div className="terms-sections">
            {sections.map((section, index) => (
              <section key={index} className="terms-section">
                <div className="section-header">
                  <span className="section-icon">{section.icon}</span>
                  <h2>{section.title}</h2>
                </div>
                <div className="section-content">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      {typeof item === 'string' ? (
                        <p>{item}</p>
                      ) : (
                        <ul>
                          {item.map((listItem, listIdx) => (
                            <li key={listIdx}>{listItem}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="terms-footer">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>We may update these Terms of Service from time to time. Please check back periodically for any changes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 