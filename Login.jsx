import React, { useState } from "react";
import "../style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import blueBg from "../blue.png";
import bellIcon from "../1.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");


    // ✅ ADMIN LOGIN (HARDCODED)
    if (formData.name === "admin" && formData.password === "admin") {
      localStorage.setItem("role", "admin"); // store role
      navigate("/admin"); // redirect to admin page
      return;
    }

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
    // ===== GUEST MODE =====
    const handleGuestMode = () => {
      localStorage.setItem("guestMode", "true");
      navigate("/home");
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
            <div className="login-buttons">

            <div className="login-buttons">

              <button
                type="submit"
                className="floating-btn"
              >
                Log In
              </button>

              <div className="guest-btn-wrapper">

                <button
                  type="button"
                  className="guest-btn"
                  onClick={handleGuestMode}
                >
                  Continue as Guest
                </button>

                <button
                  type="button"
                  className="bell-btn"
                  onClick={() => setShowGuestPopup(true)}
                >
                  <img src={bellIcon} alt="bell" />
                </button>

              </div>
              {showGuestPopup && (
                <div
                  className="guest-popup-overlay"
                  onClick={() => setShowGuestPopup(false)}
                >
                  <div className="guest-popup">
                    <h3 className="guest-popup-title">Privacy Notice & User Agreement</h3>

                    <p className="guest-popup-text">
                      By creating an account in <strong>Ruang Hati</strong>, you agree that
                      your personal data and activity within the platform, including your
                      journaling entries, may be collected, stored, and securely managed in the
                      Ruang Hati database to support platform features and improve user
                      experience.
                    </p>

                    <p className="guest-popup-text">
                      Your information will be handled with care and used in accordance with the
                      Ruang Hati Privacy Policy. By continuing to register, you acknowledge and
                      agree to these terms and conditions.
                    </p>
                  </div>
                </div>
              )}
              </div>

              </div>
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