import React, { useEffect, useState } from "react";
import "../style/WeeklyRead.css";
import {
  useNavigate,
  useParams
} from "react-router-dom";

function WeeklyReadArticle() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {

    try {

      const res = await fetch(
        `http://localhost:5050/api/articles/${id}`
      );

      const data = await res.json();

      setArticle(data);

    } catch (err) {
      console.error(err);
    }
  };

  if (!article) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="weekly-container">

      <div className="weekly-content">

        <h1 className="article-title">
          {article.title}
        </h1>

        <img
          src={`http://localhost:5050${article.image}`}
          alt={article.title}
          className="article-image"
        />

        <p className="article-text">
          {article.content}
        </p>

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← 
        </button>

      </div>

    </div>
  );
}

export default WeeklyReadArticle;