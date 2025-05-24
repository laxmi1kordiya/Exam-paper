import React, { useEffect } from 'react';
import { FaShieldAlt, FaUserShield, FaLock, FaUserCog, FaCookieBite, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - ExamPaper";
  }, []);

  const sections = [
    {
      icon: <FaShieldAlt />,
      title: "Information We Collect",
      content: [
        "We collect information that you provide directly to us, including:",
        [
          "Name and contact information",
          "Account credentials",
          "Payment information",
          "Usage data and preferences"
        ]
      ]
    },
    {
      icon: <FaUserShield />,
      title: "How We Use Your Information",
      content: [
        "We use the collected information for:",
        [
          "Providing and maintaining our services",
          "Processing your transactions",
          "Sending you updates and marketing communications",
          "Improving our services"
        ]
      ]
    },
    {
      icon: <FaShieldAlt />,
      title: "Information Sharing",
      content: [
        "We do not sell or rent your personal information to third parties. We may share your information with:",
        [
          "Service providers who assist in our operations",
          "Legal authorities when required by law",
          "Business partners with your consent"
        ]
      ]
    },
    {
      icon: <FaLock />,
      title: "Data Security",
      content: [
        "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. Our security measures include:",
        [
          "Encryption of sensitive data",
          "Regular security assessments",
          "Access controls and authentication",
          "Secure data storage and transmission"
        ]
      ]
    },
    {
      icon: <FaUserCog />,
      title: "Your Rights",
      content: [
        "You have the right to:",
        [
          "Access your personal information",
          "Correct inaccurate data",
          "Request deletion of your data",
          "Opt-out of marketing communications",
          "Export your data in a portable format"
        ]
      ]
    },
    {
      icon: <FaCookieBite />,
      title: "Cookies and Tracking",
      content: [
        "We use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. These technologies help us:",
        [
          "Remember your preferences",
          "Understand how you use our website",
          "Provide personalized content",
          "Improve our services"
        ]
      ]
    },
    {
      icon: <FaEnvelope />,
      title: "Contact Us",
      content: [
        "If you have any questions about our Privacy Policy, please contact us at:",
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
        <h1>Privacy Policy</h1>
        <div className="privacy-content">
          <p className="privacy-intro">
            This Privacy Policy describes how we collect, use, and protect your personal information when you use our services.
            We are committed to ensuring that your privacy is protected.
          </p>
          
          <div className="privacy-sections">
            {sections.map((section, index) => (
              <section key={index} className="privacy-section">
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

          <div className="privacy-footer">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>We may update this Privacy Policy from time to time. Please check back periodically for any changes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 