// This file will contain your API calls
const BASE_URL = "https://newsapi.org/v2";
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export const getNews = async (keyword) => {
  try {
    if (!keyword.trim()) {
      throw new Error("Keyword is empty");
    }

    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(
        keyword
      )}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`News request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.articles; // Return just the articles array
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

// Add more API calls as needed
