const BASE_URL = "https://newsapi.org/v2";
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export const getNews = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("News request failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
