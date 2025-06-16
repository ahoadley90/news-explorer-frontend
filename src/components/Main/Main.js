import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import NoResults from "../NoResults/NoResults";
import Preloader from "../Preloader/PreLoader";
import About from "../About/About";

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
      <section className="search-results">
        {isLoading && <Preloader />}

        {!isLoading && searchError && (
          <p className="search-results__error">{searchError}</p>
        )}

        {!isLoading && !searchError && news.length === 0 && searchQuery && (
          <NoResults />
        )}

        {!isLoading && !searchError && news.length > 0 && (
          <NewsCardList
            news={news}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            onSaveArticle={onSaveArticle}
            onRemoveArticle={onRemoveArticle}
            searchQuery={searchQuery}
          />
        )}
      </section>
      <About />
    </main>
  );
}

export default Main;
