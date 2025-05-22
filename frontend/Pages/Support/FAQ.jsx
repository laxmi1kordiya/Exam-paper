import React, { useState, useEffect } from 'react';

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ - ExamPaper";
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner. Fill in your details including name, email, and password. Verify your email address through the link we send you."
    },
    {
      question: "How can I reset my password?",
      answer: "Click on 'Forgot Password' on the login page. Enter your registered email address. You'll receive a password reset link. Follow the instructions in the email to set a new password."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are processed through secure payment gateways."
    },
    {
      question: "How do I download my purchased content?",
      answer: "After successful payment, go to 'My Account' > 'Downloads'. Find your purchased content and click the download button. You can download the content multiple times within the validity period."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer refunds within 7 days of purchase if you're not satisfied with the service. Please refer to our Refund Policy page for detailed information about eligibility and process."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team through email at yashkoradiya011@gmail.com or call us at +91 9574537645. We typically respond within 24 hours during business days."
    },
    {
      question: "Are the study materials updated regularly?",
      answer: "Yes, we regularly update our study materials to ensure they align with the latest exam patterns and syllabi. Updates are automatically available to all current subscribers."
    },
    {
      question: "Can I access the content on multiple devices?",
      answer: "Yes, you can access your content on multiple devices. Simply log in to your account on any device to access your purchased materials. However, simultaneous access is limited to one device at a time."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="support-page">
      <div className="support-container">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-content">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
            >
              <div 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 