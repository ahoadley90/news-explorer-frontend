import React, { useState } from "react";
import "./NewsCard.css";
import SaveIcon from "../../images/Saveicon.svg";
import SavedIcon from "../../images/SavedIcon.svg";
import trashIcon from "../../images/trash.svg";

function NewsCard({
  article,
  isLoggedIn,
  isSaved,
  onSaveArticle,
  onRemoveArticle,
  keyword, // Add this prop
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

  const buttonIcon = isSaved ? SavedIcon : SaveIcon;
  const buttonTooltip = isLoggedIn
    ? isSaved
      ? "Remove from saved"
      : "Save article"
    : "Sign in to save articles";

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
          >
            <img
              src={buttonIcon}
              alt={buttonTooltip}
              className="news-card__save-icon"
            />
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
