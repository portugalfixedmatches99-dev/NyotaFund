import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [loans, setLoans] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchLoans, setSearchLoans] = useState('');
  const [searchPayments, setSearchPayments] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loansRes = await fetch('http://localhost:8080/api/loans');
        const paymentsRes = await fetch('http://localhost:8080/api/payments');
        const loansData = await loansRes.json();
        const paymentsData = await paymentsRes.json();
        setLoans(loansData);
        setPayments(paymentsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <div className="loading">Loading...</div>;

  // Filtered loans/payments with safe null handling
  const filteredLoans = loans.filter(
    (loan) =>
      (loan.fullName || '').toLowerCase().includes(searchLoans.toLowerCase()) ||
      (loan.phone || '').toLowerCase().includes(searchLoans.toLowerCase()) ||
      (loan.loanType || '').toLowerCase().includes(searchLoans.toLowerCase()) ||
      (loan.status || '').toLowerCase().includes(searchLoans.toLowerCase())
  );

  const filteredPayments = payments.filter(
    (p) =>
      (p.phone || '').toLowerCase().includes(searchPayments.toLowerCase()) ||
      (p.mpesaMessage || '').toLowerCase().includes(searchPayments.toLowerCase()) ||
      (p.status || '').toLowerCase().includes(searchPayments.toLowerCase()) ||
      String(p.loanId || '').includes(searchPayments)
  );

  // Totals
  const totalLoans = filteredLoans.length;
  const totalPaymentsAmount = filteredPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* Loans Section */}
      <div className="section">
        <h2>Loans ({totalLoans})</h2>
        <input
          type="text"
          placeholder="Search loans..."
          value={searchLoans}
          onChange={(e) => setSearchLoans(e.target.value)}
          className="search-input"
        />
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>ID Number</th>
                <th>Loan Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.fullName}</td>
                  <td>{loan.phone}</td>
                  <td>{loan.idNumber}</td>
                  <td>{loan.loanType}</td>
                  <td>
                    <span className={`status ${loan.status?.toLowerCase()}`}>
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payments Section */}
      <div className="section">
        <h2>Payments (Total Ksh {totalPaymentsAmount})</h2>
        <input
          type="text"
          placeholder="Search payments..."
          value={searchPayments}
          onChange={(e) => setSearchPayments(e.target.value)}
          className="search-input"
        />
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Loan ID</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.loanId}</td>
                  <td>{p.phone}</td>
                  <td>Ksh {p.amount}</td>
                  <td className="mpesa-message">{p.mpesaMessage}</td>
                  <td>
                    <span className={`status ${p.status?.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

