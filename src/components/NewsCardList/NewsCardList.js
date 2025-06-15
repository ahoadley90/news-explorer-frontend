import React, { useState } from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import SaveIcon from "../../images/Saveicon.svg"; // Adjust the path as necessary

function NewsCardList({ news, isLoggedIn }) {
  const [visibleCards, setVisibleCards] = useState(3);

  const showMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };

  const handleSaveClick = () => {
    if (!isLoggedIn) {
      alert("Sign in to save articles");
    }
  };

  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Search results</h2>
      <div className="news-card-list__cards">
        {news && news.length > 0 ? (
          news
            .slice(0, visibleCards)
            .map((article, index) => (
              <NewsCard key={index} article={article} isLoggedIn={isLoggedIn} />
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
