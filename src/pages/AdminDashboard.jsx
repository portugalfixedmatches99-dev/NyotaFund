import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [loans, setLoans] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchLoans, setSearchLoans] = useState("");
  const [searchPayments, setSearchPayments] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loansRes = await fetch(
          "https://backend-4qux.onrender.com/api/loans"
        );
        const paymentsRes = await fetch(
          "https://backend-4qux.onrender.com/api/payments"
        );

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

  /* ---------------- DELETE HANDLERS ---------------- */

  const deleteLoan = async (id) => {
    const result = await Swal.fire({
      title: "Delete loan?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    await fetch(`https://backend-4qux.onrender.com/api/loans/${id}`, {
      method: "DELETE",
    });

    setLoans((prev) => prev.filter((loan) => loan.id !== id));

    Swal.fire("Deleted!", "Loan has been removed.", "success");
  };

  const deletePayment = async (id) => {
    const result = await Swal.fire({
      title: "Delete payment?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    await fetch(`https://backend-4qux.onrender.com/api/payments/${id}`, {
      method: "DELETE",
    });

    setPayments((prev) => prev.filter((p) => p.id !== id));

    Swal.fire("Deleted!", "Payment has been removed.", "success");
  };

  if (loading) return <div className="loading">Loading...</div>;

  /* ---------------- FILTERS ---------------- */

  const filteredLoans = loans.filter(
    (l) =>
      (l.fullName || "").toLowerCase().includes(searchLoans.toLowerCase()) ||
      (l.phone || "").includes(searchLoans) ||
      (l.loanType || "").toLowerCase().includes(searchLoans.toLowerCase()) ||
      (l.status || "").toLowerCase().includes(searchLoans.toLowerCase())
  );

  const filteredPayments = payments.filter(
    (p) =>
      (p.phone || "").includes(searchPayments) ||
      (p.status || "").toLowerCase().includes(searchPayments.toLowerCase()) ||
      String(p.loanId || "").includes(searchPayments)
  );

  /* ---------------- STATS ---------------- */

  const totalPaymentsAmount = payments.reduce(
    (sum, p) => sum + (p.amount || 0),
    0
  );

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Loans</p>
          <h3>{loans.length}</h3>
        </div>

        <div className="stat-card">
          <p>Approved Loans</p>
          <h3>{loans.filter((l) => l.status === "APPROVED").length}</h3>
        </div>

        <div className="stat-card">
          <p>Total Payments</p>
          <h3>Ksh {totalPaymentsAmount}</h3>
        </div>

        <div className="stat-card danger">
          <p>Pending Loans</p>
          <h3>{loans.filter((l) => l.status === "PENDING").length}</h3>
        </div>
      </div>

      {/* ================= LOANS ================= */}
      <div className="section">
        <h2>Loans ({filteredLoans.length})</h2>

        <input
          className="search-input"
          placeholder="Search loans..."
          value={searchLoans}
          onChange={(e) => setSearchLoans(e.target.value)}
        />

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Loan Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLoans.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                    No loans found
                  </td>
                </tr>
              )}

              {filteredLoans.map((loan) => (
                <tr
                  key={loan.id}
                  className={`status-${loan.status?.toLowerCase()}`}
                >
                  <td>{loan.id}</td>
                  <td>{loan.fullName}</td>
                  <td>{loan.phone}</td>
                  <td>{loan.loanType}</td>
                  <td>
                    <span className={`status ${loan.status?.toLowerCase()}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteLoan(loan.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= PAYMENTS ================= */}
      <div className="section">
        <h2>Payments ({filteredPayments.length})</h2>

        <input
          className="search-input"
          placeholder="Search payments..."
          value={searchPayments}
          onChange={(e) => setSearchPayments(e.target.value)}
        />

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Loan ID</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                    No payments found
                  </td>
                </tr>
              )}

              {filteredPayments.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.loanId}</td>
                  <td>{p.phone}</td>
                  <td>Ksh {p.amount}</td>
                  <td>
                    <span className={`status ${p.status?.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      disabled={p.status === "CONFIRMED"}
                      onClick={() => deletePayment(p.id)}
                    >
                      Delete
                    </button>
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
