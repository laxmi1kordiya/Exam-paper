import React, { useEffect } from 'react';

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service - ExamPaper";
  }, []);

  return (
    <div className="support-page">
      <div className="support-container">
        <h1>Terms of Service</h1>
        <div className="support-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using ExamPaper.com, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily access the materials on ExamPaper.com for personal, non-commercial transitory viewing only.</p>
            <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by ExamPaper at any time.</p>
          </section>

          <section>
            <h2>3. User Account</h2>
            <p>To access certain features of the website, you must register for an account. You agree to provide accurate and complete information during registration.</p>
          </section>

          <section>
            <h2>4. Intellectual Property</h2>
            <p>The content on ExamPaper.com, including but not limited to text, graphics, logos, and software, is the property of ExamPaper and is protected by copyright laws.</p>
          </section>

          <section>
            <h2>5. Limitation of Liability</h2>
            <p>ExamPaper shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
          </section>

          <section>
            <h2>6. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the website.</p>
          </section>

          <section>
            <h2>7. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>Email: yashkoradiya011@gmail.com</p>
            <p>Phone: +91 9574537645</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 