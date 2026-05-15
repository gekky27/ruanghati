import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/AdminArticleDetail.css";

const AdminWeeklyReadDetail = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [article, setArticle] = useState({
    title: "",
    content: "",
    image: ""
  });

  const [newImage, setNewImage] = useState(null);

  // ================= FETCH =================

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {

    try {

      const res = await fetch(
        `http://localhost:5050/api/jeda-reads/${id}`
      );

      const data = await res.json();

      setArticle(data);

    } catch (err) {
      console.error(err);
    }
  };

  // ================= UPDATE =================

  const handleEdit = async () => {

    try {

      const formData = new FormData();

      formData.append("title", article.title);
      formData.append("content", article.content);

      if (newImage) {
        formData.append("image", newImage);
      }

      await fetch(
        `http://localhost:5050/api/jeda-reads/${id}`,
        {
          method: "PUT",
          body: formData
        }
      );

      alert("Updated!");

    } catch (err) {
      console.error(err);
    }
  };

  // ================= DELETE =================

  const handleDelete = async () => {

    try {

      await fetch(
        `http://localhost:5050/api/jeda-reads/${id}`,
        {
          method: "DELETE"
        }
      );

      navigate("/admin-jeda-dulu");

    } catch (err) {
      console.error(err);
    }
  };

  return (

    <div className="article-detail">

      {/* TITLE */}
      <input
        type="text"
        className="detail-title-input"
        value={article.title}
        onChange={(e) =>
          setArticle({
            ...article,
            title: e.target.value,
          })
        }
      />

      {/* IMAGE */}
      <img
        src={`http://localhost:5050${article.image}`}
        alt=""
        className="detail-image"
      />

      {/* CHANGE IMAGE */}
      <input
        type="file"
        onChange={(e) =>
          setNewImage(e.target.files[0])
        }
      />

      {/* CONTENT */}
      <textarea
        className="detail-textarea"
        value={article.content}
        onChange={(e) =>
          setArticle({
            ...article,
            content: e.target.value,
          })
        }
      />

      {/* BUTTONS */}
      <div className="detail-buttons">

        <button
          className="edit-btn"
          onClick={handleEdit}
        >
          Edit Content
        </button>

        <button
          className="trash-btn"
          onClick={handleDelete}
        >
          🗑
        </button>

      </div>

    </div>
  );
};

export default AdminWeeklyReadDetail;