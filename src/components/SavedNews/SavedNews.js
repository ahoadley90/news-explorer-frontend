import React from "react";
import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";

function SavedNews({ savedArticles, userName, onRemoveArticle }) {
  return (
    <div className="saved-news">
      <SavedNewsHeader userName={userName} savedArticles={savedArticles} />
      <div className="saved-news__articles">
        {savedArticles.map((article) => (
          <NewsCard
            key={article.url}
            article={article}
            isLoggedIn={true}
            isSaved={true}
            onRemoveArticle={() => onRemoveArticle(article)}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedNews;
