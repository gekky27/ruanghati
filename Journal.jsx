import React, { useEffect, useMemo, useState } from "react";
import "../style/Journal.css";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../logo.png";
import warningIcon from "../warning.png";

function Journal() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedJournalId, setSelectedJournalId] = useState(null);

  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [error, setError] = useState("");
  const isGuest = localStorage.getItem("guestMode") === "true";

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("guestMode");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const authHeaders = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  const resetForm = () => {
    setText("");
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(false);
    setError("");
    setSelectedJournalId(null);
    setIsEditMode(false);
  };

  const fetchJournals = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5050/api/journals", authHeaders);
      setJournals(res.data?.data || []);
    } catch (err) {
      console.error("Fetch journals error:", err);
      setError("Failed to load journals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleNew = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setRemoveImage(false);
    setError("");
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
  };

  const handleOpenEdit = async (journal) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5050/api/journals/${journal._id}`,
        authHeaders
      );

      const detail = res.data?.data;
      if (!detail) return;

      setIsEditMode(true);
      setSelectedJournalId(detail._id);
      setText(detail.text || "");
      setImageFile(null);
      setImagePreview(detail.imageUrl || null);
      setRemoveImage(false);
      setError("");
      setIsModalOpen(true);
    } catch (err) {
      console.error("Get journal detail error:", err);
      setError("Failed to load journal detail");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!text.trim() && !imageFile && !imagePreview) {
      setError("Please input text or image to save");
      return;
    }

    try {
      setSubmitLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("text", text);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (removeImage) {
        formData.append("removeImage", "true");
      }

      if (isEditMode && selectedJournalId) {
        await axios.put(
          `http://localhost:5050/api/journals/${selectedJournalId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:5050/api/journals", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await fetchJournals();
      handleCloseModal();
    } catch (err) {
      console.error("Save journal error:", err);
      setError(
        err?.response?.data?.error || "Failed to save journal"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (journalId) => {
    const confirmed = window.confirm("Delete this journal?");
    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:5050/api/journals/${journalId}`,
        authHeaders
      );

      await fetchJournals();

      if (selectedJournalId === journalId) {
        handleCloseModal();
      }
    } catch (err) {
      console.error("Delete journal error:", err);
      setError("Failed to delete journal");
    }
  };

  return (
    <div className="journal-container">
      <div className="header">
        <div className="logo-container">
          <img src={logo} alt="" className="logo-image" />
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
              <li className="active"><Link to="/journal">Journal</Link></li>
              <li><Link to="/get-help">Get Help</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      <section className="prompt-section">
        <h1>This Week’s<br />Journal Prompt</h1>

        <div className="prompt-text">
          <p>“How have I been feeling this week, and why?”</p>
          <p>“What did I learn about myself this week?”</p>
          <p>“What is one thing I’m grateful for right now?”</p>
          <p>“What emotions showed up most often for me lately?”</p>
          <p>“What is one small thing I did for myself recently?”</p>
        </div>

        <button className="new-btn-top" onClick={handleNew}>+ New</button>
      </section>

      <section className="journal-list-section">
        <div className="journal-list-header">
          <h3>My Journals</h3>
        </div>

        {loading ? (
          <div className="journal-empty-state">Loading journals...</div>
        ) : journals.length === 0 ? (
          <div className="journal-empty-state">
            No journals yet. Start your first one 🌿
          </div>
        ) : (
          <div className="journal-list">
            {journals.map((journal) => (
              <div key={journal._id} className="journal-item">
                <div
                  className="journal-item-left"
                  onClick={() => handleOpenEdit(journal)}
                >
                  <div className="journal-item-date">
                    {formatDate(journal.entryDate)}
                  </div>
                  <div className="journal-item-text">
                    {journal.text
                      ? journal.text
                      : "No written note for this journal."}
                  </div>
                </div>

                <div className="journal-item-divider"></div>

                <div className="journal-item-right">
                  <div
                    className="journal-item-image-wrap"
                    onClick={() => handleOpenEdit(journal)}
                  >
                    {journal.imageUrl ? (
                      <img
                        src={journal.imageUrl}
                        alt="journal"
                        className="journal-item-image"
                      />
                    ) : (
                      <div className="journal-item-no-image">No image</div>
                    )}
                  </div>

                  <div className="journal-item-actions">
                    <button
                      className="journal-edit-btn"
                      onClick={() => handleOpenEdit(journal)}
                    >
                      Edit
                    </button>
                    <button
                      className="journal-delete-btn"
                      onClick={() => handleDelete(journal._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {isModalOpen && (
        <div className="journal-modal-overlay" onClick={handleCloseModal}>
          <div
            className="journal-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="journal-modal-header">
              <h3>{isEditMode ? "Edit Journal" : "New Journal"}</h3>
              <button
                className="journal-modal-close"
                onClick={handleCloseModal}
              >
                ✕
              </button>
            </div>

            <div className="journal-editor">
              <div className="journal-left">
                <textarea
                  placeholder="Start writing here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <div className="journal-right">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" />
                ) : (
                  <div className="image-placeholder">No image</div>
                )}
              </div>
            </div>

            <div className="journal-actions">
              <div className="journal-actions-right">
                <input
                  id="journal-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden-file-input"
                />

                <label htmlFor="journal-image-upload" className="upload-image-btn action-btn">
                  Upload Image
                </label>

                {imagePreview && (
                  <button
                    type="button"
                    className="remove-image-btn action-btn"
                    onClick={handleRemoveImage}
                  >
                    Remove Image
                  </button>
                )}

                <button
                  className="save-btn action-btn"
                  onClick={handleSave}
                  disabled={submitLoading}
                >
                  {submitLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="error-popup">
          <img src={warningIcon} alt="warning" className="error-icon" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Journal;