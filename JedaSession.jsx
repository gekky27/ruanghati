import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/JedaSession.css";


function JedaSession() {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [playVideo2, setPlayVideo2] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);
  
  const fetchVideos = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/jeda-videos");
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="session-container">

      {/* BACK BUTTON */}
      <div
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ←
      </div>

      {/* DYNAMIC VIDEOS */}
      {videos.map((item) => (
        <div key={item._id}>

          <div className="video-card">

          <video
            controls
            preload="metadata"
            poster={`http://localhost:5050${item.image}`}
            className="admin-video-player"
          >
            <source
              src={`http://localhost:5050${item.video}`}
              type="video/mp4"
            />

            Your browser does not support video.
          </video>

          </div>

          <p className="session-text">
            {item.title}
          </p>

        </div>
      ))}

    </div>
  );
}

export default JedaSession;