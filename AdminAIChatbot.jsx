import React, { useState } from "react";
import "../style/AdminAIChatbot.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";

const AdminAIChatbot = () => {
  const navigate = useNavigate();
  const [notif, setNotif] = useState("");

  // ===== KNOWLEDGE BASE =====
  const [knowledgeBase, setKnowledgeBase] = useState([
    {
      id: 1,
      title: "Anxiety",
      content:
        "Slow breathing\n\nBreathe in slowly for 4 seconds, hold for 4 seconds, and breathe out for 6 seconds.\n\nRepeat a few times.",
      isEditing: false,
    },

    {
      id: 2,
      title: "Overthinking",
      content:
        "Pause and label.\n\nSay to yourself:\n'I’m overthinking right now.'",
      isEditing: false,
    },

    {
      id: 3,
      title: "Stress",
      content:
        "Body reset.\n\nUnclench your jaw, drop your shoulders, and take a slow deep breath.",
      isEditing: false,
    },

    {
      id: 4,
      title: "Low Motivation",
      content:
        "Start tiny.\n\nPick the smallest possible task and do it for 5 minutes.",
      isEditing: false,
    },
  ]);

  // ===== EDIT =====
  const handleEdit = (id) => {
    setKnowledgeBase(
      knowledgeBase.map((card) =>
        card.id === id
          ? { ...card, isEditing: true }
          : card
      )
    );
  };

  // ===== SAVE =====
  const handleSave = (id) => {
    const cardToSave = knowledgeBase.find((card) => card.id === id);
  
    if (!cardToSave.title.trim() || !cardToSave.content.trim()) {
      setNotif("Please insert topic and knowledge before saving.");
      setTimeout(() => setNotif(""), 2500);
      return;
    }
  
    setKnowledgeBase(
      knowledgeBase.map((card) =>
        card.id === id ? { ...card, isEditing: false } : card
      )
    );
  
    setNotif("Knowledge base updated!");
    setTimeout(() => setNotif(""), 2000);
  };

  // ===== DELETE =====
  const handleDelete = (id) => {
    setKnowledgeBase(
      knowledgeBase.filter((card) => card.id !== id)
    );
  };

  // ===== CHANGE =====
  const handleChange = (id, field, value) => {
    setKnowledgeBase(
      knowledgeBase.map((card) =>
        card.id === id
          ? { ...card, [field]: value }
          : card
      )
    );
  };

  // ===== ADD CARD =====
  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      title: "New Topic",
      content: "Write knowledge here...",
      isEditing: true,
    };

    setKnowledgeBase([...knowledgeBase, newCard]);
  };

  // ===== LOGOUT =====
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="admin-ai-page">

      {/* ===== HEADER ===== */}
        <div className="header">

        {/* LOGO */}
        <div className="logo-container-ai">
        <img
            src={logo}
            alt="logo"
            className="logo-image-ai"
        />
        </div>

        {/* NAVBAR */}
        <div className="navbar-wrapper">

        <nav className="navbar">

            <ul className="nav-links">

            <li>
                <Link to="/admin">
                Admin Home
                </Link>
            </li>

            <li>
                <Link to="/admincheckin">
                Edit Daily Check-in
                </Link>
            </li>

            <li>
                <Link to="/admin-jeda-dulu">
                Edit Jeda Dulu
                </Link>
            </li>

            <li className="active">
                <Link to="/admin-ai-chatbot">
                Edit AI Chatbot
                </Link>
            </li>

        

            </ul>

        </nav>

        </div>

        {/* LOGOUT */}
        <button
        className="logout-btn-ai"
        onClick={handleLogout}
        >
        Log out
        </button>

        </div>

      {/* ===== TITLE ===== */}
      <h1 className="admin-ai-title">
        Knowledge Base
      </h1>

      {notif && (
        <div className="admin-ai-notif">
          {notif}
        </div>
      )}

      {/* ===== GRID ===== */}
      <div className="admin-ai-grid">

        {knowledgeBase.map((card) => (
          <div
            key={card.id}
            className="admin-ai-card"
          >

            {/* TITLE */}
            {card.isEditing ? (
              <input
                type="text"
                className="admin-ai-title-input"
                value={card.title}
                onChange={(e) =>
                  handleChange(
                    card.id,
                    "title",
                    e.target.value
                  )
                }
              />
            ) : (
              <h2 className="admin-ai-card-title">
                {card.title}
              </h2>
            )}

            {/* CONTENT */}
            {card.isEditing ? (
              <textarea
                className="admin-ai-textarea"
                value={card.content}
                onChange={(e) =>
                  handleChange(
                    card.id,
                    "content",
                    e.target.value
                  )
                }
              />
            ) : (
              <p className="admin-ai-content">
                {card.content}
              </p>
            )}

            {/* BUTTONS */}
            <div className="admin-ai-buttons">

              <button
                className="admin-ai-edit-btn"
                onClick={() => handleEdit(card.id)}
              >
                Edit
              </button>

              <button
                className="admin-ai-save-btn"
                onClick={() => handleSave(card.id)}
              >
                Save
              </button>

              <button
                className="admin-ai-delete-btn"
                onClick={() => handleDelete(card.id)}
              >
                🗑
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* ===== ADD BUTTON ===== */}
      <div className="admin-ai-add-wrapper">

        <button
          className="admin-ai-add-btn"
          onClick={handleAddCard}
        >
          + Add Knowledge Card
        </button>

      </div>

    </div>
  );
};

export default AdminAIChatbot;