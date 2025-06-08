import React from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard"; // Make sure this import is correct

function NewsCardList() {
  // This is just example data. In a real app, you'd fetch this from an API
  const articles = [
    {
      title: "Example Article 1",
      description: "This is a description",
      url: "#",
      urlToImage: "path/to/image1.jpg",
      publishedAt: "2023-05-20",
      source: { name: "Example Source" },
    },
    {
      title: "Example Article 2",
      description: "This is another description",
      url: "#",
      urlToImage: "path/to/image2.jpg",
      publishedAt: "2023-05-21",
      source: { name: "Another Source" },
    },
    // Add more example articles as needed
  ];

  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Search results</h2>
      <div className="news-card-list__cards">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
      <button className="news-card-list__button">Show more</button>
    </section>
  );
}

export default NewsCardList;
