import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";

function Main() {
  return (
    <main className="main">
      <SearchForm />
      <NewsCardList />
      <About />
    </main>
  );
}

export default Main;
