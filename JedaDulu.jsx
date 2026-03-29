import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/JedaDulu.css";
import logo from "../logo.png";
import jedaImg from "../Jeda.png";     // ✅ ADD THIS
import pintuImg from "../Pintu.png";   // ✅ ADD THIS
import foodImg from "../food.jpeg";   // ✅ ADD THIS


function JedaDulu() {
  const navigate = useNavigate();

  return (
    <div className="jeda-container">

      {/* ✅ LOGO (same as GetHelp) */}
      <div className="header">
        <div className="logo-container">
            <img src={logo} alt="Ruang Hati Logo" className="logo-image" />
        </div>

        <div className="navbar-wrapper">
            <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/daily-checkin">Daily Check-in</Link></li>
                <li className="active"><Link to="/jeda-dulu">Jeda Dulu</Link></li>
                <li><Link to="/ai-chatbot">AI chatbot</Link></li>
                <li><Link to="/get-help">Get Help</Link></li>
            </ul>
            </nav>
        </div>
        </div>

      {/* ✅ HERO SECTION REPLACED WITH IMAGE */}
      <section className="hero">
        <img src={jedaImg} alt="Jeda Dulu Hero" className="hero-image" />
      </section>

      {/* JOURNAL CTA */}
      <section className="journal-cta">
        {/* ✅ REPLACED SHAPE WITH IMAGE */}
        <img src={pintuImg} alt="Door visual" className="pintu-image" />

        <div className="cta-text">
          <h2>
            Release the weight of the day
            <br />— one sentence at a time.
          </h2>

          <p>
            Turn your feelings into stories in your private
            digital sanctuary.
          </p>

          <button onClick={() => navigate("/journal")}>
            Start Journaling
          </button>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="activities">
        <h1>Let’s breathe<br />with us</h1>

        <div className="activity-cards">
          <div
            className="activity-card pink"
            onClick={() => navigate("/activities")}
          ></div>

          <div
            className="activity-card blue"
            onClick={() => navigate("/activities")}
          ></div>
        </div>

        <p className="activity-text">
          A small activities can make a difference, try these.....
        </p>
      </section>

      {/* WEEKLY READ */}
      <section className="weekly-read">
        <h1>This Week’s read</h1>

        <div
          className="read-card"
          onClick={() => navigate("/weeklyread")}
        >
          <img src={foodImg} alt="weekly read" />
        </div>

        <p className="quote">
          See the good in everything and the good will look for you too
        </p>
      </section>

    </div>
  );
}

export default JedaDulu;