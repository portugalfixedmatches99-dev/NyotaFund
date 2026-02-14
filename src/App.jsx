import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Features from "./components/Features/Features";
import ApplyLoan from "./pages/ApplyLoan/ApplyLoan"; // new page
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import Footer from "./components/Footer/Footer";
import LoanApproval from "./components/LoanApproval/LoanApproval";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <HowItWorks />
                  <Features />
                  <WhyChooseUs />
                  
                </>
              }
            />
            <Route path="/apply" element={<ApplyLoan />} />
             <Route path="/approve" element={<LoanApproval />} />

             <Route path="/admin" element={<AdminDashboard />} />
             <Route path="/login" element={<Login />} />
            

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
