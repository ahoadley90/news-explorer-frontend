import React, { useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ news, isLoggedIn }) {
  const [visibleCards, setVisibleCards] = useState(3);
  const [savedArticles, setSavedArticles] = useState([]);

  const showMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };

  const handleSaveArticle = (article) => {
    if (!isLoggedIn) {
      alert("Sign in to save articles");
      return;
    }

    // Check if the article is already saved
    if (
      !savedArticles.some((savedArticle) => savedArticle._id === article._id)
    ) {
      setSavedArticles([...savedArticles, article]);
      console.log("Article saved:", article);
    } else {
      console.log("Article already saved");
    }
  };

  const handleRemoveArticle = (article) => {
    setSavedArticles(
      savedArticles.filter((savedArticle) => savedArticle._id !== article._id)
    );
    console.log("Article removed:", article);
  };

  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Search results</h2>
      <div className="news-card-list__cards">
        {news && news.length > 0 ? (
          news.slice(0, visibleCards).map((article) => (
            <NewsCard
              key={article._id || article.url} // Fallback to url if _id is not available
              article={article}
              isLoggedIn={isLoggedIn}
              isSaved={savedArticles.some(
                (savedArticle) => savedArticle._id === article._id
              )}
              onSaveArticle={handleSaveArticle}
              onRemoveArticle={handleRemoveArticle}
            />
          ))
        ) : (
          <p>No articles found. Try a different search term.</p>
        )}
      </div>
      {news && visibleCards < news.length && (
        <button className="news-card-list__button" onClick={showMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
