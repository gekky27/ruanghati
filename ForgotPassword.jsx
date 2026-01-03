import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/ForgotPassword.css";
import logo from "../logo.png"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Email not found");
        return;
      }
      setMessage("Password recovery instructions have been sent to your email.");
      setEmail("");
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-left">
        <img src={logo} alt="Ruang Hati Logo" className="main-logo" />
      </div>

      <div className="forgot-right">
        <div className="forgot-content-wrapper">
          <h1 className="forgot-title">Password Recovery</h1>
          <p className="forgot-subtitle">
            Forget your password? no worries, we will help you!
          </p>

          {/* Added <br /> to match image 2.png line break */}
          <p className="forgot-instruction">
            Enter your verified email and we will send you password recovery instruction
          </p>

          {error && <div className="error-box">{error}</div>}
          {message && <div className="success-box">{message}</div>}

          <form onSubmit={handleSubmit} className="forgot-form">
            <label className="forgot-label">Your Email*</label>
            <input
              className="forgot-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <div className="forgot-action-area">
              <button type="submit" className="forgot-send-btn" disabled={loading || !email}>
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>

          <p className="forgot-note">
            Note that you can’t get password recovery if you <br /> did not registered your email during sign up
          </p>

          <div className="forgot-back-container">
            <Link to="/" className="forgot-back-link">
              Back to login page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;