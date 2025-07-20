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
    <section className="news-card-list">
      <h2 className="news-card-list__title">Search results</h2>
      <ul className="news-card-list__cards">
        {news.slice(0, visibleCards).map((article) => (
          <li key={article.url}>
            <NewsCard
              article={article}
              isLoggedIn={isLoggedIn}
              isSaved={savedArticles.some(
                (savedArticle) => savedArticle.url === article.url
              )}
              onSaveArticle={onSaveArticle}
              onRemoveArticle={onRemoveArticle}
              keyword={searchQuery}
            />
          </li>
        ))}
      </ul>
      {visibleCards < news.length && (
        <button className="news-card-list__button" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
