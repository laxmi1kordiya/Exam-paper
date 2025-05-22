import React, { useEffect } from 'react';

const RefundPolicy = () => {
  useEffect(() => {
    document.title = "Refund Policy - ExamPaper";
  }, []);

  return (
    <div className="support-page">
      <div className="support-container">
        <h1>Refund Policy</h1>
        <div className="support-content">
          <section>
            <h2>1. Refund Eligibility</h2>
            <p>We offer refunds under the following circumstances:</p>
            <ul>
              <li>Technical issues preventing service access</li>
              <li>Duplicate charges</li>
              <li>Service unavailability</li>
              <li>Within 7 days of purchase if not satisfied</li>
            </ul>
          </section>

          <section>
            <h2>2. Refund Process</h2>
            <p>To request a refund:</p>
            <ol>
              <li>Contact our support team within 7 days of purchase</li>
              <li>Provide your order details and reason for refund</li>
              <li>Allow 3-5 business days for processing</li>
              <li>Refund will be issued to original payment method</li>
            </ol>
          </section>

          <section>
            <h2>3. Non-Refundable Items</h2>
            <p>The following are not eligible for refunds:</p>
            <ul>
              <li>Used or downloaded content</li>
              <li>Subscription fees after 7 days</li>
              <li>Custom or personalized services</li>
            </ul>
          </section>

          <section>
            <h2>4. Processing Time</h2>
            <p>Refunds are typically processed within 3-5 business days. The time it takes for the refund to appear in your account depends on your payment provider.</p>
          </section>

          <section>
            <h2>5. Contact Information</h2>
            <p>For refund requests or questions, please contact us at:</p>
            <p>Email: yashkoradiya011@gmail.com</p>
            <p>Phone: +91 9574537645</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy; 