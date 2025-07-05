let isLoggedIn = false;
let savedArticles = [];

export const mockLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && password) {
        isLoggedIn = true;
        resolve({ success: true, token: "mock-token" });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

export const mockCheckToken = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isValid: isLoggedIn });
    }, 500);
  });
};

export const mockSaveArticle = (article) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      savedArticles.push(article);
      resolve({ success: true });
    }, 500);
  });
};

export const mockRemoveArticle = (article) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      savedArticles = savedArticles.filter((a) => a.url !== article.url);
      resolve({ success: true });
    }, 500);
  });
};
