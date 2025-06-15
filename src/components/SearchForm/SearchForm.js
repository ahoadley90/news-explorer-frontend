import React from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, searchQuery, setSearchQuery, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter topic"
        className="search-form__input"
      />
      <button
        type="submit"
        className="search-form__button"
        disabled={isLoading || !searchQuery.trim()}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchForm;
