import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getNews } from "../../utils/api";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { register, login, logout } from "../../utils/auth.js";
import "../../globals.css";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import SignUpModal from "../SignUpModal/SignUpModal";
import SignInModal from "../SignInModal/SignInModal";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isRegistrationSuccessModalOpen, setIsRegistrationSuccessModalOpen] =
    useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        setUserName(user.displayName || user.email);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("App: isLoggedIn changed to", isLoggedIn);
    console.log("App: currentUser changed to", currentUser);
  }, [isLoggedIn, currentUser]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError("Please enter a search term");
      return;
    }
    setIsLoading(true);
    setSearchError(null);
    setNews([]); // Clear existing articles before search
    try {
      console.log("Searching for:", searchQuery);
      const articles = await getNews(searchQuery);
      console.log("Received articles:", articles);
      setNews(articles);
    } catch (error) {
      console.error("Error searching news:", error);
      setSearchError(`Failed to fetch news: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = useCallback(async (email, password, username) => {
    try {
      await register(email, password, username);
      setIsSignUpModalOpen(false);
      setIsRegistrationSuccessModalOpen(true);
    } catch (error) {
      console.error("Sign up error:", error);
      alert(`Sign up failed: ${error.message}`);
    }
  }, []);

  const handleSignIn = useCallback(async (email, password) => {
    try {
      await login(email, password);
      setIsSignInModalOpen(false);
    } catch (error) {
      console.error("Sign in error:", error);
      alert(`Sign in failed: ${error.message}`);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Header
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignOut}
          userName={userName}
          onSignIn={() => setIsSignInModalOpen(true)}
          onSignUp={() => setIsSignUpModalOpen(true)}
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
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
        <Footer />
        <SignInModal
          isOpen={isSignInModalOpen}
          onClose={() => setIsSignInModalOpen(false)}
          onSignIn={handleSignIn}
          openSignUp={() => {
            setIsSignInModalOpen(false);
            setIsSignUpModalOpen(true);
          }}
        />
        <SignUpModal
          isOpen={isSignUpModalOpen}
          onClose={() => setIsSignUpModalOpen(false)}
          onSignUp={handleSignUp}
          openSignIn={() => {
            setIsSignUpModalOpen(false);
            setIsSignInModalOpen(true);
          }}
        />
        <RegistrationSuccessModal
          isOpen={isRegistrationSuccessModalOpen}
          onClose={() => setIsRegistrationSuccessModalOpen(false)}
          openSignIn={() => {
            setIsRegistrationSuccessModalOpen(false);
            setIsSignInModalOpen(true);
          }}
        />
      </div>
    </Router>
  );
}

export default App;
