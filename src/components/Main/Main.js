import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import NewsCard from "../NewsCard/NewsCard"; // Add this line

function Main({
  onSearch,
  searchQuery,
  setSearchQuery,
  news,
  isLoading,
  searchError,
  isLoggedIn,
  savedArticles,
  onSaveArticle,
  onRemoveArticle,
}) {
  return (
    <main className="main">
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">What's going on in the world?</h1>
          <p className="hero__description">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm
            onSearch={onSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isLoading={isLoading}
          />
        </div>
      </section>
      {searchError && <p className="error">{searchError}</p>}
      <NewsCardList
        news={news}
        isLoggedIn={isLoggedIn}
        savedArticles={savedArticles}
        onSaveArticle={onSaveArticle}
        onRemoveArticle={onRemoveArticle}
      >
        {news.map((article) => (
          <NewsCard
            key={article.url}
            article={article}
            isLoggedIn={isLoggedIn}
            isSaved={savedArticles.some(
              (savedArticle) => savedArticle.url === article.url
            )}
            onSaveArticle={onSaveArticle}
            onRemoveArticle={onRemoveArticle}
            keyword={searchQuery} // Pass the current search query as the keyword
          />
        ))}
      </NewsCardList>
      <About />
    </main>
  );
}

export default Main;
