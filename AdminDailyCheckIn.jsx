import React, { useState, useEffect } from "react";
import "../style/AdminDailyCheckIn.css";
import { Link } from "react-router-dom";
import logo from "../logo.png";

const AdminDailyCheckIn = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [stats, setStats] = useState({});


  const fetchQuestions = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/questions");
  
      if (!res.ok) {
        console.error("Failed to fetch questions");
        return;
      }
  
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/emotions/stats");
      const data = await res.json();
  
      const formatted = {
        "Calm and Happy": 0,
        "Stable and Balanced": 0,
        "Anxious": 0,
        "Overwhelmed": 0,
        "Mixed Emotions": 0,
      };
  
      data.forEach((item) => {
        formatted[item._id] = item.count; // 🔥 IMPORTANT
      });
  
      setStats(formatted);
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchStats(); // ✅ MUST BE HERE
  }, []);

  // ✏️ Edit Question
  const handleEdit = async (id, value) => {
    await fetch(`http://localhost:5050/api/questions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value }),
    });
  
    fetchQuestions();
  };

  // ❌ Delete Question
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5050/api/questions/${id}`, {
      method: "DELETE",
    });
  
    fetchQuestions();
  };

  // ➕ Add Question
  const handleAdd = async () => {
    if (!newQuestion.trim()) return;
  
    await fetch("http://localhost:5050/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newQuestion }),
    });
  
    setNewQuestion("");
    fetchQuestions();
  };

  return (
    <div className="admin-checkin-page">
      <div className="blur-shape"></div>

      {/* Logo */}
      <div className="header">
      <div className="logo-container">
        <img src={logo} alt="Ruang Hati Logo" className="logo-image" />
      </div>

      <div className="navbar-wrapper">
        <nav className="navbar">
        <ul className="nav-links">
            <li><Link to="/admin">Admin Home</Link>
            </li>
            <li className="active"><Link to="/admincheckin">Edit Daily Check-in</Link></li>
            <li><Link to="/admin/jeda-dulu">Edit Jeda Dulu</Link></li>
            <li><Link to="/admin/ai-chatbot">Edit AI Chatbot</Link></li>
            <li><Link to="/gethelpadmin">Edit Get Help</Link></li>
          </ul>
        </nav>
      </div>
    </div>

      {/* Content */}
      <div className="admin-checkin-container">
        <h1>Edit Daily Check-In Questions</h1>

        {/* Question List */}
        <div className="question-list">
          {questions.map((q, index) => (
            <div key={q._id || index} className="question-item">
              <input
                type="text"
                value={q.text}
                onChange={(e) => handleEdit(q._id, e.target.value)}
              />

              <button
                className="delete-btn"
                onClick={() => handleDelete(q._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Add Question */}
        <div className="add-section">
          <input
            type="text"
            placeholder="Hai Admin, Click here to add question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        {/* 📊 EMOTION ANALYTICS TABLE */}
        <div className="stats-section">
          <h2>User Emotion Analytics</h2>

          <table className="stats-table">
            <thead>
              <tr>
                <th>Emotion</th>
                <th>Total Users</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Calm and Happy</td>
                <td>{stats["Calm and Happy"] || 0}</td>
              </tr>
              <tr>
                <td>Stable and Balanced</td>
                <td>{stats["Stable and Balanced"] || 0}</td>
              </tr>
              <tr>
                <td>Anxious</td>
                <td>{stats["Anxious"] || 0}</td>
              </tr>
              <tr>
                <td>Overwhelmed</td>
                <td>{stats["Overwhelmed"] || 0}</td>
              </tr>
              <tr>
                <td>Mixed Emotions</td>
                <td>{stats["Mixed Emotions"] || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDailyCheckIn;