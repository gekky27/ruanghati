import React, { useState, useEffect } from "react";
import "../style/DailyCheckIn.css";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import calmImg from "../Calm.png";
import balanceImg from "../Balance.png";
import anxiousImg from "../anxious.png";
import overwhelmedImg from "../overwhelmed.png";
import mixedImg from "../mixed.png";


const DailyCheckIn = () => {
  const [step, setStep] = useState("start"); // start | questions | result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
        const res = await fetch("http://localhost:5050/api/questions");
        const data = await res.json();
        setQuestions(data.map(q => q.text));
        };
    
        fetchQuestions();
    }, []);



  const handleAnswer = (answer) => {
    const updated = [...answers, answer];
    setAnswers(updated);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const finalResult = calculateMood(updated);
    
      // SEND TO BACKEND
      fetch("http://localhost:5050/api/emotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood: finalResult.mood }),
      });
    
      setStep("result");
    }
  };

  // 🎯 Mood Logic
  const calculateMood = (answersData = answers) => {
    
    let certain = answersData.filter((a) => a === "certain").length;
    let yes = answersData.filter((a) => a === "yes").length;
    let no = answersData.filter((a) => a === "no").length;
    let maybe = answersData.filter((a) => a === "maybe").length;

    if (certain >= 6) {
      return {
        mood: "Calm and Happy",
        message:
          "You’re feeling energetic and cheerful today—your mood is in a really good place! It’s wonderful to see you shining. To keep this positive momentum going, why not capture this feeling so you can look back on it later? You could improve your mindfulness even more by sharing your thoughts in our Digital Journal or checking out a fun new tip on your Self-Care Dashboard",
        color: "#A3D65C",
      };
    } 
    if (yes >= 6) {
      return {
        mood: "Stable and Balanced",
        message:
          "You’re feeling steady and centered right now, which is a truly great place to be. It’s like finding a quiet, peaceful spot in the middle of a busy day. To stay this grounded, why not take a quick moment to reflect on what’s working well for you? A short entry in your Digital Journal or a quick browse through our daily wellness quotes could help you maintain this lovely sense of balance",
        color: "#60A5FA",
      };
    }
    if (maybe >= 6) {
      return {
        mood: "Anxious",
        message:
          "You might be feeling uncertain oIt seems like there’s a bit of a storm inside right now, and your mind or body might feel a little restless or 'on edge.' Please remember to breathe and be extra gentle with yourself. Why not try our 'AI Chatbot’ and ‘Jeda Dulu' toolkit? A quick guided breathing exercise or a grounding technique can help quiet the noise and bring you back to the present moment safely.r anxious. Try slowing down, breathe deeply, and take things one step at a time.",
        color: "#FBBF24",
      };
    }
    if (no >= 6) {
      return {
        mood: "Overwhelmed",
        message:
          "It feels like everything is weighing a bit too much right now, doesn't it? You’ve been carrying a lot, and it’s completely okay to admit that you’re tired. Right now, the kindest thing you can do is give yourself permission to pause. Head over to 'Jeda Dulu' for a calming video, or if things feel too heavy, visit our Emergency Support section to find a professional who can help you navigate this.",
        color: "#9CA3AF",
      };
    }
    // 🌿 fallback (if no category reaches 6)
    return {
      mood: "Mixed Emotions",
      message:
        "It sounds like things feel a bit heavy or quiet today, and I want you to know that’s perfectly okay. We all have days where the clouds linger a little longer than usual. You don't have to carry this alone—our AI Chatbot is always here for a cozy, judgment-free chat. Sometimes, just putting your feelings into words can help the sun peek through the clouds again.",
      color: "#D8B4FE",
    };
  };


  const result = calculateMood();

  const getMoodImage = () => {
    switch (result.mood) {
      case "Calm and Happy":
        return calmImg;
      case "Stable and Balanced":
        return balanceImg;
      case "Anxious":
        return anxiousImg;
      case "Overwhelmed":
        return overwhelmedImg;
      default:
        return mixedImg;
    }
  };

  return (
    <div className="checkin-page">
      {/* Logo */}
      <div className="header">
        <div className="logo-container">
            <img src={logo} alt="Ruang Hati Logo" className="logo-image" />
        </div>

        <div className="navbar-wrapper">
            <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li className="active"><Link to="/daily-checkin">Daily Check-in</Link></li>
                <li ><Link to="/jeda-dulu">Jeda Dulu</Link></li>
                <li><Link to="/ai-chatbot">AI chatbot</Link></li>
                <li><Link to="/get-help">Get Help</Link></li>
            </ul>
            </nav>
        </div>
        </div>

      {/* STEP 1: START */}
      {step === "start" && (
        <div className="start-section">
        <div className="blur-shape"></div>
      
        <h1>Check in with your feelings</h1>
        <p>Let’s understand your mood today</p>
      
        <button className="start-btn" onClick={() => setStep("questions")}>
          ▶
        </button>
      
        <span>Start Daily Check-in</span>
      </div>
      )}

      {/* STEP 2: QUESTIONS */}
      {step === "questions" && questions.length > 0 && (
        <div className="question-wrapper">
            <div className="question-card">

            <div className="question-header">
                question {currentQ + 1} of {questions.length}
            </div>

            <h2 className="question-text">
            {questions[currentQ] || "Loading..."}
            </h2>

            <div className="options">
                {["certain", "yes", "maybe", "no"].map((opt) => (
                <label key={opt} className="option-item">
                    <input
                    type="radio"
                    name={`question-${currentQ}`}
                    value={opt}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                    />
                    <span className="custom-radio"></span>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </label>
                ))}
            </div>
            {/* ✅ ADD THIS NEXT BUTTON */}
            <div
                className="next-btn"
                style={{ opacity: selected ? 1 : 0.5 }}
                onClick={() => {
                    if (!selected) return;
                    handleAnswer(selected);
                    setSelected(null);
                }}
                >
                →
                </div>

        </div>
    </div>
    )}

      {/* STEP 3: RESULT */}
      {step === "result" && (
        <div className="result-wrapper">
            <div className="result-content">

          <h1>Today, you're feeling...</h1>

          <div className="mood-circle">
            <img 
              src={getMoodImage(result.mood)} 
              alt={result.mood}
              className="mood-image"
            />
          </div>

          <h2>{result.mood}</h2>

          <p>{result.message}</p>
        </div>
        </div>
      )}
    </div>
   
  );
};

export default DailyCheckIn;