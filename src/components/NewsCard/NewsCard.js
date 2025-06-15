import React, { useState } from "react";
import "./NewsCard.css";
import SaveIcon from "../../images/Saveicon.svg";
import SavedIcon from "../../images/SavedIcon.svg";

function NewsCard({
  article,
  isLoggedIn,
  onSaveArticle,
  onRemoveArticle,
  isSaved,
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
        onSaveArticle(article);
      }
    }
  };

  return (
    <div className="news-card">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="news-card__image"
      />
      <button
        className={`news-card__save-button ${
          isLoggedIn && isSaved ? "news-card__save-button_saved" : ""
        }`}
        onClick={handleSaveClick}
      >
        {showTooltip && (
          <div className="news-card__tooltip">Sign in to save articles</div>
        )}
        <img
          src={isSaved ? SavedIcon : SaveIcon}
          alt={isSaved ? "Remove from saved" : "Save article"}
          className="news-card__save-icon"
        />
      </button>
      <div className="news-card__content">
        <p className="news-card__date">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source.name}</p>
      </div>
    </div>
  );
}

export default NewsCard;
