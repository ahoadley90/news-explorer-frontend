import React, { useState } from "react";
import "./NewsCard.css";
import SaveIcon from "../../images/Saveicon.svg";
import SavedIcon from "../../images/SavedIcon.svg";
import TrashIcon from "../../images/trash.svg"; // Make sure you have this icon in your images folder

function NewsCard({
  article,
  isLoggedIn,
  isSaved,
  onSaveArticle,
  onRemoveArticle,
  keyword, // Add this prop
  isSavedNewsPage = false, // New prop to determine if we're on the saved news page
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000); // Hide tooltip after 3 seconds
    } else {
      if (isSaved) {
        onRemoveArticle(article);
      } else {
        onSaveArticle(article, keyword);
      }
    }
  };

  const getButtonContent = () => {
    if (!isLoggedIn) {
      return (
        <>
          <img
            src={SaveIcon}
            alt="Sign in to save articles"
            className="news-card__icon"
          />
          <span className="news-card__remove-text">
            Sign in to save articles
          </span>
        </>
      );
    } else if (isSavedNewsPage) {
      return (
        <>
          <img
            src={TrashIcon}
            alt="Remove from saved"
            className="news-card__icon news-card__icon_trash"
          />
          <span className="news-card__remove-text">Remove from saved</span>
        </>
      );
    } else {
      return (
        <img
          src={isSaved ? SavedIcon : SaveIcon}
          alt={isSaved ? "Remove from saved" : "Save article"}
          className="news-card__icon"
        />
      );
    }
  };

  const getButtonTooltip = () => {
    if (!isLoggedIn) {
      return "Sign in to save articles";
    } else if (isSavedNewsPage) {
      return "Remove from saved";
    } else {
      return isSaved ? "Remove from saved" : "Save article";
    }
  };

  return (
    <div className="news-card">
      <div className="news-card__image-container">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-card__image"
        />
        {isSaved && keyword && (
          <div className="news-card__keyword">{keyword}</div>
        )}
        <div className="news-card__save-container">
          {showTooltip && (
            <div className="news-card__tooltip">Sign in to save articles</div>
          )}
          <button
            className={`news-card__save-button ${
              isLoggedIn && isSaved ? "news-card__save-button_saved" : ""
            }`}
            onClick={handleSaveClick}
            title={getButtonTooltip()}
          >
            {getButtonContent()}
          </button>
        </div>
      </div>
      <div className="news-card__content">
        <p className="news-card__date">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">{article.description}</p>
        <p className="news-card__source">{article.source.name}</p>
      </div>
    </div>
  );
}

export default NewsCard;
