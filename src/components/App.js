import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import SavedNews from "./SavedNews/SavedNews";
import Footer from "./Footer/Footer";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
