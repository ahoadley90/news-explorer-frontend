import React, { useState } from "react";
import "./NewsCard.css";
import saveIcon from "../../images/Saveicon.svg";

function NewsCard({ article, isLoggedIn }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000); // Hide tooltip after 3 seconds
    } else {
      setIsSaved(!isSaved);
      // Implement save functionality here
      console.log("Article saved");
    }
  };

  return (
    <div className="news-card">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="news-card__image"
      />
      <div
        className={`news-card__save-button ${
          isLoggedIn && isSaved ? "news-card__save-button_saved" : ""
        }`}
        onClick={handleSaveClick}
      >
        {showTooltip && (
          <div className="news-card__tooltip">Sign in to save articles</div>
        )}
        <img src={saveIcon} alt="Save article" />
      </div>
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
