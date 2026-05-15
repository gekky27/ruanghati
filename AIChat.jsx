import React, { useEffect, useState } from "react";
import "../style/AIChat.css";
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios";
import logo from "../logo.png";

const DEFAULT_MESSAGES = [
  {
    role: "assistant",
    content: "Hi, it's Teman Hati. I'm here to listen. How are you feeling today?",
  },
];

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const [unsaved, setUnsaved] = useState(false);
  const [savedChats, setSavedChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const navigate = useNavigate();
  const [chatStopped, setChatStopped] = useState(false);

  const isGuest = localStorage.getItem("guestMode") === "true";

  const handleLogout = () => {
    localStorage.removeItem("guestMode");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // mode:
  // "draft" = chat baru / belum disimpan
  // "saved" = sedang melihat chat history, read only
  const [mode, setMode] = useState("draft");

  const token = localStorage.getItem("token");

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchChatHistories = async () => {
    try {
      setHistoryLoading(true);

      const res = await axios.get("http://localhost:5050/api/chat", authHeaders);

      setSavedChats(res.data?.data || []);
    } catch (err) {
      console.error("Fetch chat histories error:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchChatDetail = async (chatId) => {
    try {
      setDetailLoading(true);
      setSelectedChatId(chatId);
      setMode("saved");

      const res = await axios.get(
        `http://localhost:5050/api/chat/${chatId}`,
        authHeaders
      );

      const chat = res.data?.data;

      if (chat?.messages?.length) {
        setMessages(chat.messages);
      } else {
        setMessages([]);
      }

      setUnsaved(false);
      setMessage("");
    } catch (err) {
      console.error("Fetch chat detail error:", err);
      alert("Failed to load chat detail");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleNewChat = () => {
    setMode("draft");
    setSelectedChatId(null);
    setMessages(DEFAULT_MESSAGES);
    setMessage("");
    setUnsaved(false);
    setChatStopped(false);
  };

  const sendMessage = async () => {
    if (!message.trim() || loading || mode === "saved" || chatStopped) return;

    const userMessage = {
      role: "user",
      content: message.trim(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);
    setUnsaved(true);

    try {
      const res = await axios.post(
        "http://localhost:5050/api/chat/send",
        {
          message: userMessage.content,
          history: messages,
        },
        authHeaders
      );

      const responseData = res.data?.data || {};
      const botReply =
        responseData.reply ||
        res.data?.reply ||
        res.data?.message ||
        "I'm here with you. Could you tell me more about how you're feeling?";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: botReply,
        },
      ]);

      setUnsaved(true);
      console.log("Chat response data:", responseData);
      if (responseData.stopChat) {
        setChatStopped(true);

        if (responseData.redirectToGetHelp) {
          setTimeout(() => {
            navigate("/get-help");
          }, 1800);
        }
      }
    } catch (err) {
      const apiError = err?.response?.data;

      let errorMessage = "Sorry, something went wrong. Please try again.";

      if (apiError?.code === "insufficient_quota") {
        errorMessage =
          "Teman Hati is temporarily unavailable because the AI service quota has run out.";
      } else if (apiError?.code === "rate_limit_exceeded") {
        errorMessage =
          "Too many requests right now. Please try again in a moment.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
      setUnsaved(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChat = async () => {
    if (!messages.length || saving || !unsaved || mode === "saved") return;

    const confirmed = window.confirm("Would you like to save this chat?");
    if (!confirmed) return;

    try {
      setSaving(true);

      const res = await axios.post(
        "http://localhost:5050/api/chat/save",
        { messages },
        authHeaders
      );

      const savedId = res.data?.data?.id;

      setUnsaved(false);

      await fetchChatHistories();

      if (savedId) {
        await fetchChatDetail(savedId);
      } else {
        setMode("saved");
      }

      alert("Chat saved successfully");
    } catch (err) {
      console.error("Save chat error:", err);
      alert("Failed to save chat");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteChat = async (chatId) => {
    const confirmed = window.confirm("Delete this saved chat?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5050/api/chat/${chatId}`, authHeaders);

      if (selectedChatId === chatId) {
        handleNewChat();
      }

      await fetchChatHistories();
    } catch (err) {
      console.error("Delete chat error:", err);
      alert("Failed to delete chat");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    fetchChatHistories();
  }, []);

  return (
    <div className="home-container">
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
              <li><Link to="/jeda-dulu">Jeda Dulu</Link></li>
              <li className="active"><Link to="/ai-chatbot">AI chatbot</Link></li>
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

      <main className="hero">
        <div className="blur-circle"></div>

        <div className="chat-page-layout">
          {/* Sidebar History */}
          <aside className="chat-history-sidebar">
            <div className="chat-history-header">
              <h3>Saved Chats</h3>
              <button className="new-chat-btn" onClick={handleNewChat}>
                + New Chat
              </button>
            </div>

            {historyLoading ? (
              <div className="chat-history-empty">Loading chats...</div>
            ) : savedChats.length === 0 ? (
              <div className="chat-history-empty">No saved chats yet.</div>
            ) : (
              <div className="chat-history-list">
                {savedChats.map((chat) => (
                  <div
                    key={chat._id}
                    className={`chat-history-item ${
                      selectedChatId === chat._id ? "active" : ""
                    }`}
                  >
                    <div
                      className="chat-history-content"
                      onClick={() => fetchChatDetail(chat._id)}
                    >
                      <div className="chat-history-title">{chat.title}</div>
                      <div className="chat-history-meta">
                        {chat.totalMessages} messages
                      </div>
                    </div>

                    <button
                      className="chat-history-delete"
                      onClick={() => handleDeleteChat(chat._id)}
                      title="Delete chat"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </aside>

          {/* Main Chat */}
          <div className="chat-wrapper">
            <h1 className="chat-title">
              Hi, it's Teman Hati.
              <br />
              How are you today?
            </h1>

            <p className="chat-subtitle">
              Teman Hati is here to listen and support you, but it is not a
              replacement for professional mental health care.
            </p>

            {chatStopped && (
              <div className="chat-crisis-banner">
                This conversation has been paused for your safety. You will be redirected
                to Get Help so you can contact professional support.
              </div>
            )}

            {mode === "saved" && (
              <div className="chat-readonly-banner">
                This chat has been saved and is now read-only. Start a new chat
                to continue talking.
              </div>
            )}

            <div className="chat-container">
              {detailLoading ? (
                <div className="ai-msg">Loading chat...</div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={msg.role === "user" ? "user-msg" : "ai-msg"}
                  >
                    {msg.content}
                  </div>
                ))
              )}

              {loading && mode === "draft" && (
                <div className="ai-msg typing-msg">Teman Hati is typing...</div>
              )}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder={
                  chatStopped
                    ? "Chat stopped for safety"
                    : mode === "saved"
                    ? "This saved chat is read-only"
                    : "I am feeling..."
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading || mode === "saved" || chatStopped}
              />

              <button
                onClick={sendMessage}
                disabled={loading || !message.trim() || mode === "saved" || chatStopped}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </main>

      {mode === "draft" && messages.length > 1 && !chatStopped && (
        <button
          className={`floating-save-btn ${unsaved ? "show" : ""}`}
          onClick={handleSaveChat}
          disabled={saving || !unsaved}
        >
          {saving ? "Saving..." : "Save Chat"}
        </button>
      )}
    </div>
  );
};

export default AIChat;