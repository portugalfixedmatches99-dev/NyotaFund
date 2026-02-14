import "./Hero.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {



   const navigate = useNavigate();

    const handleApplyClick = () => {
    navigate("/apply"); 
  };

   const Click = () => {
    navigate("/login"); 
  };
  return (
    <section className="hero">
      {/* Badge */}
      <div className="hero-badge">
        💰 Special Offer
      </div>

      {/* Headline */}
      <h1 className="hero-title">
        Fast, Flexible & <br />
        Transparent Loans
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle">
        Get up to <strong>Ksh 100,000</strong> with our industry-leading
        <strong> 7.5%</strong> interest rate. No hidden fees,
        no surprises—just straightforward lending.
      </p>

      {/* CTA Buttons */}
      <div className="hero-actions">
        <button className="hero-primary" onClick={handleApplyClick}>
          Apply for Loan →
        </button>
        <button className="hero-secondary" onClick={handleApplyClick}>
          Check Application Status
        </button>
      </div>
    </section>
  );
}
