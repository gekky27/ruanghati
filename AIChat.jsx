import React, { useState } from "react";
import "../style/AIChat.css";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../logo.png";

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat/send",
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data.messages);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home-container">
      {/* Logo */}
      <div className="header">
        <div className="logo-container">
            <img src={logo} alt="Ruang Hati Logo" className="logo-image" />
        </div>

        <div className="navbar-wrapper">
            <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/daily-checkin">Daily Check-in</Link></li>
                <li ><Link to="/jeda-dulu">Jeda Dulu</Link></li>
                <li className="active"><Link to="/ai-chatbot">AI chatbot</Link></li>
                <li><Link to="/get-help">Get Help</Link></li>
            </ul>
            </nav>
        </div>
        </div>

      {/* Main Content */}
      <main className="hero">
        <div className="blur-circle"></div>

        <div className="chat-wrapper">
          <h1 className="chat-title">
            Hi, it's teman hati.<br />
            How are you today?
          </h1>

          <div className="chat-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "user" ? "user-msg" : "ai-msg"
                }
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="I am feeling..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIChat;