import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleApplyClick = () => navigate("/apply");
  const handleLogoClick = () => navigate("/login");
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="logo-wrapper">
        <div className="logo-circle" onClick={handleLogoClick}>NF</div>
        <div className="logo-text" onClick={handleApplyClick}>Nyota Fund</div>
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li onClick={handleApplyClick}>How it works</li>
        <li onClick={handleApplyClick}>Features</li>
        <li onClick={handleApplyClick}>About</li>
      </div>

      <div className="nav-actions">
        <button className="outline-btn" onClick={handleApplyClick}>Check Status</button>
        <button className="primary-btn" onClick={handleApplyClick}>Apply Now</button>
      </div>

      {/* Hamburger */}
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
