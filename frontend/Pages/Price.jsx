import React from "react";
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const PriceCard = ({ plan, index }) => {
  return (
    <motion.div 
      className={`price-card ${plan.popular ? 'popular' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}
    >
      {plan.badge && (
        <div className="price-badge">{plan.badge}</div>
      )}
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
          <motion.div 
            key={index} 
            className="feature-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <FaCheck className="check-icon" />
            <span className="feature-text">{feature}</span>
          </motion.div>
        ))}
      </div>
      <motion.button 
        className={`price-button ${plan.popular ? 'popular' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {plan.buttonText}
        <span className="button-icon">→</span>
      </motion.button>
    </motion.div>
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
      <motion.div 
        className="pricing-header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="pricing-title">Subscription Plans</h2>
        <p className="pricing-subtitle">Choose the perfect plan to streamline your exam paper creation process</p>
      </motion.div>
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <PriceCard key={index} plan={plan} index={index} />
        ))}
      </div>
      <motion.div 
        className="pricing-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p>All plans include a 14-day free trial. No credit card required.</p>
        <p>Need a custom plan? <a href="tel:+91 9574537645" style={{ color: '#007bff', textDecoration: 'none' }}>Contact us</a> for enterprise solutions.</p>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Price, "price");
  