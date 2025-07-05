import React, { useState, useEffect, useCallback, useMemo } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    currentUser: null,
    userName: "",
  });
  const [news, setNews] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [modals, setModals] = useState({
    isSignInModalOpen: false,
    isSignUpModalOpen: false,
    isRegistrationSuccessModalOpen: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(
        "Auth state changed:",
        user ? "User logged in" : "User logged out"
      );
      setAuthState((prevState) => ({
        ...prevState,
        isLoggedIn: !!user,
        currentUser: user,
        userName: user ? user.displayName || user.email : "",
      }));

      if (user) {
        // Load saved articles from localStorage
        const storedArticles = JSON.parse(
          localStorage.getItem("savedArticles") || "[]"
        );
        setSavedArticles(storedArticles);
      } else {
        setSavedArticles([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("App: isLoggedIn changed to", authState.isLoggedIn);
    console.log("App: currentUser changed to", authState.currentUser);
  }, [authState.isLoggedIn, authState.currentUser]);

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

  const handleSignIn = useCallback(async (email, password) => {
    try {
      await login(email, password);
      // The auth state change listener will update the state
    } catch (error) {
      console.error("Sign in error:", error);
      alert(`Sign in failed: ${error.message}`);
    }
  }, []);

  const handleSignUp = useCallback(async (email, password, username) => {
    try {
      await register(email, password, username);
      // The auth state change listener will update the state
    } catch (error) {
      console.error("Sign up error:", error);
      alert(`Sign up failed: ${error.message}`);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await logout();
      // The auth state change listener will update the state
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  const handleSaveArticle = useCallback(
    (articleToSave) => {
      setSavedArticles((prevArticles) => {
        const isAlreadySaved = prevArticles.some(
          (article) => article.url === articleToSave.url
        );
        if (!isAlreadySaved) {
          const updatedArticle = {
            ...articleToSave,
            _id: Date.now().toString(),
            keyword: searchQuery,
          };
          const updatedArticles = [...prevArticles, updatedArticle];
          localStorage.setItem(
            "savedArticles",
            JSON.stringify(updatedArticles)
          );
          return updatedArticles;
        }
        return prevArticles;
      });
    },
    [searchQuery]
  );

  const handleRemoveArticle = useCallback((articleToRemove) => {
    setSavedArticles((prevArticles) => {
      const updatedArticles = prevArticles.filter(
        (article) => article.url !== articleToRemove.url
      );
      localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
      return updatedArticles;
    });
  }, []);

  const toggleModal = useCallback((modalName, value) => {
    setModals((prev) => ({ ...prev, [modalName]: value }));
  }, []);

  const headerProps = useMemo(
    () => ({
      isLoggedIn: authState.isLoggedIn,
      onSignOut: handleSignOut,
      userName: authState.userName,
      onSignIn: handleSignIn,
      onSignUp: handleSignUp,
    }),
    [
      authState.isLoggedIn,
      authState.userName,
      handleSignOut,
      handleSignIn,
      handleSignUp,
    ]
  );

  const mainProps = useMemo(
    () => ({
      onSearch: handleSearch,
      searchQuery: searchQuery,
      setSearchQuery: setSearchQuery,
      news: news,
      isLoading: isLoading,
      searchError: searchError,
      isLoggedIn: authState.isLoggedIn,
      savedArticles: savedArticles,
      onSaveArticle: handleSaveArticle,
      onRemoveArticle: handleRemoveArticle,
    }),
    [
      handleSearch,
      searchQuery,
      setSearchQuery,
      news,
      isLoading,
      searchError,
      authState.isLoggedIn,
      savedArticles,
      handleSaveArticle,
      handleRemoveArticle,
    ]
  );

  const savedNewsProps = useMemo(
    () => ({
      savedArticles: savedArticles,
      userName: authState.userName,
      onRemoveArticle: handleRemoveArticle,
    }),
    [savedArticles, authState.userName, handleRemoveArticle]
  );

  return (
    <Router>
      <div className="app">
        <Header {...headerProps} />
        <Routes>
          <Route path="/" element={<Main {...mainProps} />} />
          <Route
            path="/saved-news"
            element={<SavedNews {...savedNewsProps} />}
          />
        </Routes>
        <Footer />
        <SignInModal
          isOpen={modals.isSignInModalOpen}
          onClose={() => toggleModal("isSignInModalOpen", false)}
          onSignIn={handleSignIn}
          openSignUp={() => {
            toggleModal("isSignInModalOpen", false);
            toggleModal("isSignUpModalOpen", true);
          }}
        />
        <SignUpModal
          isOpen={modals.isSignUpModalOpen}
          onClose={() => toggleModal("isSignUpModalOpen", false)}
          onSignUp={handleSignUp}
          openSignIn={() => {
            toggleModal("isSignUpModalOpen", false);
            toggleModal("isSignInModalOpen", true);
          }}
        />
        <RegistrationSuccessModal
          isOpen={modals.isRegistrationSuccessModalOpen}
          onClose={() => toggleModal("isRegistrationSuccessModalOpen", false)}
          openSignIn={() => {
            toggleModal("isRegistrationSuccessModalOpen", false);
            toggleModal("isSignInModalOpen", true);
          }}
        />
      </div>
    </Router>
  );
}

export default App;
