import React, { useState } from "react";
import "../style/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import blueBg from "../blue.png";
import warningImg from "../warning.png"; // Import warning icon

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false); 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logic: If email is empty and warning hasn't been shown yet, show warning
    if (!formData.email && !showEmailWarning) {
      setShowEmailWarning(true);
      return; // Stop the first submission
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      setShowSuccess(true);
      setShowEmailWarning(false); 
    } catch (error) {
      console.error("Fetch error details:", error);
      alert(`Connection failed! Error: ${error.message}`);
    }
  };

  // Helper function to proceed without email
  const handleContinueWithoutEmail = () => {
  
    setShowEmailWarning(false);
  };

  return (
    <div className="signup-container">
      {/* EMAIL WARNING MODAL */}
      {showEmailWarning && (
        <div className="warning-overlay">
          <div className="warning-modal">
            <img src={warningImg} alt="Warning" className="warning-icon" />
            <h3>Email is not inputted</h3>
            <p>
              Ruang Hati respect your privacy, email is optional. 
              However, it’s required if you want to recover or reset your password.
            </p>
            <div className="warning-buttons">
              <button 
                type="button" 
                className="btn-continue" 
                onClick={handleContinueWithoutEmail}
              >
                Continue without email
              </button>
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={() => setShowEmailWarning(false)}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEFT PANEL */}
      <div className="signup-left" style={{ backgroundImage: `url(${blueBg})` }}>
        <h2>Get access to your<br />personal mental<br />health space</h2>
        <p className="welcome-text">
          welcome to <br />
          <span>Ruang Hati</span>
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="signup-right">
        <div className="signup-content-wrapper">
          {showSuccess && (
            <div className="signup-success-popup">
              Email verification has been sent to your email. Please check your email.
            </div>
          )}

          <h1 className="signup-title">Create an account</h1>
          <h2 className="signup-subtitle">No pressure. No judgment. Just a space for you.</h2>

          <form onSubmit={handleSubmit} className="signup-form">
            <label>Your name* (could be anonymous)</label>
            <input name="name" value={formData.name} onChange={handleChange} required />

            <label>Create Password*</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />

            <label>Your email (optional)</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            <div className="signup-actions">
              <button type="submit" className="floating-btn">Sign Up</button>
              <div className="switch-text">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;