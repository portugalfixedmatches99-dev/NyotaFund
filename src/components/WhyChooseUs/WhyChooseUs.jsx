import React from "react";
import "./WhyChooseUs.css";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Quick Approval",
      description: "Get pre-approved in minutes",
      icon: "⚡",
    },
    {
      title: "Flexible Terms",
      description: "Loan terms to fit your budget",
      icon: "📝",
    },
    {
      title: "No Hidden Fees",
      description: "Transparent pricing, no surprises",
      icon: "💵",
    },
    {
      title: "Secure & Licensed",
      description: "Encrypted & protected data",
      icon: "🔒",
    },
  ];

  return (
    <section className="why-choose-us">
      <div className="container">
        <h2 className="section-title">Why Choose Nyota Fund?</h2>
        <p className="section-subtitle">
          Fast, reliable, and transparent lending for everyone
        </p>

        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div className="reason-card fade-up" key={index}>
              <div className="reason-icon">{reason.icon}</div>
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
