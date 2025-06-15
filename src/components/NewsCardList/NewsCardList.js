import React, { useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  news,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
  onRemoveArticle,
}) {
  const [visibleCards, setVisibleCards] = useState(3);

  const showMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };

  const isArticleSaved = (article) => {
    return savedArticles.some(
      (savedArticle) => savedArticle.url === article.url
    );
  };

  if (news.length === 0) {
    return null; // Don't render anything if there are no news articles
  }

  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Search results</h2>
      <div className="news-card-list__cards">
        {news.slice(0, visibleCards).map((article) => (
          <NewsCard
            key={article.url}
            article={article}
            isLoggedIn={isLoggedIn}
            isSaved={isArticleSaved(article)}
            onSaveArticle={() => onSaveArticle(article)}
            onRemoveArticle={() => onRemoveArticle(article)}
          />
        ))}
      </div>
      {visibleCards < news.length && (
        <button className="news-card-list__button" onClick={showMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
