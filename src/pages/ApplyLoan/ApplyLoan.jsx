import { useState, useEffect, useRef } from "react";
import "./ApplyLoan.css";
import { useNavigate } from 'react-router-dom';

export default function ApplyLoan() {


    const navigate = useNavigate();

    
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    idNumber: "",
    loanType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("https://backend-4qux.onrender.com/api/loans", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });

  const loan = await res.json();

  navigate("/approve", { state: { loanId: loan.id, formData: loan } });
};




  // 20 sample recent loans
  const recentLoans = Array.from({ length: 20 }, (_, i) => ({
    phone: `2547****${Math.floor(1000 + Math.random() * 9000)}`,
    amount: Math.floor(1000 + Math.random() * 20000),
  }));

  const tickerRef = useRef(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    let scrollHeight = 0;

    const interval = setInterval(() => {
      scrollHeight += 1;
      if (scrollHeight >= ticker.scrollHeight / 2) {
        scrollHeight = 0; // loop
      }
      ticker.scrollTop = scrollHeight;
    }, 50); // adjust speed here

    return () => clearInterval(interval);
  }, []);

  // Duplicate the list for seamless scrolling
  const displayLoans = [...recentLoans, ...recentLoans];

  return (
    <div className="apply-loan">
      <h2>🔊 Recent Loans</h2>

      <div className="loan-ticker" ref={tickerRef}>
        {displayLoans.map((loan, idx) => (
          <div className="recent-loan" key={idx}>
            <p>Phone: {loan.phone}</p>
            <p>KSh {loan.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <form className="loan-form" onSubmit={handleSubmit}>
        <label>
          Full Name *
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone (07XX XXX XXX) *
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          ID Number *
          <input
            type="text"
            name="idNumber"
            value={form.idNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Select Loan Type
          <select
            name="loanType"
            value={form.loanType}
            onChange={handleChange}
            required
          >
            <option value="">--Select--</option>
            <option value="personal">Personal Loan</option>
            <option value="business">Business Loan</option>
            <option value="emergency">Emergency Loan</option>
          </select>
        </label>

        <button type="submit">Check Eligibility & Apply</button>
      </form>
    </div>
  );
}
