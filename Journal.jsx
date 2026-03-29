import React, { useState } from "react";
import "../style/Journal.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";

function Journal() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // 🆕 NEW JOURNAL
  const handleNew = () => {
    setTitle("");
    setText("");
    setImage(null);
  };

  // 🖼️ IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // 💾 SAVE (simulate backend)
  const handleSave = async () => {
    const data = {
      title,
      text,
      image,
      date: today,
    };

    console.log("Saving to database:", data);

    // simulate API
    alert("Journal saved successfully!");
  };

  return (
    <div className="journal-container">

      {/* HEADER */}
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

      {/* JOURNAL CARD */}
      <div className="journal-card">

        <h2 className="journal-date">{today}</h2>

        <input
          type="text"
          placeholder="Title..."
          className="journal-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your thoughts here..."
          className="journal-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {/* IMAGE UPLOAD */}
        <input type="file" onChange={handleImageUpload} />

        {image && (
          <img src={image} alt="preview" className="preview-image" />
        )}

        {/* BUTTONS */}
        <div className="button-group">
          <button onClick={handleNew} className="new-btn">
            New Journal
          </button>

          <button onClick={handleSave} className="save-btn">
            Save Entry
          </button>
        </div>

      </div>
    </div>
  );
}

export default Journal;