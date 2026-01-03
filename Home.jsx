import React from "react";
import "../style/Home.css";
import logo from "../logo.png"; 

const Home = () => {
  return (
    <div className="home-container">
      {/* Logo placed separately to allow absolute positioning across screen sizes */}
      <div className="logo-absolute">
        <img src={logo} alt="Ruang Hati Logo" className="logo-image" />
      </div>

      {/* Navbar Wrapper for centering */}
      <div className="navbar-wrapper">
        <nav className="navbar">
          <ul className="nav-links">
            <li className="active">Home</li>
            <li>Daily Check-in</li>
            <li>Jeda Dulu</li>
            <li>AI chatbot</li>
            <li>Get Help</li>
          </ul>
        </nav>
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