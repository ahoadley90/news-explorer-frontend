import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, isLoading }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <form onSubmit={onSearch} className="search-form">
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
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchForm;
