import React, { useEffect, useState } from "react";
import "../style/AdminJedaDulu.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import warning from "../warning.png";

const AdminJedaDulu = () => {

  const [videos, setVideos] = useState([]);
  const [weeklyReads, setWeeklyReads] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    video: null
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  // ================= FETCH =================

  useEffect(() => {
    fetchVideos();
    fetchWeeklyReads();
  }, []);

  const fetchVideos = async () => {
    const res = await fetch("http://localhost:5050/api/jeda-videos");
    const data = await res.json();
    setVideos(data);
  };

  const fetchWeeklyReads = async () => {
    const res = await fetch("http://localhost:5050/api/jeda-reads");
    const data = await res.json();
    setWeeklyReads(data);
  };

  // ================= DELETE =================

  const deleteVideo = async (id) => {
    await fetch(`http://localhost:5050/api/jeda-videos/${id}`, {
      method: "DELETE",
    });

    fetchVideos();
  };

  const deleteRead = async (id) => {
    await fetch(`http://localhost:5050/api/jeda-reads/${id}`, {
      method: "DELETE",
    });

    fetchWeeklyReads();
  };

  // ================= UPLOAD =================

  const handleUpload = async () => {

    // ===== EMPTY CHECK =====
    const isTitleEmpty = !formData.title.trim();
    const isContentEmpty = !formData.content.trim();
    const isImageEmpty = !formData.image;
    const isVideoEmpty = !formData.video;
  
    // ===== VIDEO =====
    if (
      formType === "video" &&
      (
        isTitleEmpty ||
        isContentEmpty ||
        isImageEmpty ||
        isVideoEmpty
      )
    ) {
      setWarningMessage("Please input text or image to save");
      setShowWarning(true);
      return;
    }
  
    // ===== WEEKLY READ =====
    if (
      formType === "read" &&
      (
        isTitleEmpty ||
        isContentEmpty ||
        isImageEmpty
      )
    ) {
      setWarningMessage("Please input text or image to save");
      setShowWarning(true);
      return;
    }
  
    // ===== UPLOAD =====
  
    const data = new FormData();
  
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("image", formData.image);
    data.append("video", formData.video);
  
    let endpoint = "";
  
    if (formType === "video") {
      endpoint = "http://localhost:5050/api/jeda-videos";
    }
  
    if (formType === "read") {
      endpoint = "http://localhost:5050/api/jeda-reads";
    }
  
    await fetch(endpoint, {
      method: "POST",
      body: data
    });
  
    setShowForm(false);
  
    setFormData({
      title: "",
      content: "",
      image: null,
      video: null
    });
  
    fetchVideos();
    fetchWeeklyReads();
  };

  return (
    <div className="admin-jeda-container">

      {/* HEADER */}
      <div className="header">

        <div className="logo-container">
          <img src={logo} alt="" className="logo-image" />
        </div>

        <div className="navbar-wrapper">
          <nav className="navbar">
            <ul className="nav-links">

              <li>
                <Link to="/admin">Admin Home</Link>
              </li>

              <li>
              <Link to="/admincheckin">
                Edit Daily Check-in
              </Link>
             </li>

              <li className="active">
                <Link to="/admin-jeda-dulu">
                  Edit Jeda Dulu
                </Link>
              </li>

              <li>
              <Link to="/admin-ai-chatbot">
                Edit AI Chatbot
              </Link>
              </li>

            

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

      {/* ================= VIDEOS ================= */}

      <section className="article-section">

        <h2 className="manage-title">
          <i>Manage Jeda Videos</i>
        </h2>

        <div className="article-grid">

        {videos.map((item) => (
          <div
            key={item._id}
            className="article-card-wrapper"
          >

            <div className="article-card">

              {/* IMAGE */}
              <img
                src={`http://localhost:5050${item.image}`}
                alt=""
              />

              {/* VIDEO */}
              <video
                controls
                className="admin-video-player"
              >
                <source
                  src={`http://localhost:5050${item.video}`}
                  type="video/mp4"
                />
              </video>

              <p>{item.title}</p>

            </div>

            <button
              className="delete-btn"
              onClick={() => deleteVideo(item._id)}
            >
              🗑
            </button>

          </div>
        ))}

        </div>

    <button
      className="upload-btn"
          onClick={() => {
            setFormType("video");
            setShowForm(true);
          }}
        >
          Upload Video Content
        </button>

      </section>

      {/* ================= WEEKLY READ ================= */}

        <section className="article-section">

        <h2 className="manage-title">
          <i>Manage Weekly Read</i>
        </h2>

        <div className="article-grid">

        {weeklyReads.map((item) => (
          <div
            key={item._id}
            className="article-card-wrapper"
          >

            <Link
              to={`/admin/weekly-read/${item._id}`}
              className="article-card"
            >

              <img
                src={`http://localhost:5050${item.image}`}
                alt=""
              />

              <p>{item.title}</p>

            </Link>

            <button
              className="delete-btn"
              onClick={() => deleteRead(item._id)}
            >
              🗑
            </button>

          </div>
        ))}

        </div>

        {/* UPLOAD BUTTON */}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          <button
            className="upload-btn"
            onClick={() => {
              setFormType("read");
              setShowForm(true);
            }}
          >
            Upload Weekly Read
          </button>
        </div>

        </section>

      {/* ================= MODAL ================= */}

      {showForm && (
        <div className="modal-overlay">

          <div className="modal">

            <h2>
              {formType === "video"
                ? "Add Video"
                : "Add Weekly Read"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value
                })
              }
            />

            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: e.target.value
                })
              }
            />

            <input
              type="file"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.files[0]
                })
              }
            />

            {formType === "video" && (
              <input
                type="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    video: e.target.files[0]
                  })
                }
              />
            )}

            <div className="modal-actions">

              <button
                className="submit-btn"
                onClick={handleUpload}
              >
                Submit
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}
      {/* ===== WARNING POPUP ===== */}
      {showWarning && (
        <div
          className="warning-overlay"
          onClick={() => setShowWarning(false)}
        >
          <div className="warning-popup">

            <img
              src={warning}
              alt="warning"
              className="warning-icon"
            />

            <p>{warningMessage}</p>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJedaDulu;