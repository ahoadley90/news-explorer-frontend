import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  news,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
  onRemoveArticle,
  searchQuery,
}) {
  const [visibleCards, setVisibleCards] = useState(3);

  const handleShowMore = () => {
    setVisibleCards((prevVisible) => prevVisible + 3);
  };

  return (
    <div className="news-card-list">
      <div className="news-card-list__cards">
        {news.slice(0, visibleCards).map((article) => (
          <NewsCard
            key={article.url}
            article={article}
            isLoggedIn={isLoggedIn}
            isSaved={savedArticles.some(
              (savedArticle) => savedArticle.url === article.url
            )}
            onSaveArticle={onSaveArticle}
            onRemoveArticle={onRemoveArticle}
            keyword={searchQuery}
          />
        ))}
      </div>
      {visibleCards < news.length && (
        <button className="news-card-list__button" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
