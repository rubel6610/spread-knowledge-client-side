import React from "react";
import Banner from "./../Components/Banner";
import FeaturedArticles from "./../Components/FeaturedArticles";
import Categories from "./../Components/Categories";
import EditorChoice from "./../Components/EditorChoice";
import TopContributors from "./../Components/TopContributors";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedArticles />
      <Categories />
      <EditorChoice />
      <TopContributors />
    </div>
  );
};

export default Home;
