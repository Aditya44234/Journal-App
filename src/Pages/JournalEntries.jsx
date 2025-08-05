import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "./JournalEntries.css";
import { useNavigate } from "react-router-dom";
import UserBadge from "./UserBadge";

const JournalEntries = () => {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const user = getAuth().currentUser;
    if (!user) return;

    const q = query(
      collection(db, "journalEntries"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setEntries(data);
  };

  const handleClearEntries = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all entries?"
    );
    if (!confirmClear) return;

    try {
      const user = getAuth().currentUser;
      if (!user) return;

    const q = query(
  collection(db, "journalEntries"),
  where("userId", "==", user.uid),
  orderBy("timestamp", "desc")
);

      const snapshot = await getDocs(q);
      const deletePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "journalEntries", docSnap.id))
      );

      await Promise.all(deletePromises);
      setEntries([]);
      console.log("All entries deleted successfully.");
    } catch (error) {
      console.error("Error deleting entries:", error);
    }
  };

  const filteredEntries = selectedDate
    ? entries.filter((entry) => entry.date === selectedDate)
    : entries;

  return (
    <div className="journal-container">
      <UserBadge imageUrl={localStorage.getItem("UserPic")} />
      <h2 className="journal-heading">Your Journal Entries</h2>

      <div className="top-controls">
        <div className="left-controls">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
          />
        </div>
        <div className="right-controls">
          <button onClick={handleClearEntries} className="clear-button">
            Clear All Entries
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="clear-button"
          >
            Home
          </button>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <p className="no-entries">No entries found for selected date.</p>
      ) : (
        filteredEntries.map((entry) => (
          <div key={entry.id} className="entry-card">
            <h3>{entry.title}</h3>
            <p>{entry.entry}</p>
            <small>
              {new Date(entry.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default JournalEntries;
