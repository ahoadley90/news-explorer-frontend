import React from "react";
import "./NoResults.css";
import notFoundIcon from "../../images/not-found.svg";

function NoResults() {
  return (
    <div className="no-results">
      <img src={notFoundIcon} alt="Not found" className="no-results__icon" />
      <h3 className="no-results__title">Nothing found</h3>
      <p className="no-results__text">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
}

// ... component code ...
export default NoResults;