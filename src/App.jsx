import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashBoard from "./Pages/DashBoard";
import LoginPage from "./Pages/LoginPage";
import JournalEntries from "./Pages/JournalEntries.jsx";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/entries" element={<JournalEntries/>}/>
      </Routes>
    </Router>

  );
};

export default App;