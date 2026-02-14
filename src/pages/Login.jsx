import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded credentials
  const adminUser = {
    username: "anto",
    password: "anto123",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === adminUser.username && password === adminUser.password) {
      navigate("/admin"); // navigate to admin dashboard
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
