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
    const checkAuthState = () => {
      const user = auth.currentUser;
      console.log("Current auth state:", user ? "Logged in" : "Logged out");
      console.log("Current user:", JSON.stringify(user, null, 2));
    };

    checkAuthState();
    const unsubscribe = auth.onAuthStateChanged(checkAuthState);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("App: isLoggedIn changed to", isLoggedIn);
    console.log("App: currentUser changed to", currentUser);
  }, [isLoggedIn, currentUser]);

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

  const handleSignUp = async (email, password, username) => {
    try {
      const user = await register(email, password, username);
      console.log("Registration successful:", user);
      setIsSignUpModalOpen(false);
      setIsRegistrationSuccessModalOpen(true);
      // Don't set isLoggedIn or currentUser here, let the onAuthStateChanged listener handle it
    } catch (error) {
      console.error("Registration error:", error.message);
      alert(`Sign up failed: ${error.message || "Unknown error occurred"}`);
    }
  };

  const handleSignIn = useCallback(async (email, password) => {
    try {
      console.log("Attempting to sign in with email:", email);
      const userCredential = await login(email, password);
      console.log(
        "Sign in successful, userCredential:",
        JSON.stringify(userCredential, null, 2)
      );

      const user = userCredential.user;
      console.log("User object:", JSON.stringify(user, null, 2));

      // Force a re-render
      setIsLoggedIn(true);
      setCurrentUser(user);
      setUserName(user.displayName || user.email || "User");

      console.log("Updated state after sign in:");
      console.log("isLoggedIn:", true);
      console.log("currentUser:", JSON.stringify(user, null, 2));
      console.log("userName:", user.displayName || user.email || "User");

      // Close the modal after successful login
      setIsSignInModalOpen(false);
    } catch (error) {
      console.error("Sign in error:", error);
      console.error("Full error object:", JSON.stringify(error, null, 2));
      alert(`Sign in failed: ${error.message || "Unknown error occurred"}`);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await logout();
      // The auth state listener will update isLoggedIn and currentUser
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
              />
            }
          />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
        <Footer />
        <SignUpModal
          isOpen={isSignUpModalOpen}
          onClose={() => setIsSignUpModalOpen(false)}
          onSignUp={handleSignUp}
          openSignIn={() => {
            setIsSignUpModalOpen(false);
            setIsSignInModalOpen(true);
          }}
        />
        <SignInModal
          isOpen={isSignInModalOpen}
          onClose={() => setIsSignInModalOpen(false)}
          onSignIn={handleSignIn}
          openSignUp={() => {
            setIsSignInModalOpen(false);
            setIsSignUpModalOpen(true);
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
