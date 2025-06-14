import React from "react";
import "./SavedNewsHeader.css";

function SavedNewsHeader({ userName, savedArticles }) {
  const keywordCounts = savedArticles.reduce((acc, article) => {
    acc[article.keyword] = (acc[article.keyword] || 0) + 1;
    return acc;
  }, {});

  const sortedKeywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([keyword]) => keyword);

  const topKeywords = sortedKeywords.slice(0, 2);
  const remainingKeywordsCount = sortedKeywords.length - 2;

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__subtitle">Saved articles</p>
      <h1 className="saved-news-header__title">
        {userName}, you have {savedArticles.length} saved articles
      </h1>
      <p className="saved-news-header__keywords">
        By keywords:{" "}
        <span className="saved-news-header__keywords-bold">
          {topKeywords.join(", ")}
          {remainingKeywordsCount > 0 && `, and ${remainingKeywordsCount} more`}
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
