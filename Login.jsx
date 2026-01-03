import React, { useState } from "react";
import "../style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import blueBg from "../blue.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, password: formData.password })
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message || "Invalid username or password");
        return;
      }
      if (data.token) localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Server not reachable. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {/* LEFT PANEL */}
      <div className="login-left" style={{ backgroundImage: `url(${blueBg})` }}>
        <h2>Glad to<br />see you again</h2>
        <p className="welcome-text">
          welcome back to <br />
          <span>Ruang Hati</span>
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="login-content-wrapper">
          
          {/* ERROR POPUP - Moved here to match image 1.jpg */}
          {errorMessage && (
            <div className="login-error-popup">
              {errorMessage}
            </div>
          )}

          <h1 className="login-title">
            Your space is<br />waiting for you.
          </h1>

          <form onSubmit={handleSubmit} className="login-form">
            <label>Your name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Your Password*</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="forgot-password">
              <Link to="/forgot-password">Forget Password</Link>
            </div>

            <div className="login-actions">
              <button type="submit" className="floating-btn">Log In</button>
              <div className="switch-text">
                Don’t have an account? <a href="/signup">Sign Up</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;