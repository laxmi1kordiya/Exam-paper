import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ - ExamPaper";
  }, []);

  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqs = [
    {
      category: "Account & Security",
      questions: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click on the 'Sign Up' button in the top right corner. Fill in your details including name, email, and password. Verify your email address through the link we send you."
        },
        {
          question: "How can I reset my password?",
          answer: "Click on 'Forgot Password' on the login page. Enter your registered email address. You'll receive a password reset link. Follow the instructions in the email to set a new password."
        },
        {
          question: "How do I update my profile information?",
          answer: "Log in to your account and go to 'My Profile' section. Click on 'Edit Profile' to update your personal information, contact details, or preferences. Don't forget to save your changes."
        },
        {
          question: "Is my account information secure?",
          answer: "Yes, we take security seriously. All your data is encrypted using industry-standard protocols. We never store your password in plain text and use secure servers to protect your information."
        },
        {
          question: "Can I have multiple accounts?",
          answer: "No, we only allow one account per user. Having multiple accounts violates our terms of service and may result in account suspension. If you need to change your email, you can update it in your profile settings."
        }
      ]
    },
    {
      category: "Payments & Billing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are processed through secure payment gateways."
        },
        {
          question: "What is your refund policy?",
          answer: "We offer refunds within 7 days of purchase if you're not satisfied with the service. Please refer to our Refund Policy page for detailed information about eligibility and process."
        },
        {
          question: "How do I view my payment history?",
          answer: "Log in to your account and go to 'My Account' > 'Payment History'. Here you can view all your past transactions, download invoices, and check payment status."
        },
        {
          question: "Do you offer any discounts or promotions?",
          answer: "Yes, we regularly offer discounts and promotions. Keep an eye on our website and subscribe to our newsletter to stay updated about special offers and seasonal discounts."
        },
        {
          question: "Can I get an invoice for my purchase?",
          answer: "Yes, you can download invoices for all your purchases. Go to 'My Account' > 'Payment History' and click on the 'Download Invoice' button next to any transaction."
        }
      ]
    },
    {
      category: "Content & Access",
      questions: [
        {
          question: "How do I download my purchased content?",
          answer: "After successful payment, go to 'My Account' > 'Downloads'. Find your purchased content and click the download button. You can download the content multiple times within the validity period."
        },
        {
          question: "Are the study materials updated regularly?",
          answer: "Yes, we regularly update our study materials to ensure they align with the latest exam patterns and syllabi. Updates are automatically available to all current subscribers."
        },
        {
          question: "Can I access the content on multiple devices?",
          answer: "Yes, you can access your content on multiple devices. Simply log in to your account on any device to access your purchased materials. However, simultaneous access is limited to one device at a time."
        },
        {
          question: "What is the validity period of purchased content?",
          answer: "The validity period varies depending on the package you purchase. Standard packages are valid for 1 year, while premium packages may have longer validity. Check the package details before purchase."
        },
        {
          question: "Can I share my account with others?",
          answer: "No, sharing your account credentials is not allowed and violates our terms of service. Each account is for individual use only. We monitor for suspicious activity and may suspend accounts that violate this policy."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What should I do if I can't access the content?",
          answer: "First, check your internet connection and try refreshing the page. If the issue persists, clear your browser cache and cookies. If you still can't access the content, contact our support team."
        },
        {
          question: "Which browsers are supported?",
          answer: "Our platform works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience."
        },
        {
          question: "How do I report a technical issue?",
          answer: "You can report technical issues by clicking the 'Report Issue' button on any page or by contacting our support team directly. Please provide details about the issue and any error messages you see."
        },
        {
          question: "Is there a mobile app available?",
          answer: "Yes, we have a mobile app available for both Android and iOS devices. You can download it from the respective app stores. The app provides the same features as the web version with additional mobile-specific features."
        },
        {
          question: "What should I do if the download fails?",
          answer: "If a download fails, check your internet connection and try again. If the problem persists, try using a different browser or clearing your browser cache. You can also contact our support team for assistance."
        }
      ]
    },
    {
      category: "Support & Contact",
      questions: [
        {
          question: "How can I contact customer support?",
          answer: "You can reach our customer support team through email at yashkoradiya011@gmail.com or call us at +91 9574537645. We typically respond within 24 hours during business days."
        },
        {
          question: "What are your support hours?",
          answer: "Our support team is available Monday through Saturday, 9 AM to 6 PM IST. For urgent issues, you can use our 24/7 emergency support line."
        },
        {
          question: "How do I provide feedback?",
          answer: "You can provide feedback through the 'Feedback' form in your account dashboard or by emailing us directly. We value your input and use it to improve our services."
        },
        {
          question: "Can I request a callback?",
          answer: "Yes, you can request a callback through the 'Contact Us' page. Select your preferred time slot, and our team will call you back during business hours."
        },
        {
          question: "How do I report inappropriate content?",
          answer: "If you find any inappropriate content, click the 'Report' button next to the content or contact our support team immediately. We take such reports seriously and will investigate promptly."
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(category => 
    activeCategory === 'all' || category.category === activeCategory
  ).flatMap(category => 
    category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="support-page">
      <div className="support-container">
        <h1>Frequently Asked Questions</h1>
        
        <div className="faq-search">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="faq-categories">
          <button
            className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Questions
          </button>
          {faqs.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${activeCategory === category.category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.category)}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="faq-content">
          {filteredFAQs.map((faq, index) => (
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
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="no-results">
            <p>No FAQs found matching your search. Please try different keywords or browse all categories.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .support-page {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .support-container {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .support-container h1 {
          color: #2c3e50;
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .faq-search {
          margin-bottom: 1.5rem;
        }

        .search-box {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .search-box input:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #95a5a6;
          font-size: 0.9rem;
        }

        .faq-categories {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          justify-content: center;
          flex-wrap: nowrap;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          -webkit-overflow-scrolling: touch;
        }

        .category-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 20px;
          background: #ffffff;
          color: #2c3e50;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .category-btn:hover {
          border-color: #3498db;
          color: #3498db;
        }

        .category-btn.active {
          background: #3498db;
          border-color: #3498db;
          color: #ffffff;
        }

        .faq-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .faq-question {
          padding: 1rem 1.25rem;
          background: #ffffff;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.3s ease;
        }

        .faq-question:hover {
          background: #f8f9fa;
        }

        .faq-question h3 {
          margin: 0;
          font-size: 1rem;
          color: #2c3e50;
          font-weight: 500;
          line-height: 1.4;
        }

        .faq-icon {
          color: #95a5a6;
          font-size: 1rem;
          transition: transform 0.3s ease;
          flex-shrink: 0;
          margin-left: 1rem;
        }

        .faq-item.active .faq-icon {
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .faq-item.active .faq-answer {
          padding: 1rem 1.25rem;
          max-height: 500px;
        }

        .faq-answer p {
          margin: 0;
          color: #34495e;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .no-results {
          text-align: center;
          padding: 2rem;
          color: #7f8c8d;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .support-page {
            padding: 1rem;
          }

          .support-container {
            padding: 1.5rem;
          }

          .support-container h1 {
            font-size: 1.75rem;
          }

          .faq-categories {
            justify-content: flex-start;
            padding-bottom: 0.75rem;
          }

          .category-btn {
            padding: 0.4rem 0.75rem;
            font-size: 0.85rem;
          }

          .faq-question h3 {
            font-size: 0.95rem;
          }

          .faq-answer p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQ; 