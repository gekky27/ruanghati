import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/JedaDulu.css";
import logo from "../logo.png";
import jedaImg from "../Jeda.png";     // ✅ ADD THIS
import pintuImg from "../Pintu.png";   // ✅ ADD THIS
import biruImg from "../biru.png"; // ✅ ADD THIS


function JedaDulu() {
  const navigate = useNavigate();
  const [weeklyReads, setWeeklyReads] = useState([]);

  const isGuest = localStorage.getItem("guestMode") === "true";

  const handleLogout = () => {
    localStorage.removeItem("guestMode");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };


  useEffect(() => {
    fetchWeeklyReads();
  }, []);
  
  const fetchWeeklyReads = async () => {
  
    try {
  
      const res = await fetch(
        "http://localhost:5050/api/jeda-reads"
      );
  
      const data = await res.json();
  
      setWeeklyReads(data);
  
    } catch (err) {
      console.error(err);
    }
  };
  
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
                <li className="active"><Link to="/jeda-dulu">Jeda Dulu</Link></li>
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
                <li><Link to="/get-help">Get Help</Link></li>
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

      {/* ✅ HERO SECTION REPLACED WITH IMAGE */}
      <section className="jeda-hero">
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

      {/* ACTIVITIES (NEW DESIGN) */}
        <section className="activities">

        <div className="breath-card">
        <img src={biruImg} alt="breathing background" className="breath-bg" />

        <div className="breath-overlay">
            <p className="breath-text">
            <span>Let’s breathe</span>
            <span>with us</span>
            </p>
        </div>
            <button className="start-jeda-btn"
                onClick={() => navigate("/jeda-session")}
                >
                <span>Start Jeda</span>
                <span>Session</span>
                </button>
        </div>
        

        </section>

      {/* WEEKLY READ */}
        <section className="weekly-read">

        <h1>This Week’s read</h1>

        {weeklyReads.map((item) => (

          <div
            key={item._id}
            className="read-card"
            onClick={() =>
              navigate(`/weeklyread/${item._id}`)
            }
          >

            <img
              src={`http://localhost:5050${item.image}`}
              alt=""
            />

            <p className="quote">
              {item.title}
            </p>

          </div>

        ))}

        </section>

    </div>
  );
}

export default JedaDulu;