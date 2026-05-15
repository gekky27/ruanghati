import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/GetHelp.css";
import logo from "../logo.png"; 

const GetHelp = () => {
  const isGuest = localStorage.getItem("guestMode") === "true";


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("guestMode");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="gethelp-container">
      {/* MATCHED LOGO STRATEGY FROM HOME */}
      <div className="header">
        <div className="logo-container">
            <img src={logo} alt="Ruang Hati Logo" className="logo-image" />
        </div>

        <div className="navbar-wrapper">
            <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li>
                {isGuest ? (
                <span
                  className="guest-disabled-link"
                  onClick={() =>
                    alert("Guest mode is view only")
                  }
                >
                  Daily Check-in
                </span>
              ) : (
                <Link to="/daily-checkin">
                  Daily Check-in
                </Link>
              )}
                  </li>
                <li ><Link to="/jeda-dulu">Jeda Dulu</Link></li>
                <li>
                {isGuest ? (
                <span
                  className="guest-disabled-link"
                  onClick={() =>
                    alert("Guest mode is view only")
                  }
                >
                  AI Chatbot
                </span>
              ) : (
                <Link to="/ai-chatbot">
                  AI Chatbot
                </Link>
              )}
                  </li>
                <li className="active" ><Link to="/get-help">Get Help</Link></li>
            </ul>
            </nav>
        </div>
         {/* LOGOUT */}
         <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Log out
        </button>
        </div>

      {/* MAIN CONTENT AREA */}
      <main className="gethelp-main-content">
        
        {/* HERO SECTION */}
        <div className="gethelp-hero">
          <h1 className="hero-main-text">
            Professional and <br /> emergency support <br /> when you need it <br /> most.
          </h1>
          <div className="hero-side-text">
            <h2>You are</h2>
            <h2 className="not-alone">NOT alone</h2>
          </div>
        </div>

        {/* CARDS SECTION */}
        <div className="cards-wrapper">
          
          {/* CARD 1: INDONESIA MENTAL HEALTH HOTLINE */}
          <div className="help-card">
            <h3 className="card-title underline">Indonesia Mental Health Hotline</h3>
            <div className="card-grid">
              <div className="contact-item">
                <strong>Halo Kemenkes</strong>
                <p>1500 567 (Telephone),</p>
                <p>+62 812 6050 0567 (WhatsApp)</p>
              </div>
              <div className="contact-item">
                <strong>SAPA (Sahabat Perempuan dan Anak)</strong>
                <p>08111 129 129 (WhatsApp)</p>
              </div>
              <div className="contact-item">
                <strong>BISA Helpline</strong>
                <p>+62-811-3855-472 (WhatsApp Only)</p>
              </div>
              <div className="contact-item">
                <strong>Yayasan Pulih</strong>
                <p>+62 811 8436 633 (WhatsApp)</p>
              </div>
              <div className="contact-item">
                <strong>Healing119.id</strong>
                <p>119 (choose 8) or healing119.id</p>
              </div>
              <div className="contact-item">
                <strong>UNHCR Health Hotline</strong>
                <p>0811 8161 511</p>
              </div>
              <div className="contact-item">
                <strong>Medina</strong>
                <p>082245924258</p>
              </div>
            </div>
          </div>

          {/* CARD 2: PROFESSIONALS */}
          <div className="help-card">
            <h3 className="card-title underline">Psychologists and Psychiatrists Contact Information</h3>
            <div className="pro-list">
              <div className="pro-item">
                <strong>Adrian Mizani - Psychologists</strong>
                <p>+62 81 73336735 (WhatsApp)</p>
                <p>agenius.fingerprint@gmail.com ( email)</p>
              </div>
              <div className="pro-item">
                <strong>Asti - Psychologists</strong>
                <p>+62 856 3849 221 (WhatsApp)</p>
              </div>
              <div className="pro-item">
                <strong>The Sunlight Center Psychologists & Psychiatrists Community</strong>
                <p>+62 812 3345 6715 (WhatsApp)</p>
              </div>
              <div className="pro-item">
                <strong>Gung Ratih - Psychologists</strong>
                <p>+62 895 3332 54242 (WhatsApp)</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="gethelp-footer">
        <p>
          The list of mental health professionals provided on this page is
          continuously updated. Additional contacts will be added over time to
          ensure users have access to reliable and relevant support services.
        </p>
      </footer>
    </div>
  );
};

export default GetHelp;