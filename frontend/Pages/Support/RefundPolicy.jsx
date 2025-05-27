import React, { useEffect } from 'react';
import { FaMoneyBillWave, FaClock, FaExclamationCircle, FaCheckCircle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';

const RefundPolicy = () => {
  useEffect(() => {
    document.title = "Refund Policy - ExamPaper";
  }, []);

  const sections = [
    {
      icon: <FaMoneyBillWave />,
      title: "Refund Eligibility",
      content: [
        "We offer refunds under the following conditions:",
        [
          "Within 7 days of purchase",
          "For unused or undownloaded content",
          "For technical issues preventing access",
          "For duplicate purchases"
        ]
      ]
    },
    {
      icon: <FaClock />,
      title: "Refund Process",
      content: [
        "To request a refund, please follow these steps:",
        [
          "Contact our support team within 7 days of purchase",
          "Provide your order number and reason for refund",
          "Allow 2-3 business days for review",
          "If approved, refund will be processed within 5-7 business days"
        ]
      ]
    },
    {
      icon: <FaExclamationCircle />,
      title: "Non-Refundable Items",
      content: [
        "The following items are not eligible for refunds:",
        [
          "Content that has been downloaded or accessed",
          "Purchases made more than 7 days ago",
          "Subscription fees for used periods",
          "Custom or personalized content"
        ]
      ]
    },
    {
      icon: <FaCheckCircle />,
      title: "Refund Methods",
      content: [
        "Refunds will be issued through the original payment method:",
        [
          "Credit/Debit cards",
          "UPI payments",
          "Net banking",
          "Digital wallets"
        ]
      ]
    },
    {
      icon: <FaTimesCircle />,
      title: "Exceptions",
      content: [
        "We may make exceptions to our refund policy in special circumstances:",
        [
          "Technical issues preventing service access",
          "Duplicate charges",
          "Unauthorized transactions",
          "Service unavailability"
        ]
      ]
    },
    {
      icon: <FaQuestionCircle />,
      title: "Contact Information",
      content: [
        "If you have any questions about our refund policy, please contact us at:",
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
        <h1>Refund Policy</h1>
        <div className="refund-content">
          <p className="refund-intro">
            We strive to ensure complete satisfaction with our services. This policy outlines our refund process
            and eligibility criteria. Please read it carefully before making a purchase.
          </p>
          
          <div className="refund-sections">
            {sections.map((section, index) => (
              <section key={index} className="refund-section">
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

          <div className="refund-footer">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>We may update this Refund Policy from time to time. Please check back periodically for any changes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy; 