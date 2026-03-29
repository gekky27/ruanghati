import React from "react";
import "../style/WeeklyRead.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import articleImg from "../food.jpeg"; // 🔥 replace later with your real article image

function WeeklyRead() {
  const navigate = useNavigate();

  return (
    <div className="weekly-container">


      {/* CONTENT */}
      <div className="weekly-content">

        <h1 className="article-title">
          Finding Peace in Small Moments
        </h1>

        <img src={articleImg} alt="article" className="article-image" />

        <p className="article-text">
          Life often moves faster than we realize. In the middle of busy days,
          we forget to pause and appreciate the small, quiet moments that bring
          us peace.
        </p>

        <p className="article-text">
          Taking a deep breath, enjoying your favorite meal, or simply sitting
          in silence for a few minutes can help reset your mind. These small
          pauses are powerful — they allow you to reconnect with yourself.
        </p>

        <p className="article-text">
          This week, try to notice one small moment each day that makes you feel
          calm. Hold onto it. Let it ground you.
        </p>

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

      </div>
    </div>
  );
}

export default WeeklyRead;