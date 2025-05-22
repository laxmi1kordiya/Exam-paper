import React from "react";
import SectionWrapper from "./SectionWrapper";

const PriceCard = ({ plan }) => {
  return (
    <div className="price-card">
      <div className="price-badge">{plan.badge}</div>
      <div className="price-header">
        <h3 className="price-title">{plan.title}</h3>
        <div className="price-amount">
          <span className="price-currency">₹</span>
          <span className="price-value">{plan.price}</span>
          <span className="price-duration">/{plan.duration}</span>
        </div>
      </div>
      <div className="price-features">
        {plan.features.map((feature, index) => (
          <div key={index} className="feature-item">
            <span className="">✓</span>
            <span className="feature-text">{feature}</span>
          </div>
        ))}
      </div>
      <button className={`price-button ${plan.popular ? 'popular' : ''}`}>
        {plan.buttonText}
        <span className="button-icon">→</span>
      </button>
    </div>
  );
};

const Price = () => {
  const plans = [
    {
      badge: "Most Popular",
      title: "Professional",
      price: "10999",
      duration: "year",
      popular: true,
      buttonText: "Buy Now",
      features: [
        "Unlimited Question Papers",
        "Advanced Question Types",
        "Custom Templates",
        "Priority Support",
        "Export to Multiple Formats",
        "Analytics Dashboard"
      ]
    },
    {
      badge: "Best Value",
      title: "Premium",
      price: "7999",
      duration: "year",
      popular: false,
      buttonText: "Buy Now",
      features: [
        "All Professional Features",
        "AI-Powered Question Generation",
        "Bulk Paper Creation",
        "Advanced Analytics",
        "API Access",
        "Dedicated Account Manager"
      ]
    },
    {
      badge: "Basic",
      title: "Starter",
      price: "5999",
      duration: "year",
      popular: false,
      buttonText: "Buy Now",
      features: [
        "Basic Question Papers",
        "Standard Templates",
        "Email Support",
        "Basic Analytics",
        "PDF Export",
        "Community Access"
      ]
    }
  ];

  return (
    <div className="pricing-section">
      <div className="pricing-header">
        <h2 className="pricing-title">Subscription Plans</h2>
        <p className="pricing-subtitle">Choose the perfect plan to streamline your exam paper creation process</p>
      </div>
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <PriceCard key={index} plan={plan} />
        ))}
      </div>
      <div className="pricing-footer">
        <p>All plans include a 14-day free trial. No credit card required.</p>
        <p>Need a custom plan? <a href="#contact">Contact us</a> for enterprise solutions.</p>
      </div>
    </div>
  );
};

export default SectionWrapper(Price, "price");
  