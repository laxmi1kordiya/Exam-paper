import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - ExamPaper";
  }, []);

  return (
    <div className="support-page">
      <div className="support-container">
        <h1>Privacy Policy</h1>
        <div className="support-content">
          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Usage data and preferences</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul>
              <li>Providing and maintaining our services</li>
              <li>Processing your transactions</li>
              <li>Sending you updates and marketing communications</li>
              <li>Improving our services</li>
            </ul>
          </section>

          <section>
            <h2>3. Information Sharing</h2>
            <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
          </section>

          <section>
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2>6. Cookies and Tracking</h2>
            <p>We use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic.</p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>If you have any questions about our Privacy Policy, please contact us at:</p>
            <p>Email: yashkoradiya011@gmail.com</p>
            <p>Phone: +91 9574537645</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 