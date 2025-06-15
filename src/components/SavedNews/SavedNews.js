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
            key={article._id}
            article={article}
            isLoggedIn={true}
            isSaved={true}
            onRemoveArticle={onRemoveArticle}
            keyword={article.keyword} // Pass the saved keyword
          />
        ))}
      </div>
    </div>
  );
}

export default SavedNews;
