import React, { useMemo, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../style/ResetPassword.css";
import logo from "../logo.png"; // ✅ Ensure this path is correct

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPassword = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const email = query.get("email") || "";
  const token = query.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token || !email) {
      setError("Invalid reset link.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password and confirm password must match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Reset failed");
        return;
      }

      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="reset-wrapper">
      {/* LEFT SIDE */}
      <div className="reset-left">
        <div className="logo-box">
          <img src={logo} alt="Ruang Hati" />
        </div>
      </div>

      <div className="divider" />

      {/* RIGHT SIDE */}
      <div className="reset-right">
        <h1 className="reset-title">Password Recovery</h1>
        <p className="subtitle">
          Forget your password? no worries, we will help you!
        </p>

        {error && <div className="error-box">{error}</div>}
        {message && <div className="success-box">{message}</div>}

        <form onSubmit={handleReset} className="reset-form">
          <label>Email*</label>
          <input value={email} readOnly className="reset-input" />

          <label>New Password*</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="reset-input"
          />

          <label>Confirm New Password*</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="reset-input"
          />

          <div className="reset-action">
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>

        <div className="back-link-container">
          <Link to="/" className="back-link">
            Back to login page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;