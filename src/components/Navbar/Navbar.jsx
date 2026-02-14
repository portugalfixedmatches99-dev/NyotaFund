import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

   const handleApplyClick = () => {
    navigate("/apply"); 
  };

  const Click = () => {
    navigate("/login"); 
  };
  return (
    <nav className="navbar">
     <div className="logo-wrapper">
        <div className="logo-circle" onClick={Click}>IN</div>
        <div className="logo-text" onClick={handleApplyClick}>Inua Fund</div>
      </div>

      <ul className="nav-links">
        <li onClick={handleApplyClick}>How it works</li>
        <li onClick={handleApplyClick}>Features</li>
        <li onClick={handleApplyClick}>About</li>
      </ul>

      <div className="nav-actions">
        <button className="outline-btn" onClick={handleApplyClick}>Check Status</button>
        <button className="primary-btn" onClick={handleApplyClick}>Apply Now</button>
      </div>
    </nav>
  );
}
