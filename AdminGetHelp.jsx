import React from "react";
import { Link } from "react-router-dom";
import "../style/AdminGetHelp.css";
import logo from "../logo.png"; 

const AdminGetHelp = () => {
  return (
    <div className="admin-gethelp-container">

      {/* LOGO */}
      <div className="header">
      <div className="logo-container">
        <img src={logo} alt="Ruang Hati Logo" className="logo-image" />
      </div>

      <div className="navbar-wrapper">
        <nav className="navbar">
        <ul className="nav-links">
            <li><Link to="/admin">Admin Home</Link>
            </li>
            <li ><Link to="/admincheckin">Edit Daily Check-in</Link></li>
            <li ><Link to="/admin/jeda-dulu">Edit Jeda Dulu</Link></li>
            <li><Link to="/admin/ai-chatbot">Edit AI Chatbot</Link></li>
            <li className="active"><Link to="/gethelpadmin">Edit Get Help</Link></li>
          </ul>
        </nav>
      </div>
    </div>

      {/* MAIN CONTENT */}
      <main className="gethelp-main-content">
        
        {/* HERO */}
        <div className="gethelp-hero">
          <h1 className="hero-main-text">
            Manage and update <br /> support resources <br /> for users.
          </h1>

          <div className="hero-side-text">
            <h2>Admin</h2>
            <h2 className="not-alone">CONTROL PANEL</h2>
          </div>
        </div>

        {/* CARDS */}
        <div className="cards-wrapper">

          {/* CARD 1 */}
          <div className="help-card">
            <h3 className="card-title underline">Indonesia Mental Health Hotline</h3>

            <div className="card-grid">
              <div className="contact-item">
                <strong>Halo Kemenkes</strong>
                <p>1500 567 (Telephone)</p>
                <p>+62 812 6050 0567 (WhatsApp)</p>
              </div>

              <div className="contact-item">
                <strong>SAPA</strong>
                <p>08111 129 129 (WhatsApp)</p>
              </div>

              <div className="contact-item">
                <strong>BISA Helpline</strong>
                <p>+62-811-3855-472</p>
              </div>

              <div className="contact-item">
                <strong>Yayasan Pulih</strong>
                <p>+62 811 8436 633</p>
              </div>

              <div className="contact-item">
                <strong>Healing119</strong>
                <p>119 (press 8)</p>
              </div>

              <div className="contact-item">
                <strong>UNHCR Hotline</strong>
                <p>0811 8161 511</p>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="help-card">
            <h3 className="card-title underline">
              Psychologists & Psychiatrists
            </h3>

            <div className="pro-list">
              <div className="pro-item">
                <strong>Adrian Mizani</strong>
                <p>+62 81 73336735</p>
                <p>agenius.fingerprint@gmail.com</p>
              </div>

              <div className="pro-item">
                <strong>Asti</strong>
                <p>+62 856 3849 221</p>
              </div>

              <div className="pro-item">
                <strong>The Sunlight Center</strong>
                <p>+62 812 3345 6715</p>
              </div>

              <div className="pro-item">
                <strong>Gung Ratih</strong>
                <p>+62 895 3332 54242</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="gethelp-footer">
        <p>
          Admin can update and manage mental health resources here.
          Keep information accurate and helpful for users.
        </p>
      </footer>

    </div>
  );
};

export default AdminGetHelp;