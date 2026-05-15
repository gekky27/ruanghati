import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/AdminArticleDetail.css";

const AdminArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5050/api/articles/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:5050/api/articles/${id}`, {
      method: "DELETE"
    });
    window.location.href = "/admin";
  };

  const handleEdit = async () => {
    await fetch(`http://localhost:5050/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article)
    });
    alert("Updated!");
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-detail">

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
      <img
        src={`http://localhost:5050${article.image}`}
        alt=""
        className="detail-image"
      />

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

export default AdminArticleDetail;