import React from "react";
import "../style/Admin.css";
import { Link } from "react-router-dom";
import logo from "../logo.png";

const Admin = () => {
  return (
    <div className="admin-container">
      {/* Logo */}
      <div className="header">
      <div className="logo-container">
        <img src={logo} alt="Ruang Hati Logo" className="logo-image" />
      </div>

      <div className="navbar-wrapper">
        <nav className="navbar">
          <ul className="nav-links">
            <li className="active">
              <Link to="/admin">Admin Home</Link>
            </li>
            <li><Link to="/admincheckin">Edit Daily Check-in</Link></li>
            <li><Link to="/admin/jeda-dulu">Edit Jeda Dulu</Link></li>
            <li><Link to="/admin/ai-chatbot">Edit AI Chatbot</Link></li>
            <li><Link to="/gethelpadmin">Edit Get Help</Link></li>
          </ul>
        </nav>
      </div>
    </div>

      {/* Main Content */}
      <main className="hero">
        <div className="blur-circle"></div>

        <div className="hero-content">
          <h1 className="hero-text left">
            <em>Ruang Hati</em><br />Admin Panel
          </h1>

          <h1 className="hero-text right">
            Manage your<br />website content
          </h1>
        </div>

        
      </main>
    </div>
  );
};

export default Admin;