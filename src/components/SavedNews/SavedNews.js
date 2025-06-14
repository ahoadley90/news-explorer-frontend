import React from 'react';
import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({ userName, savedArticles }) {
  return (
    <main className="saved-news">
      <SavedNewsHeader userName={userName} savedArticles={savedArticles} />
      <NewsCardList articles={savedArticles} isSavedNews={true} />
    </main>
  );
}

export default SavedNews;