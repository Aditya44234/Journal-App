import React, { useState, useRef } from "react";
import "./Dashboard.css";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserBadge from "./UserBadge";


const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("User");
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const textareaRef = useRef(null);




  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getAuth().currentUser;
    if (!user) {
      alert("User not  authenticated");
      return;
    }
    const journalData = {
      userId: user.uid,
      title,
      entry,
      date,
      timestamp: Timestamp.fromDate(new Date())
    };

    try {
      await addDoc(collection(db, "journalEntries"), journalData);
      console.log("Journal Entries saved: ", journalData);
      alert("Journal saved successfully!");
      setTitle("");
      setEntry("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "120px"; // Reset height
      }
    } catch (error) {
      console.error("Error saving journal entry", error);
      alert("Failed to save entry. Please try again")
    }

  };



  return (
    <div className="dashboard-container">
       <div className="top-right">
       <UserBadge  imageUrl={localStorage.getItem("UserPic")} />

      </div>

      <h2 className="dashboard-heading">Welcome, {userName} 👋</h2>

      <p className="journal-prompt">
        Take a deep breath. Reflect. Write your journal below — this space is just for you.
      </p>
      {/*  Form containing date ,Title, Journal textarea */}
      <form className="journal-form" onSubmit={handleSubmit}>

        <div className="title-date">

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="journal-title"
            // ref={titleRef} 
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="journal-date"
            required

          />
        </div>
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          placeholder="Write your journal entry..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="journal-textarea"
          required
        />
        <button type="submit" className="journal-submit">Save Entry</button>
        <button onClick={() => navigate("/entries")} className="journal-submit">📖 View My Entries</button>

      </form>
    </div>
  );
};

export default Dashboard;