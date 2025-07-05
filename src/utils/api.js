// This file will contain your API calls
const BASE_URL = "https://newsapi.org/v2";
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const getNews = async (keyword) => {
  if (!keyword.trim()) {
    throw new Error("Keyword is empty");
  }

  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const url = new URL(newsApiBaseUrl);
  url.searchParams.append("q", keyword);
  url.searchParams.append("from", sevenDaysAgo.toISOString().split("T")[0]);
  url.searchParams.append("to", today.toISOString().split("T")[0]);
  url.searchParams.append("pageSize", "100");
  url.searchParams.append("apiKey", API_KEY);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("News API request failed");
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

// Add more API calls as needed
