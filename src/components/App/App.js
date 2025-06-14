import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getNews } from "../../utils/api";
import "../../globals.css";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchError(null);
    try {
      const articles = await getNews(searchQuery);
      setNews(articles);
    } catch (error) {
      console.error("Error searching news:", error);
      setSearchError("Failed to fetch news. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = (email, password) => {
    // Implement sign-in logic here
    console.log("Sign in with:", email, password);
    setIsLoggedIn(true);
    setUserName("John Doe"); // Replace with actual user name from authentication
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <Router>
      <div className="app">
        <Header
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignOut}
          userName={userName}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                onSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                news={news}
                isLoading={isLoading}
                searchError={searchError}
              />
            }
          />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
