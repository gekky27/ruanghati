import React, { useEffect, useState } from "react";
import "../style/Admin.css";
import { Link, useNavigate } from "react-router-dom";

// Images
import logo from "../logo.png";
import bg from "../bg.png";
import warning from "../warning.png";

const Admin = () => {
  const [articles, setArticles] = useState([]);
  const [affirmations, setAffirmations] = useState([]);
  const [music, setMusic] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const [formType, setFormType] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchArticles();
    fetchAffirmations();
    fetchMusic();
  }, []);

  const fetchArticles = async () => {
    const res = await fetch("http://localhost:5050/api/articles");
    const data = await res.json();
    setArticles(data);
  };

  const fetchAffirmations = async () => {
    const res = await fetch("http://localhost:5050/api/affirmations");
    const data = await res.json();
    setAffirmations(data);
  };

  const fetchMusic = async () => {
    const res = await fetch("http://localhost:5050/api/music");
    const data = await res.json();
    setMusic(data);
  };

  // ================= DELETE =================
  const deleteArticle = async (id) => {
    await fetch(`http://localhost:5050/api/articles/${id}`, {
      method: "DELETE",
    });
    fetchArticles();
  };

  const deleteAffirmation = async (id) => {
    await fetch(`http://localhost:5050/api/affirmations/${id}`, {
      method: "DELETE",
    });
    fetchAffirmations();
  };

  const deleteMusic = async (id) => {
    await fetch(`http://localhost:5050/api/music/${id}`, {
      method: "DELETE",
    });
    fetchMusic();
  };

  // ================= Article  =================

  const handleUpload = async () => {

   // ===== CHECK EMPTY INPUT =====
   const isTitleEmpty = !formData.title.trim();
   const isContentEmpty = !formData.content.trim();
   const isImageEmpty = !formData.image;
 
   // ARTICLE
   if (
     formType === "article" &&
     (isTitleEmpty || isContentEmpty || isImageEmpty)
   ) {
     setWarningMessage("Please input text or image to save");
     setShowWarning(true);
     return;
   }
 
   // AFFIRMATION
   if (
     formType === "affirmation" &&
     (isTitleEmpty || isImageEmpty)
   ) {
     setWarningMessage("Please input text or image to save");
     setShowWarning(true);
     return;
   }
 
   // MUSIC
   if (
     formType === "music" &&
     (isTitleEmpty || isImageEmpty)
   ) {
     setWarningMessage("Please input text or image to save");
     setShowWarning(true);
     return;
   }
  
    const data = new FormData();
  
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("image", formData.image);
  
    let endpoint = "";
  
    if (formType === "article") {
      endpoint = "http://localhost:5050/api/articles";
    }
  
    if (formType === "affirmation") {
      endpoint = "http://localhost:5050/api/affirmations";
    }
  
    if (formType === "music") {
      endpoint = "http://localhost:5050/api/music";
    }
  
    try {
      await fetch(endpoint, {
        method: "POST",
        body: data
      });
  
      setShowForm(false);
  
      setFormData({
        title: "",
        content: "",
        image: null
      });
  
      fetchArticles();
      fetchAffirmations();
      fetchMusic();
  
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    <div className="admin-container">

      {/* ===== HEADER ===== */}
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="" className="logo-image" />
        </div>

        <div className="navbar-wrapper">
        <nav className="navbar">
          <ul className="nav-links">

            <li className="active">
              <Link to="/admin">Admin Home</Link>
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

      {/* ===== ARTICLE SECTION ===== */}
      <section className="article-section">
      <h2 className="manage-title">
        <i>Manage Article</i>
      </h2>

        <div className="article-grid">
          {articles.map((item) => (
            <div key={item._id} className="article-card-wrapper">

              <Link
                to={`/admin/article/${item._id}`}
                className="article-card"
              >
                <img src={`http://localhost:5050${item.image}`} />
                <p>{item.title}</p>
              </Link>

              {/* 🗑 DELETE */}
              <button
                className="delete-btn"
                onClick={() => deleteArticle(item._id)}
              >
                🗑
              </button>

            </div>
          ))}
        </div>

        {/* ✅ ✅ PUT UPLOAD BUTTON HERE (OUTSIDE MAP) */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button 
            className="upload-btn" 
            onClick={() => {
              setFormType("article");
              setShowForm(true);
            }}
          >
            upload content
          </button>
        </div>

      </section>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">

          <h2>
            {formType === "article" && "Add Article"}
            {formType === "affirmation" && "Add Affirmation"}
            {formType === "music" && "Add Music"}
          </h2>

            <input
              type="text"
              placeholder="Enter title..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            {formType === "article" && (
              <textarea
                className="article-editor"
                placeholder="Write content..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: e.target.value
                  })
                }
              />
            )}

            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />

            <div className="modal-actions">
              <button className="submit-btn" onClick={handleUpload}>
                Submit
              </button>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===== AFFIRMATION SECTION ===== */}
        <section className="affirmation-section">
        
        <h2 className="manage-title">
          <i>Today's</i><br />
          <i>Affirmation Card</i>
        </h2>

        <div className="affirmation-cards">

          {affirmations.map((item) => (
            <div key={item._id} className="affirmation-wrapper">

              <img
                src={`http://localhost:5050${item.image}`}
                alt=""
              />

              <button
                className="delete-btn"
                onClick={() => deleteAffirmation(item._id)}
              >
                🗑
              </button>

            </div>
          ))}

        </div>

        <div className="upload-center">
          <button
            className="upload-btn"
            onClick={() => {
              setFormType("affirmation");
              setShowForm(true);
            }}
          >
            Upload Affirmation
          </button>
        </div>

        </section>

      {/* ===== MUSIC SECTION ===== */}
      <section className="music-section">

      <h2 className="manage-title">
        <i>Manage Playlist</i><br />
        <i>recommendation</i>
      </h2>

      <div className="music-grid">

        {music.map((item) => (
          <div key={item._id} className="music-wrapper">

            <img
              src={`http://localhost:5050${item.image}`}
              alt=""
            />

            <button
              className="delete-btn"
              onClick={() => deleteMusic(item._id)}
            >
              🗑
            </button>

          </div>
        ))}

      </div>

      <div className="upload-center">
        <button
          className="upload-btn"
          onClick={() => {
            setFormType("music");
            setShowForm(true);
          }}
        >
          Upload Music
        </button>
      </div>

      </section>
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

export default Admin;