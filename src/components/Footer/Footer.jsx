import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2>Nyota Fund</h2>
          <p>Fast, flexible, and transparent loans for everyone.</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li>How It Works</li>
              <li>Pricing</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li>Privacy</li>
              <li>Terms</li>
              <li>Security</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Nyota Fund. All rights reserved.</p>
      </div>
    </footer>
  );
}
