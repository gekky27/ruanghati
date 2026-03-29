import React from "react";
import "../style/Home.css";
import { Link } from "react-router-dom";
import logo from "../logo.png"; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="header">
        <div className="logo-container">
            <img src={logo} alt="Ruang Hati Logo" className="logo-image" />
        </div>

        <div className="navbar-wrapper">
            <nav className="navbar">
            <ul className="nav-links">
                <li className="active"><Link to="/home">Home</Link></li>
                <li><Link to="/daily-checkin">Daily Check-in</Link></li>
                <li ><Link to="/jeda-dulu">Jeda Dulu</Link></li>
                <li><Link to="/ai-chatbot">AI chatbot</Link></li>
                <li><Link to="/get-help">Get Help</Link></li>
            </ul>
            </nav>
        </div>
        </div>

      {/* Main Content */}
      <main className="hero">
        {/* Background Decorative Element */}
        <div className="blur-circle"></div>
        
        <div className="hero-content">
          <h1 className="hero-text left">
            <em>Ruang Hati</em><br />is here
          </h1>

          <h1 className="hero-text right">
            Your space,<br />your pace.
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Home;